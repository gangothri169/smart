import React, { useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Layers,
  Cpu,
  ShieldAlert,
  ArrowRight,
  Trash2,
  CheckCircle,
  Clock,
  UserCheck,
  AlertTriangle,
  Lightbulb,
  Building2,
  Lock
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from './Badges';
import EvidenceIllustration from './EvidenceIllustration';
import { DEPARTMENTS } from '../data/seedData';
import { USER_ROLES } from '../services/auth';

export default function IncidentDetailsModal() {
  const {
    activeIncident,
    setActiveIncident,
    updateIncidentStatus,
    updateIncidentPriority,
    updateIncidentDepartment,
    deleteIncident,
    currentUser,
    canModifyIncident
  } = useCity();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!activeIncident) return null;

  const isEditable = canModifyIncident(activeIncident);

  const handleStatusChange = newStatus => {
    updateIncidentStatus(activeIncident.id, newStatus);
  };

  const handlePriorityChange = newPriority => {
    updateIncidentPriority(activeIncident.id, newPriority);
  };

  const handleDepartmentChange = newDept => {
    updateIncidentDepartment(activeIncident.id, newDept);
  };

  const handleDelete = () => {
    deleteIncident(activeIncident.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveIncident(null)}>
      <div className="modal-content" style={{ maxWidth: '780px' }} onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem', color: '#0d9488' }}>
              {activeIncident.id}
            </span>
            <CategoryBadge category={activeIncident.category} />
            <PriorityBadge priority={activeIncident.priority} />
            <StatusBadge status={activeIncident.status} />
          </div>
          <button
            onClick={() => setActiveIncident(null)}
            className="btn-icon"
            style={{ border: 'none' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Title & Description */}
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
              {activeIncident.title}
            </h2>
            <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>
              {activeIncident.description}
            </p>
          </div>

          {/* Quick Location & Meta Info Card */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.85rem',
              backgroundColor: '#f8fafc',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid #e2e8f0'
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <MapPin size={13} color="#0d9488" /> Location & Coordinates
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.82rem', marginTop: '2px', color: '#1e293b' }}>
                {activeIncident.location}
              </div>
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                {activeIncident.latitude.toFixed(4)}° N, {activeIncident.longitude.toFixed(4)}° E
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Cpu size={13} color="#0d9488" /> Detection Source
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.82rem', marginTop: '2px', color: '#1e293b' }}>
                {activeIncident.detectionSource}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                Reported {new Date(activeIncident.createdAt).toLocaleString()}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Building2 size={13} color="#0d9488" /> Responsible Department
              </div>
              {isEditable ? (
                <select
                  className="form-control"
                  value={activeIncident.department}
                  onChange={e => handleDepartmentChange(e.target.value)}
                  style={{ fontSize: '0.78rem', padding: '0.3rem 0.5rem', marginTop: '4px' }}
                >
                  {Object.values(DEPARTMENTS).map(dept => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              ) : (
                <div style={{ fontWeight: 600, fontSize: '0.82rem', marginTop: '2px', color: '#1e293b' }}>
                  {activeIncident.department}
                </div>
              )}
            </div>
          </div>

          {/* AI Prioritization & Explainability Panel */}
          <div
            style={{
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '1.1rem',
              backgroundColor: '#f0fdfa'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={18} color="#0d9488" />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f766e' }}>
                  AI Scoring & Explainability
                </span>
                <span style={{ fontSize: '0.7rem', color: '#0f766e', background: '#ccfbf1', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                  Automated Risk Engine
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#0f766e', fontWeight: 600 }}>Priority Score:</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#0f172a' }}>
                  {activeIncident.priorityScore} / 100
                </span>
              </div>
            </div>

            {/* Score progress bar */}
            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.85rem' }}>
              <div
                style={{
                  width: `${activeIncident.priorityScore}%`,
                  height: '100%',
                  background:
                    activeIncident.priorityScore >= 85
                      ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                      : activeIncident.priorityScore >= 65
                      ? 'linear-gradient(90deg, #10b981, #f59e0b)'
                      : '#3b82f6',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>

            {/* Why was this issue prioritized? */}
            <div style={{ backgroundColor: 'white', padding: '0.85rem', borderRadius: '8px', border: '1px solid #ccfbf1' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f766e', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Lightbulb size={14} color="#0d9488" /> Why was this issue prioritized?
              </div>
              <p style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.45 }}>
                {activeIncident.priorityReason}
              </p>
            </div>

            {/* Recommended Action */}
            <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <ArrowRight size={16} color="#0d9488" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Recommended Action: </span>
                <span style={{ fontSize: '0.8rem', color: '#475569' }}>{activeIncident.recommendedAction}</span>
              </div>
            </div>
          </div>

          {/* Evidence Illustration */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>IoT Detection Evidence Visual</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 400, color: '#64748b' }}>(Edge Sensor Telemetry Visual)</span>
            </div>
            <EvidenceIllustration
              type={activeIncident.evidenceType}
              category={activeIncident.category}
              height={170}
            />
          </div>

          {/* Status & Priority Management Controls (Role-protected) */}
          {isEditable ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
                backgroundColor: '#f8fafc',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #e2e8f0'
              }}
            >
              {/* Status Workflow Selector */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  Update Workflow Status:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {['Detected', 'Under Review', 'Assigned', 'In Progress', 'Resolved'].map(st => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: activeIncident.status === st ? '#0d9488' : '#ffffff',
                        color: activeIncident.status === st ? '#ffffff' : '#334155',
                        borderColor: activeIncident.status === st ? '#0d9488' : '#cbd5e1'
                      }}
                    >
                      {st === 'Resolved' && <CheckCircle size={12} />}
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Override */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '0.4rem' }}>
                  Adjust Priority Level:
                </label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(pr => (
                    <button
                      key={pr}
                      onClick={() => handlePriorityChange(pr)}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: activeIncident.priority === pr ? '#1e293b' : '#ffffff',
                        color: activeIncident.priority === pr ? '#ffffff' : '#334155',
                        borderColor: activeIncident.priority === pr ? '#1e293b' : '#cbd5e1'
                      }}
                    >
                      {pr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '0.85rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.82rem',
                color: '#64748b'
              }}
            >
              <Lock size={15} color="#0d9488" />
              <span>
                {currentUser?.role === USER_ROLES.PUBLIC
                  ? 'Civic Grievance View: Departmental workflows and dispatch status are managed by authorized city engineers.'
                  : `Role Restriction: You are logged in as ${currentUser?.role}. Only assigned ${activeIncident.department} engineers can modify this record.`}
              </span>
            </div>
          )}

          {/* Audit History & Timeline */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={15} color="#0d9488" />
              <span>Resolution History & Audit Log</span>
            </div>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem', maxHeight: '180px', overflowY: 'auto' }}>
              {activeIncident.history && activeIncident.history.length > 0 ? (
                activeIncident.history.map((hist, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '0.4rem 0',
                      borderBottom: idx < activeIncident.history.length - 1 ? '1px dashed #e2e8f0' : 'none'
                    }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0d9488', marginTop: '6px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e293b' }}>
                          {hist.action}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                          {new Date(hist.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        <span style={{ fontWeight: 600 }}>{hist.user}:</span> {hist.note}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>No recorded history events</div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <div>
            {isEditable && (
              <>
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="btn btn-secondary btn-sm"
                    style={{ color: '#ef4444', borderColor: '#fca5a5' }}
                  >
                    <Trash2 size={13} />
                    Delete Incident
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#ef4444', fontWeight: 600 }}>Confirm deletion?</span>
                    <button onClick={handleDelete} className="btn btn-danger btn-sm">Yes, Delete</button>
                    <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-secondary btn-sm">Cancel</button>
                  </div>
                )}
              </>
            )}
          </div>
          <button
            onClick={() => setActiveIncident(null)}
            className="btn btn-primary btn-sm"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
