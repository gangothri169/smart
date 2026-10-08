import React, { useState } from 'react';
import {
  Activity,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Wifi,
  Server,
  Cpu,
  MapPin,
  ArrowRight,
  Shield,
  CheckCircle,
  Eye,
  Camera,
  Radio,
  FileText
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import EvidenceIllustration from '../components/EvidenceIllustration';
import { CategoryBadge, StatusBadge, PriorityBadge } from '../components/Badges';

export default function LiveMonitoring() {
  const {
    isMonitoring,
    setIsMonitoring,
    monitoringEvents,
    roleScopedMonitoringEvents,
    resetMonitoringEvents,
    simulateNewDetection,
    setActiveIncident,
    incidents,
    currentUser
  } = useCity();

  const displayEvents = roleScopedMonitoringEvents.length > 0 ? roleScopedMonitoringEvents : monitoringEvents;

  // Selected event in the stream for inspection preview
  const [selectedEventId, setSelectedEventId] = useState(
    displayEvents.length > 0 ? displayEvents[0].id : null
  );

  const [pipelineActiveStage, setPipelineActiveStage] = useState(4); // 0..4

  const handleManualSimulate = () => {
    // Briefly animate pipeline stages
    setPipelineActiveStage(0);
    setTimeout(() => setPipelineActiveStage(1), 300);
    setTimeout(() => setPipelineActiveStage(2), 650);
    setTimeout(() => setPipelineActiveStage(3), 1000);
    setTimeout(() => {
      const newInc = simulateNewDetection();
      setPipelineActiveStage(4);
      if (newInc) {
        setSelectedEventId(`EVT-${Date.now().toString().slice(-4)}`);
      }
    }, 1300);
  };

  const selectedEvent = monitoringEvents.find(e => e.id === selectedEventId) || monitoringEvents[0];

  // Try to find matching incident in database
  const matchingIncident = incidents.find(
    i => i.location.includes(selectedEvent?.location) || i.category === selectedEvent?.type
  );

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner / Heading */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
            Real-Time IoT Monitoring Station
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
            Telemetry reception, edge frame ingestion, and automated classification pipeline.
          </p>
        </div>

        {/* C. Simulation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {isMonitoring ? (
            <button
              onClick={() => setIsMonitoring(false)}
              className="btn btn-secondary btn-sm"
              style={{ color: '#d97706', borderColor: '#fde68a', background: '#fffbeb' }}
            >
              <Pause size={14} />
              <span>Pause Auto-Stream</span>
            </button>
          ) : (
            <button
              onClick={() => setIsMonitoring(true)}
              className="btn btn-primary btn-sm"
            >
              <Play size={14} />
              <span>Start Auto-Stream</span>
            </button>
          )}

          <button
            onClick={handleManualSimulate}
            className="btn btn-primary btn-sm"
            style={{ background: 'linear-gradient(135deg, #0d9488, #0284c7)' }}
          >
            <Sparkles size={14} />
            <span>Simulate New Detection</span>
          </button>

          <button
            onClick={resetMonitoringEvents}
            className="btn btn-secondary btn-sm"
            title="Reset telemetry event stream (does not delete saved incidents)"
          >
            <RotateCcw size={14} />
            <span>Reset Stream</span>
          </button>
        </div>
      </div>

      {/* A. Connection Status Panel (Clearly distinguish simulated from physical hardware) */}
      <div
        className="card"
        style={{
          backgroundColor: '#0f172a',
          color: 'white',
          borderColor: '#1e293b',
          padding: '1.25rem 1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Server size={17} color="#2dd4bf" />
            <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>Gateway & Edge Hardware Telemetry Status</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: '4px' }}>
            Municipal Edge Telemetry Network
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'IoT Gateway', status: 'ONLINE (MQTT Broker)', icon: Radio, color: '#2dd4bf' },
            { label: 'Data Stream', status: isMonitoring ? 'ACTIVE TELEMETRY' : 'STANDBY (READY)', icon: Activity, color: isMonitoring ? '#10b981' : '#f59e0b' },
            { label: 'AI Detection Engine', status: 'EDGE INFERENCE ACTIVE', icon: Cpu, color: '#38bdf8' },
            { label: 'Location Service', status: 'GPS TELEMETRY LOCKED', icon: MapPin, color: '#a78bfa' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Icon size={14} color={item.color} />
                  <span>{item.label}</span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                  {item.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* D. Detection Pipeline Workflow Banner */}
      <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
          Edge AI Processing Sequence
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          {[
            { step: '1', title: 'Data Received', desc: 'Raw Frame / Sensor Packet' },
            { step: '2', title: 'Image Analysis', desc: 'Feature Segmentation' },
            { step: '3', title: 'Issue Classification', desc: 'Anomaly Categorization' },
            { step: '4', title: 'Severity Assessment', desc: 'Safety Impact Score' },
            { step: '5', title: 'Incident Created', desc: 'Operational Dispatch' }
          ].map((stage, idx) => {
            const isHighlight = pipelineActiveStage >= idx;
            return (
              <React.Fragment key={idx}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.6rem 0.9rem',
                    borderRadius: '8px',
                    backgroundColor: isHighlight ? '#f0fdfa' : '#f8fafc',
                    border: `1px solid ${isHighlight ? '#0d9488' : '#e2e8f0'}`,
                    transition: 'all 0.25s'
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: isHighlight ? '#0d9488' : '#cbd5e1',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {stage.step}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isHighlight ? '#0f766e' : '#475569' }}>
                      {stage.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                      {stage.desc}
                    </div>
                  </div>
                </div>
                {idx < 4 && <ArrowRight size={16} color="#94a3b8" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Grid: B. Simulated Incoming Stream + F. Evidence Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1.25rem' }}>
        {/* B. Simulated Incoming Events Stream */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Simulated Incoming IoT Data Stream</div>
              <div className="card-subtitle">Showing {monitoringEvents.length} recent edge packets</div>
            </div>
            {isMonitoring && (
              <span style={{ fontSize: '0.72rem', color: '#0d9488', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                <span className="status-dot pulse" /> LIVE STREAMING
              </span>
            )}
          </div>

          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-container" style={{ border: 'none', maxHeight: '460px', overflowY: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Device ID</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Confidence</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {monitoringEvents.map(evt => {
                    const isSelected = selectedEvent?.id === evt.id;
                    return (
                      <tr
                        key={evt.id}
                        onClick={() => setSelectedEventId(evt.id)}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: isSelected ? '#f0fdfa' : 'transparent',
                          fontWeight: isSelected ? 600 : 400
                        }}
                      >
                        <td style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                          {evt.timestamp}
                        </td>
                        <td>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.75rem',
                              background: '#f1f5f9',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              color: '#334155'
                            }}
                          >
                            {evt.deviceId}
                          </span>
                        </td>
                        <td>
                          <CategoryBadge category={evt.type} />
                        </td>
                        <td style={{ fontSize: '0.8rem', maxWidth: '140px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {evt.location}
                        </td>
                        <td style={{ fontSize: '0.75rem', color: '#0d9488', fontFamily: 'var(--font-mono)' }}>
                          {evt.confidence}
                        </td>
                        <td>
                          <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600 }}>
                            {evt.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* F. Selected Event Telemetry & Evidence Preview */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Telemetry & Evidence Preview</div>
              <div className="card-subtitle">Inspecting event: {selectedEvent?.id || 'N/A'}</div>
            </div>
            {selectedEvent && (
              <CategoryBadge category={selectedEvent.type} />
            )}
          </div>

          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {selectedEvent ? (
              <>
                {/* Evidence SVG Graphic */}
                <EvidenceIllustration
                  type={selectedEvent.type === 'POTHOLE' ? 'pothole_deep' : selectedEvent.type === 'STREETLIGHT' ? 'light_out' : 'garbage_spill'}
                  category={selectedEvent.type}
                  height={190}
                />

                {/* Packet Details */}
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Simulated Device:</span>
                    <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{selectedEvent.deviceId}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Location:</span>
                    <span style={{ fontWeight: 600 }}>{selectedEvent.location}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Timestamp:</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{selectedEvent.timestamp}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Edge Model Confidence:</span>
                    <span style={{ color: '#0d9488', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{selectedEvent.confidence}</span>
                  </div>
                </div>

                {matchingIncident && (
                  <button
                    onClick={() => setActiveIncident(matchingIncident)}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', marginTop: '0.25rem' }}
                  >
                    <Eye size={14} />
                    <span>Open Associated Incident ({matchingIncident.id})</span>
                  </button>
                )}
              </>
            ) : (
              <div style={{ padding: '3rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
                No event selected
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
