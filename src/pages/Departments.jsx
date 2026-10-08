import React, { useState } from 'react';
import {
  Building2,
  Wrench,
  Zap,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  UserCheck,
  Eye,
  Activity
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { DEPARTMENTS } from '../data/seedData';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../components/Badges';

export default function Departments() {
  const {
    incidents,
    setActiveIncident,
    updateIncidentDepartment,
    currentUser,
    canModifyIncident
  } = useCity();

  const [activeDeptTab, setActiveDeptTab] = useState(() => {
    if (currentUser?.role === 'road') return DEPARTMENTS.ROAD;
    if (currentUser?.role === 'electrical') return DEPARTMENTS.ELECTRICAL;
    if (currentUser?.role === 'waste') return DEPARTMENTS.WASTE;
    return DEPARTMENTS.ROAD;
  });

  const deptConfigs = [
    {
      id: DEPARTMENTS.ROAD,
      name: 'Road Infrastructure & Maintenance',
      shortName: 'Road Maintenance',
      category: 'Potholes, Road Depression, Asphalt Fractures',
      icon: Wrench,
      color: '#3b82f6',
      bg: '#eff6ff',
      lead: 'Chief Engineer K. V. Mohan',
      contact: 'road-ops@bbmp.urbanpulse.gov.in'
    },
    {
      id: DEPARTMENTS.ELECTRICAL,
      name: 'Electrical & Street Lighting Division',
      shortName: 'Electrical Division',
      category: 'Streetlight Luminaires, Power Lines, Feeder Pillars',
      icon: Zap,
      color: '#f59e0b',
      bg: '#fffbeb',
      lead: 'Executive Engineer Sunita Rao',
      contact: 'lighting-ops@bescom.urbanpulse.gov.in'
    },
    {
      id: DEPARTMENTS.WASTE,
      name: 'Solid Waste Management & Sanitation',
      shortName: 'Waste Management',
      category: 'Smart Dustbins, Public Dumps, Commercial Waste',
      icon: Trash2,
      color: '#10b981',
      bg: '#ecfdf5',
      lead: 'Director Sanitation P. Anand',
      contact: 'waste-ops@swm.urbanpulse.gov.in'
    }
  ];

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
          Municipal Department Management
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
          Resource tracking, civic team allocation, and real-time workload balancing across civic operational wings.
        </p>
      </div>

      {/* Department Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1.25rem' }}>
        {deptConfigs.map(dept => {
          const deptIncidents = incidents.filter(i => i.department === dept.id);
          const totalAssigned = deptIncidents.length;
          const openCount = deptIncidents.filter(i => i.status !== 'Resolved').length;
          const resolvedCount = deptIncidents.filter(i => i.status === 'Resolved').length;
          const criticalCount = deptIncidents.filter(i => i.priority === 'CRITICAL' && i.status !== 'Resolved').length;

          // Workload score percentage (clamped 0 to 100)
          const workloadPct = Math.min(100, openCount * 20);
          const isSelected = activeDeptTab === dept.id;
          const Icon = dept.icon;

          return (
            <div
              key={dept.id}
              className="card"
              onClick={() => setActiveDeptTab(dept.id)}
              style={{
                cursor: 'pointer',
                border: isSelected ? `2px solid ${dept.color}` : '1px solid var(--border-subtle)',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transition: 'all 0.2s'
              }}
            >
              <div className="card-header" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      backgroundColor: dept.bg,
                      color: dept.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                      {dept.shortName}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      {dept.category}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Stats 3 columns */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                  <div style={{ background: '#f8fafc', padding: '0.6rem 0.4rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Assigned</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>{totalAssigned}</div>
                  </div>
                  <div style={{ background: '#fffbeb', padding: '0.6rem 0.4rem', borderRadius: '8px', border: '1px solid #fde68a' }}>
                    <div style={{ fontSize: '0.68rem', color: '#b45309' }}>Open</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#b45309', fontFamily: 'var(--font-mono)' }}>{openCount}</div>
                  </div>
                  <div style={{ background: '#ecfdf5', padding: '0.6rem 0.4rem', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                    <div style={{ fontSize: '0.68rem', color: '#047857' }}>Resolved</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#047857', fontFamily: 'var(--font-mono)' }}>{resolvedCount}</div>
                  </div>
                </div>

                {/* Workload Indicator Bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>Active Workload Level</span>
                    <span
                      style={{
                        fontWeight: 700,
                        color: workloadPct > 70 ? '#ef4444' : workloadPct > 40 ? '#f59e0b' : '#10b981'
                      }}
                    >
                      {workloadPct > 70 ? 'High' : workloadPct > 40 ? 'Moderate' : 'Optimal'} ({workloadPct}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '7px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${workloadPct}%`,
                        height: '100%',
                        backgroundColor: workloadPct > 70 ? '#ef4444' : workloadPct > 40 ? '#f59e0b' : '#10b981'
                      }}
                    />
                  </div>
                </div>

                {criticalCount > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#ef4444', background: '#fef2f2', padding: '0.35rem 0.6rem', borderRadius: '6px' }}>
                    <AlertTriangle size={12} />
                    <span>{criticalCount} critical task(s) awaiting dispatch</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Department Roster & Tasks */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <Building2 size={18} color="#0d9488" />
              <span>Assigned Workload Roster: {activeDeptTab}</span>
            </div>
            <div className="card-subtitle">
              Showing active & resolved service tickets allocated to this civic division
            </div>
          </div>
        </div>

        <div className="card-body" style={{ padding: 0 }}>
          {(() => {
            const currentDeptIncidents = incidents.filter(i => i.department === activeDeptTab);

            if (currentDeptIncidents.length === 0) {
              return (
                <div style={{ padding: '3rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
                  No operational incidents currently assigned to this department.
                </div>
              );
            }

            return (
              <div className="table-container" style={{ border: 'none' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Category</th>
                      <th>Incident Title</th>
                      <th>Location</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Reassign Department</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDeptIncidents.map(inc => (
                      <tr key={inc.id} onClick={() => setActiveIncident(inc)} style={{ cursor: 'pointer' }}>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0d9488' }}>
                          {inc.id}
                        </td>
                        <td>
                          <CategoryBadge category={inc.category} />
                        </td>
                        <td style={{ fontWeight: 600, maxWidth: '240px' }}>
                          {inc.title}
                        </td>
                        <td style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          {inc.location}
                        </td>
                        <td>
                          <PriorityBadge priority={inc.priority} />
                        </td>
                        <td>
                          <StatusBadge status={inc.status} />
                        </td>
                        <td onClick={e => e.stopPropagation()}>
                          {canModifyIncident(inc) ? (
                            <select
                              className="form-control"
                              value={inc.department}
                              onChange={e => updateIncidentDepartment(inc.id, e.target.value)}
                              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', width: '180px' }}
                            >
                              {Object.values(DEPARTMENTS).map(d => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{inc.department}</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              setActiveIncident(inc);
                            }}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem' }}
                          >
                            <Eye size={13} />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
