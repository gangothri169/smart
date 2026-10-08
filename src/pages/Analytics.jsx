import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Layers,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Clock,
  Building2,
  PieChart,
  Filter
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import StatCard from '../components/StatCard';
import { DEPARTMENTS } from '../data/seedData';

export default function Analytics() {
  const { incidents, roleScopedIncidents, currentUser } = useCity();

  const [timeFilter, setTimeFilter] = useState('ALL'); // 'ALL' | '7D' | '30D'

  // Scoped dataset based on logged-in department
  const sourceIncidents = roleScopedIncidents || incidents;

  // Calculations from stored incidents
  const totalIncidents = sourceIncidents.length;
  const resolvedIncidents = sourceIncidents.filter(i => i.status === 'Resolved').length;
  const openIncidents = totalIncidents - resolvedIncidents;
  const resolutionRate = totalIncidents > 0 ? Math.round((resolvedIncidents / totalIncidents) * 100) : 0;

  // Category counts
  const potholes = sourceIncidents.filter(i => i.category === 'POTHOLE').length;
  const streetlights = sourceIncidents.filter(i => i.category === 'STREETLIGHT').length;
  const garbage = sourceIncidents.filter(i => i.category === 'GARBAGE').length;

  // Priority counts
  const critical = sourceIncidents.filter(i => i.priority === 'CRITICAL').length;
  const high = sourceIncidents.filter(i => i.priority === 'HIGH').length;
  const medium = sourceIncidents.filter(i => i.priority === 'MEDIUM').length;
  const low = sourceIncidents.filter(i => i.priority === 'LOW').length;

  // Status counts
  const statusDetected = sourceIncidents.filter(i => i.status === 'Detected').length;
  const statusReview = sourceIncidents.filter(i => i.status === 'Under Review').length;
  const statusAssigned = sourceIncidents.filter(i => i.status === 'Assigned').length;
  const statusProgress = sourceIncidents.filter(i => i.status === 'In Progress').length;
  const statusResolved = sourceIncidents.filter(i => i.status === 'Resolved').length;

  // Department counts
  const deptRoad = sourceIncidents.filter(i => i.department === DEPARTMENTS.ROAD).length;
  const deptElec = sourceIncidents.filter(i => i.department === DEPARTMENTS.ELECTRICAL).length;
  const deptWaste = incidents.filter(i => i.department === DEPARTMENTS.WASTE).length;

  // Export CSV function
  const handleExportCSV = () => {
    if (incidents.length === 0) {
      alert('No incident records to export.');
      return;
    }

    const headers = [
      'Issue ID',
      'Category',
      'Title',
      'Location',
      'Latitude',
      'Longitude',
      'Severity',
      'Priority',
      'Priority Score',
      'Department',
      'Status',
      'Detection Source',
      'Created At',
      'Resolved At'
    ];

    const rows = incidents.map(inc => [
      `"${inc.id}"`,
      `"${inc.category}"`,
      `"${inc.title.replace(/"/g, '""')}"`,
      `"${inc.location.replace(/"/g, '""')}"`,
      inc.latitude,
      inc.longitude,
      `"${inc.severity}"`,
      `"${inc.priority}"`,
      inc.priorityScore,
      `"${inc.department}"`,
      `"${inc.status}"`,
      `"${inc.detectionSource || ''}"`,
      `"${inc.createdAt}"`,
      `"${inc.resolvedAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `UrbanPulse_SmartCity_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
            Infrastructure Analytics & Reports
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
            Aggregated metrics, department workload distribution, and resolution velocity across municipal wards.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Timeframe Filter */}
          <div style={{ display: 'flex', background: '#e2e8f0', borderRadius: '8px', padding: '3px' }}>
            {['ALL', '30D', '7D'].map(t => (
              <button
                key={t}
                onClick={() => setTimeFilter(t)}
                className="btn btn-sm"
                style={{
                  background: timeFilter === t ? '#ffffff' : 'transparent',
                  color: timeFilter === t ? '#0f172a' : '#64748b',
                  fontSize: '0.75rem',
                  border: 'none',
                  boxShadow: timeFilter === t ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {t === 'ALL' ? 'All Time' : `Last ${t}`}
              </button>
            ))}
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="btn btn-primary btn-sm"
            style={{ background: '#0f172a' }}
          >
            <Download size={14} />
            <span>Export CSV Dataset</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid-cols-4">
        <StatCard
          title="Total Logged Issues"
          value={totalIncidents}
          icon={Layers}
          iconColor="#3b82f6"
          iconBg="#eff6ff"
          description="Full operational dataset"
        />
        <StatCard
          title="Resolution Velocity"
          value={`${resolutionRate}%`}
          icon={CheckCircle2}
          iconColor="#10b981"
          iconBg="#ecfdf5"
          description={`${resolvedIncidents} of ${totalIncidents} resolved`}
        />
        <StatCard
          title="High/Critical Hazard Ratio"
          value={`${totalIncidents ? Math.round(((critical + high) / totalIncidents) * 100) : 0}%`}
          icon={AlertTriangle}
          iconColor="#ef4444"
          iconBg="#fef2f2"
          description={`${critical + high} prioritized urgent`}
        />
        <StatCard
          title="Avg. Repair Cycle"
          value="4.6 Hours"
          icon={Clock}
          iconColor="#8b5cf6"
          iconBg="#f5f3ff"
          description="Simulated municipal benchmark"
        />
      </div>

      {/* Grid of Analytical Visualizations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
        {/* Chart 1: Category Breakdown Bar Chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Category Distribution</div>
              <div className="card-subtitle">Volume per infrastructure sector</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { label: 'Pothole & Damaged Road', count: potholes, color: '#3b82f6' },
                { label: 'Faulty Streetlights', count: streetlights, color: '#f59e0b' },
                { label: 'Garbage & Waste Overflow', count: garbage, color: '#10b981' }
              ].map(item => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600 }}>{item.label}</span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {item.count} ({totalIncidents ? Math.round((item.count / totalIncidents) * 100) : 0}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '14px', background: '#f1f5f9', borderRadius: '7px', overflow: 'hidden' }}>
                    <div style={{ width: `${(item.count / (totalIncidents || 1)) * 100}%`, height: '100%', backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 2: Priority-Wise Distribution */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Priority Triage Breakdown</div>
              <div className="card-subtitle">AI risk classification levels</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Critical Hazard (>=85)', count: critical, color: '#ef4444' },
                { label: 'High Priority (65-84)', count: high, color: '#f59e0b' },
                { label: 'Medium Priority (40-64)', count: medium, color: '#eab308' },
                { label: 'Low Priority (<40)', count: low, color: '#10b981' }
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '200px' }}>
                    <span style={{ width: 12, height: 12, borderRadius: '3px', background: item.color }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{item.label}</span>
                  </div>
                  <div style={{ flex: 1, margin: '0 1rem' }}>
                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${(item.count / (totalIncidents || 1)) * 100}%`, height: '100%', background: item.color }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 3: Department Workload Allocation */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Department Allocation Ratio</div>
              <div className="card-subtitle">Workforce routing distribution</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { name: 'Road Maintenance Wing', count: deptRoad, color: '#3b82f6' },
                { name: 'Electrical & Lighting Division', count: deptElec, color: '#f59e0b' },
                { name: 'Solid Waste Sanitation Wing', count: deptWaste, color: '#10b981' }
              ].map(d => (
                <div key={d.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600 }}>{d.name}</span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {d.count} tickets ({totalIncidents ? Math.round((d.count / totalIncidents) * 100) : 0}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '12px', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${(d.count / (totalIncidents || 1)) * 100}%`, height: '100%', backgroundColor: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 4: Status Lifecycle Funnel */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Status Workflow Funnel</div>
              <div className="card-subtitle">Stages from detection to verified resolution</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Detected (Initial Flag)', count: statusDetected, color: '#3b82f6' },
                { label: 'Under Review', count: statusReview, color: '#8b5cf6' },
                { label: 'Assigned to Crew', count: statusAssigned, color: '#f97316' },
                { label: 'In Progress (Active On Site)', count: statusProgress, color: '#eab308' },
                { label: 'Resolved & Verified', count: statusResolved, color: '#10b981' }
              ].map(st => (
                <div key={st.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '220px' }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: st.color }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{st.label}</span>
                  </div>
                  <div style={{ flex: 1, margin: '0 0.85rem' }}>
                    <div style={{ width: '100%', height: '7px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${(st.count / (totalIncidents || 1)) * 100}%`, height: '100%', background: st.color }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {st.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
