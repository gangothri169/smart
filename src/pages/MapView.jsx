import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  MapPin,
  Layers,
  Filter,
  Eye,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Compass,
  Maximize2
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../components/Badges';

export default function MapView() {
  const { incidents, roleScopedIncidents, setActiveIncident, currentUser } = useCity();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [mapMode, setMapMode] = useState('leaflet'); // 'leaflet' | 'schematic'
  const [selectedMarkerIncident, setSelectedMarkerIncident] = useState(null);

  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Scoped list according to role
  const sourceIncidents = roleScopedIncidents || incidents;

  // Filtered list
  const filteredIncidents = sourceIncidents.filter(inc => {
    if (selectedCategory !== 'ALL' && inc.category !== selectedCategory) return false;
    if (selectedPriority !== 'ALL' && inc.priority !== selectedPriority) return false;
    if (selectedStatus !== 'ALL' && inc.status !== selectedStatus) return false;
    return true;
  });

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (mapMode !== 'leaflet' || !mapContainerRef.current) return;

    if (!leafletMapRef.current) {
      // Center of pilot corridor (Bengaluru: 12.965, 77.620)
      const map = L.map(mapContainerRef.current, {
        center: [12.965, 77.620],
        zoom: 12,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | UrbanPulse AI Platform',
        maxZoom: 18
      }).addTo(map);

      leafletMapRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);
    }

    // Refresh markers
    if (markersLayerRef.current) {
      markersLayerRef.current.clearLayers();

      filteredIncidents.forEach(inc => {
        // Define color and badge by category and priority
        const color =
          inc.priority === 'CRITICAL' ? '#ef4444' :
          inc.priority === 'HIGH' ? '#f59e0b' :
          inc.category === 'POTHOLE' ? '#3b82f6' :
          inc.category === 'STREETLIGHT' ? '#eab308' : '#10b981';

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="
              width: 28px;
              height: 28px;
              background-color: ${color};
              border: 2px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.4);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 11px;
              font-weight: bold;
              cursor: pointer;
            ">
              ${inc.category === 'POTHOLE' ? 'P' : inc.category === 'STREETLIGHT' ? 'L' : 'G'}
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker([inc.latitude, inc.longitude], { icon: customIcon });

        marker.on('click', () => {
          setSelectedMarkerIncident(inc);
        });

        markersLayerRef.current.addLayer(marker);
      });

      // Fit bounds if markers exist
      if (filteredIncidents.length > 0 && leafletMapRef.current) {
        const bounds = L.latLngBounds(filteredIncidents.map(i => [i.latitude, i.longitude]));
        leafletMapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      }
    }
  }, [mapMode, filteredIncidents]);

  // Clean up Leaflet on unmount
  useEffect(() => {
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
            Geospatial Infrastructure Map
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
            Interactive geographical distribution of detected infrastructure anomalies across the urban corridor.
          </p>
        </div>

        {/* Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: '#e2e8f0', borderRadius: '8px', padding: '3px', display: 'flex', gap: '3px' }}>
            <button
              onClick={() => setMapMode('leaflet')}
              className="btn btn-sm"
              style={{
                background: mapMode === 'leaflet' ? '#ffffff' : 'transparent',
                color: mapMode === 'leaflet' ? '#0f172a' : '#64748b',
                boxShadow: mapMode === 'leaflet' ? 'var(--shadow-sm)' : 'none',
                border: 'none',
                fontSize: '0.78rem'
              }}
            >
              OpenStreetMap (GPS)
            </button>
            <button
              onClick={() => setMapMode('schematic')}
              className="btn btn-sm"
              style={{
                background: mapMode === 'schematic' ? '#ffffff' : 'transparent',
                color: mapMode === 'schematic' ? '#0f172a' : '#64748b',
                boxShadow: mapMode === 'schematic' ? 'var(--shadow-sm)' : 'none',
                border: 'none',
                fontSize: '0.78rem'
              }}
            >
              Schematic City Grid (Offline)
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Legend Bar */}
      <div className="card" style={{ padding: '0.85rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#64748b' }}>
              <Filter size={14} /> Filter:
            </div>

            <select
              className="form-control"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              style={{ width: '150px', padding: '0.3rem 0.5rem', fontSize: '0.78rem' }}
            >
              <option value="ALL">All Categories</option>
              <option value="POTHOLE">Potholes (P)</option>
              <option value="STREETLIGHT">Streetlights (L)</option>
              <option value="GARBAGE">Garbage (G)</option>
            </select>

            <select
              className="form-control"
              value={selectedPriority}
              onChange={e => setSelectedPriority(e.target.value)}
              style={{ width: '140px', padding: '0.3rem 0.5rem', fontSize: '0.78rem' }}
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical Only</option>
              <option value="HIGH">High Only</option>
              <option value="MEDIUM">Medium Only</option>
              <option value="LOW">Low Only</option>
            </select>

            <select
              className="form-control"
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              style={{ width: '140px', padding: '0.3rem 0.5rem', fontSize: '0.78rem' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="Detected">Detected</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <span>Critical Hazard</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
              <span>High Priority</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3b82f6' }} />
              <span>Pothole (P)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#eab308' }} />
              <span>Streetlight (L)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
              <span>Garbage (G)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Display & Selected Marker Details Split */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedMarkerIncident ? '1fr 340px' : '1fr', gap: '1.25rem', height: '620px' }}>
        {/* The Map Frame */}
        <div className="card" style={{ overflow: 'hidden', position: 'relative', height: '100%' }}>
          {mapMode === 'leaflet' ? (
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
          ) : (
            /* Illustrative Schematic City Map */
            <div style={{ width: '100%', height: '100%', background: '#0b1324', position: 'relative', overflow: 'hidden' }}>
              {/* Grid Roads SVG */}
              <svg viewBox="0 0 1000 600" style={{ width: '100%', height: '100%' }}>
                {/* City Blocks */}
                <rect width="1000" height="600" fill="#0b1324" />

                {/* Major Roads Grid */}
                <path d="M 0,150 L 1000,150" stroke="#1e293b" strokeWidth="24" />
                <path d="M 0,320 L 1000,320" stroke="#1e293b" strokeWidth="32" />
                <path d="M 0,470 L 1000,470" stroke="#1e293b" strokeWidth="20" />
                <path d="M 220,0 L 220,600" stroke="#1e293b" strokeWidth="24" />
                <path d="M 500,0 L 500,600" stroke="#1e293b" strokeWidth="36" />
                <path d="M 760,0 L 760,600" stroke="#1e293b" strokeWidth="24" />
                <path d="M 0,550 L 1000,100" stroke="#334155" strokeWidth="18" strokeDasharray="10,6" opacity="0.4" />

                {/* Road Labels */}
                <text x="30" y="145" fill="#64748b" fontSize="12" fontFamily="sans-serif">MG ROAD CORRIDOR</text>
                <text x="30" y="315" fill="#64748b" fontSize="13" fontFamily="sans-serif">100 FT INDIRANAGAR ARTERIAL</text>
                <text x="30" y="465" fill="#64748b" fontSize="12" fontFamily="sans-serif">OUTER RING ROAD EXPRESSWAY</text>
                <text x="490" y="50" fill="#64748b" fontSize="12" fontFamily="sans-serif" transform="rotate(90,490,50)">CENTRAL TRANSIT SPINE</text>

                {/* City Zones */}
                <rect x="60" y="40" width="120" height="70" fill="rgba(255,255,255,0.03)" rx="6" />
                <text x="75" y="78" fill="#475569" fontSize="11">COMMERCIAL DIST.</text>

                <rect x="550" y="180" width="160" height="100" fill="rgba(255,255,255,0.03)" rx="6" />
                <text x="570" y="235" fill="#475569" fontSize="11">IT TECH CORRIDOR</text>

                <rect x="260" y="360" width="180" height="80" fill="rgba(255,255,255,0.03)" rx="6" />
                <text x="280" y="405" fill="#475569" fontSize="11">RESIDENTIAL ZONE 4</text>
              </svg>

              {/* Clickable Schematic Markers (Mapped proportionally) */}
              {filteredIncidents.map((inc, i) => {
                // Map lat [12.84, 13.02] and lng [77.56, 77.76] to 1000x600 viewBox
                const xPct = Math.min(92, Math.max(8, ((inc.longitude - 77.56) / (77.76 - 77.56)) * 100));
                const yPct = Math.min(90, Math.max(10, (1 - (inc.latitude - 12.84) / (13.02 - 12.84)) * 100));

                const color =
                  inc.priority === 'CRITICAL' ? '#ef4444' :
                  inc.priority === 'HIGH' ? '#f59e0b' :
                  inc.category === 'POTHOLE' ? '#3b82f6' :
                  inc.category === 'STREETLIGHT' ? '#eab308' : '#10b981';

                const isSelected = selectedMarkerIncident?.id === inc.id;

                return (
                  <div
                    key={inc.id}
                    onClick={() => setSelectedMarkerIncident(inc)}
                    style={{
                      position: 'absolute',
                      left: `${xPct}%`,
                      top: `${yPct}%`,
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer',
                      zIndex: isSelected ? 20 : 10
                    }}
                  >
                    <div
                      style={{
                        width: isSelected ? 34 : 26,
                        height: isSelected ? 34 : 26,
                        borderRadius: '50%',
                        backgroundColor: color,
                        border: isSelected ? '3px solid #ffffff' : '2px solid rgba(255,255,255,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: isSelected ? '12px' : '10px',
                        fontWeight: 'bold',
                        boxShadow: `0 0 ${isSelected ? '15px' : '8px'} ${color}`,
                        transition: 'all 0.2s'
                      }}
                    >
                      {inc.category === 'POTHOLE' ? 'P' : inc.category === 'STREETLIGHT' ? 'L' : 'G'}
                    </div>
                  </div>
                );
              })}

              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  background: 'rgba(15,23,42,0.85)',
                  color: '#94a3b8',
                  fontSize: '0.72rem',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Schematic Urban Grid View • Click pins to inspect
              </div>
            </div>
          )}

          {/* Total markers badge on map */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(15,23,42,0.85)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '20px',
              zIndex: 30,
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {filteredIncidents.length} Markers Plotted
          </div>
        </div>

        {/* Selected Marker Details Drawer */}
        {selectedMarkerIncident && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-header">
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0d9488' }}>
                  {selectedMarkerIncident.id}
                </div>
                <div className="card-subtitle">{selectedMarkerIncident.category}</div>
              </div>
              <button
                onClick={() => setSelectedMarkerIncident(null)}
                className="btn-icon"
                style={{ border: 'none' }}
              >
                &times;
              </button>
            </div>

            <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                  {selectedMarkerIncident.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MapPin size={12} color="#0d9488" />
                  {selectedMarkerIncident.location}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <PriorityBadge priority={selectedMarkerIncident.priority} />
                <StatusBadge status={selectedMarkerIncident.status} />
              </div>

              <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.78rem' }}>
                <div style={{ color: '#64748b' }}>GPS Coordinates:</div>
                <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  {selectedMarkerIncident.latitude.toFixed(4)}° N, {selectedMarkerIncident.longitude.toFixed(4)}° E
                </div>
                <div style={{ color: '#64748b', marginTop: '0.4rem' }}>Department:</div>
                <div style={{ fontWeight: 600 }}>{selectedMarkerIncident.department}</div>
                <div style={{ color: '#64748b', marginTop: '0.4rem' }}>AI Priority Score:</div>
                <div style={{ fontWeight: 700, color: '#0d9488' }}>{selectedMarkerIncident.priorityScore} / 100</div>
              </div>

              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                {selectedMarkerIncident.description}
              </p>

              <div style={{ marginTop: 'auto' }}>
                <button
                  onClick={() => setActiveIncident(selectedMarkerIncident)}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                >
                  <Eye size={14} />
                  <span>Full Incident Details</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
