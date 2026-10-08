import React from 'react';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Eye,
  Zap,
  Wrench,
  Trash2
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import StatCard from '../components/StatCard';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../components/Badges';

export default function Dashboard() {
  const {
    incidents,
    roleScopedIncidents,
    activityLogs,
    simulateNewDetection,
    setActiveIncident,
    setActiveTab,
    currentUser
  } = useCity();

  // Metrics calculation based on the user's role scope
  const targetIncidents = roleScopedIncidents;
  const totalCount = targetIncidents.length;
  const activeCount = targetIncidents.filter(i => i.status !== 'Resolved').length;
  const criticalCount = targetIncidents.filter(i => i.priority === 'CRITICAL' && i.status !== 'Resolved').length;
  const resolvedCount = targetIncidents.filter(i => i.status === 'Resolved').length;

  // Category counts
  const potholeCount = targetIncidents.filter(i => i.category === 'POTHOLE').length;
  const streetlightCount = targetIncidents.filter(i => i.category === 'STREETLIGHT').length;
  const garbageCount = targetIncidents.filter(i => i.category === 'GARBAGE').length;

  // Priority counts
  const prioCritical = targetIncidents.filter(i => i.priority === 'CRITICAL').length;
  const prioHigh = targetIncidents.filter(i => i.priority === 'HIGH').length;
  const prioMedium = targetIncidents.filter(i => i.priority === 'MEDIUM').length;
  const prioLow = targetIncidents.filter(i => i.priority === 'LOW').length;

  // Infrastructure Health (calculated from resolved ratios, clamped between 60% and 96%)
  const roadHealth = Math.min(96, Math.max(62, Math.round(70 + (incidents.filter(i => i.category === 'POTHOLE' && i.status === 'Resolved').length / (incidents.filter(i => i.category === 'POTHOLE').length || 1)) * 26)));
  const lightHealth = Math.min(98, Math.max(68, Math.round(75 + (incidents.filter(i => i.category === 'STREETLIGHT' && i.status === 'Resolved').length / (incidents.filter(i => i.category === 'STREETLIGHT').length || 1)) * 23)));
  const wasteHealth = Math.min(95, Math.max(60, Math.round(68 + (incidents.filter(i => i.category === 'GARBAGE' && i.status === 'Resolved').length / (incidents.filter(i => i.category === 'GARBAGE').length || 1)) * 27)));

  // Recent incidents within role scope
  const recentIncidents = targetIncidents.slice(0, 6);

  const roleTitle = currentUser?.role === 'road'
    ? 'Road Infrastructure & Maintenance Overview'
    : currentUser?.role === 'electrical'
    ? 'Electrical & Street Lighting Overview'
    : currentUser?.role === 'waste'
    ? 'Solid Waste Management Overview'
    : 'Smart City Infrastructure Overview';

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* A. Welcome Section */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #0b1324 0%, #162646 100%)',
          color: 'white',
          padding: '1.75rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderColor: '#1e293b'
        }}
      >
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span
              style={{
                background: 'rgba(13, 148, 136, 0.25)',
                color: '#2dd4bf',
                padding: '0.2rem 0.6rem',
                borderRadius: '12px',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.05em'
              }}
            >
              CIVIC OPERATIONS PLATFORM
            </span>
            <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Bengaluru Municipal Pilot</span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
            {roleTitle}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.35rem', lineHeight: 1.5 }}>
            Automated detection, AI-prioritization, and lifecycle management for road cavities, dark streetlights, and commercial waste overflows.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={simulateNewDetection}
            className="btn btn-primary"
            style={{
              padding: '0.7rem 1.4rem',
              fontSize: '0.9rem',
              boxShadow: '0 4px 15px rgba(13, 148, 136, 0.4)'
            }}
          >
            <Sparkles size={16} />
            <span>Simulate New Detection</span>
          </button>
        </div>
      </div>

      {/* B. KPI Cards (6 cards) */}
      <div className="grid-cols-6">
        <StatCard
          title="Total Issues Detected"
          value={totalCount}
          icon={Layers}
          iconColor="#3b82f6"
          iconBg="#eff6ff"
          description="Cumulative logged events"
        />
        <StatCard
          title="Active Issues"
          value={activeCount}
          icon={Activity}
          iconColor="#f59e0b"
          iconBg="#fffbeb"
          description="Under review or dispatch"
        />
        <StatCard
          title="Critical Issues"
          value={criticalCount}
          icon={AlertTriangle}
          iconColor="#ef4444"
          iconBg="#fef2f2"
          description="Immediate hazard alert"
        />
        <StatCard
          title="Issues Resolved"
          value={resolvedCount}
          icon={CheckCircle2}
          iconColor="#10b981"
          iconBg="#ecfdf5"
          description="Verified completed works"
        />
        <StatCard
          title="Avg. Resolution Time"
          value="4.6 hrs"
          icon={Clock}
          iconColor="#8b5cf6"
          iconBg="#f5f3ff"
          description="Seeded SLA response speed"
        />
        <StatCard
          title="System Detection Rate"
          value="98.2%"
          icon={ShieldCheck}
          iconColor="#0d9488"
          iconBg="#f0fdfa"
          description="Simulated AI accuracy"
        />
      </div>

      {/* C, D & F. Charts & Infrastructure Health Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
        {/* C. Issue Category Distribution */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Category Distribution</div>
              <div className="card-subtitle">Active and resolved breakdown</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Potholes */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Wrench size={13} color="#3b82f6" /> Road Hazards & Potholes
                  </span>
                  <span>{potholeCount} ({totalCount ? Math.round((potholeCount / totalCount) * 100) : 0}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(potholeCount / (totalCount || 1)) * 100}%`, height: '100%', background: '#3b82f6' }} />
                </div>
              </div>

              {/* Streetlights */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Zap size={13} color="#f59e0b" /> Faulty Streetlights
                  </span>
                  <span>{streetlightCount} ({totalCount ? Math.round((streetlightCount / totalCount) * 100) : 0}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(streetlightCount / (totalCount || 1)) * 100}%`, height: '100%', background: '#f59e0b' }} />
                </div>
              </div>

              {/* Garbage */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Trash2 size={13} color="#10b981" /> Waste Overflow
                  </span>
                  <span>{garbageCount} ({totalCount ? Math.round((garbageCount / totalCount) * 100) : 0}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(garbageCount / (totalCount || 1)) * 100}%`, height: '100%', background: '#10b981' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* D. Issue Priority Distribution */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Priority Classification</div>
              <div className="card-subtitle">AI-evaluated risk triage</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { label: 'Critical', count: prioCritical, color: '#ef4444', bg: '#fef2f2' },
                { label: 'High', count: prioHigh, color: '#f59e0b', bg: '#fffbeb' },
                { label: 'Medium', count: prioMedium, color: '#eab308', bg: '#fefce8' },
                { label: 'Low', count: prioLow, color: '#10b981', bg: '#ecfdf5' }
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '90px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: item.color }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{item.label}</span>
                  </div>
                  <div style={{ flex: 1, margin: '0 0.75rem' }}>
                    <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${(item.count / (totalCount || 1)) * 100}%`, height: '100%', background: item.color }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* F. Infrastructure Health Section */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Infrastructure Health</div>
              <div className="card-subtitle">Municipal Health Index (Operational Assessment)</div>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 600 }}>Road Infrastructure</span>
                  <span style={{ fontWeight: 700, color: roadHealth > 75 ? '#10b981' : '#f59e0b' }}>{roadHealth}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${roadHealth}%`, height: '100%', background: '#0d9488' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 600 }}>Streetlight Mesh Network</span>
                  <span style={{ fontWeight: 700, color: lightHealth > 75 ? '#10b981' : '#f59e0b' }}>{lightHealth}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${lightHealth}%`, height: '100%', background: '#3b82f6' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 600 }}>Solid Waste & Sanitation</span>
                  <span style={{ fontWeight: 700, color: wasteHealth > 75 ? '#10b981' : '#f59e0b' }}>{wasteHealth}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${wasteHealth}%`, height: '100%', background: '#10b981' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* E. Recent Incidents Table & G. Activity Timeline Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
        {/* E. Recent Incidents Table */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Recent Operational Incidents</div>
              <div className="card-subtitle">Latest sensor & camera events</div>
            </div>
            <button
              onClick={() => setActiveTab('issues')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.78rem' }}
            >
              <span>View All ({totalCount})</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="card-body" style={{ padding: '0' }}>
            <div className="table-container" style={{ border: 'none' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Issue ID</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Severity</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentIncidents.map(inc => (
                    <tr
                      key={inc.id}
                      onClick={() => setActiveIncident(inc)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0d9488' }}>
                        {inc.id}
                      </td>
                      <td>
                        <CategoryBadge category={inc.category} />
                      </td>
                      <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {inc.location}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: inc.severity === 'CRITICAL' ? '#ef4444' : '#475569' }}>
                          {inc.severity}
                        </span>
                      </td>
                      <td>
                        <PriorityBadge priority={inc.priority} />
                      </td>
                      <td>
                        <StatusBadge status={inc.status} />
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setActiveIncident(inc);
                          }}
                          className="btn-icon"
                          style={{ display: 'inline-flex', padding: '0.3rem' }}
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* G. Detection Activity Timeline */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Detection Activity Log</div>
              <div className="card-subtitle">Real-time civic events</div>
            </div>
          </div>
          <div className="card-body" style={{ maxHeight: '380px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {activityLogs.slice(0, 7).map(act => (
                <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: act.badge === 'CRITICAL' ? '#ef4444' : '#0d9488',
                      marginTop: '6px',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                        {act.title}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                      {act.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
