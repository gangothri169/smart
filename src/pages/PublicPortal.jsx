import React, { useState } from 'react';
import {
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Camera,
  FileText,
  Search,
  Eye,
  ShieldCheck,
  Send,
  HelpCircle,
  Activity,
  Layers,
  Wrench,
  Zap,
  Trash2
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../components/Badges';
import StatCard from '../components/StatCard';

export default function PublicPortal() {
  const {
    incidents,
    createManualIncident,
    setActiveIncident,
    currentUser
  } = useCity();

  const [activeTab, setActiveTab] = useState('my-reports'); // 'my-reports' | 'new-report' | 'overview'
  const [successToast, setSuccessToast] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    category: 'POTHOLE',
    title: '',
    description: '',
    location: '',
    latitude: '12.9716',
    longitude: '77.5946',
    severity: 'MEDIUM'
  });
  const [errors, setErrors] = useState({});

  // Citizen's reports: incidents created manually or citizen reports
  // Also show recent citizen-accessible reports
  const myReports = incidents.filter(
    i => i.detectionSource.includes('Citizen') || i.detectionSource.includes('Manual') || i.reportedBy === currentUser?.id
  );

  const totalResolved = incidents.filter(i => i.status === 'Resolved').length;

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Please provide an incident title.';
    if (!formData.description.trim()) newErrors.description = 'Please explain the issue details.';
    if (!formData.location.trim()) newErrors.location = 'Please specify the road or landmark.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const newInc = createManualIncident({
      ...formData,
      status: 'Detected'
    });

    setSuccessToast(`Complaint submitted successfully! Your tracking ticket is ${newInc.id}.`);
    setFormData({
      category: 'POTHOLE',
      title: '',
      description: '',
      location: '',
      latitude: '12.9716',
      longitude: '77.5946',
      severity: 'MEDIUM'
    });
    setActiveTab('my-reports');

    setTimeout(() => {
      setSuccessToast('');
    }, 6000);
  };

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Welcome Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #0b1324 0%, #1e2e4a 100%)',
          color: 'white',
          padding: '1.75rem 2rem',
          borderColor: '#1e293b'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span
                style={{
                  background: 'rgba(56, 189, 248, 0.2)',
                  color: '#38bdf8',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}
              >
                CITIZEN CIVIC PORTAL
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Welcome, {currentUser?.name || 'Citizen'}</span>
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
              Public Infrastructure Service Center
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.3rem' }}>
              Report civic infrastructure issues directly to municipal departments and track real-time resolution status.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setActiveTab('new-report')}
              className="btn btn-primary"
              style={{ background: '#0d9488' }}
            >
              <PlusCircle size={15} />
              <span>File New Complaint</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successToast && (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            padding: '1rem 1.25rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <CheckCircle2 size={20} color="#10b981" />
          <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{successToast}</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.25rem' }}>
        {[
          { id: 'my-reports', label: `My Complaints (${myReports.length})`, icon: Clock },
          { id: 'new-report', label: 'File Complaint', icon: PlusCircle },
          { id: 'overview', label: 'City Resolution Status', icon: Activity }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.1rem',
                border: 'none',
                background: 'none',
                color: isActive ? '#0d9488' : '#64748b',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                borderBottom: isActive ? '3px solid #0d9488' : '3px solid transparent'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: My Reports / Tracking */}
      {activeTab === 'my-reports' && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Track Submitted Complaints</div>
              <div className="card-subtitle">Real-time status updates from assigned municipal departments</div>
            </div>
          </div>

          <div className="card-body" style={{ padding: 0 }}>
            {myReports.length === 0 ? (
              <div style={{ padding: '3.5rem 1rem', textAlign: 'center' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#f0fdfa',
                    color: '#0d9488',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.75rem'
                  }}
                >
                  <FileText size={22} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>No Complaints Logged Yet</h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Notice a pothole, broken streetlight, or garbage overflow in your area? Report it to get it fixed.
                </p>
                <button
                  onClick={() => setActiveTab('new-report')}
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: '1rem' }}
                >
                  <PlusCircle size={14} />
                  <span>Submit Your First Report</span>
                </button>
              </div>
            ) : (
              <div className="table-container" style={{ border: 'none' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Category</th>
                      <th>Issue & Location</th>
                      <th>Assigned Department</th>
                      <th>Reported Time</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Track</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myReports.map(inc => (
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
                        <td style={{ maxWidth: '280px' }}>
                          <div style={{ fontWeight: 600, color: '#0f172a' }}>{inc.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={12} color="#94a3b8" />
                            <span>{inc.location}</span>
                          </div>
                        </td>
                        <td style={{ fontSize: '0.78rem', color: '#475569' }}>
                          {inc.department}
                        </td>
                        <td style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {new Date(inc.createdAt).toLocaleDateString()}
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
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                          >
                            <Eye size={13} />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: File New Report */}
      {activeTab === 'new-report' && (
        <div className="card" style={{ maxWidth: '780px' }}>
          <div className="card-header">
            <div>
              <div className="card-title">File Civic Grievance</div>
              <div className="card-subtitle">Your complaint will be automatically routed to the responsible city department</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Category selection */}
              <div className="form-group">
                <label className="form-label">Category of Civic Problem *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {[
                    { id: 'POTHOLE', label: 'Pothole & Damaged Road', icon: Wrench, color: '#3b82f6' },
                    { id: 'STREETLIGHT', label: 'Faulty Streetlight', icon: Zap, color: '#f59e0b' },
                    { id: 'GARBAGE', label: 'Garbage & Waste Overflow', icon: Trash2, color: '#10b981' }
                  ].map(cat => {
                    const Icon = cat.icon;
                    const isSelected = formData.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        style={{
                          padding: '0.85rem',
                          borderRadius: '8px',
                          border: isSelected ? `2px solid ${cat.color}` : '1px solid #e2e8f0',
                          backgroundColor: isSelected ? '#f8fafc' : '#ffffff',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.4rem',
                          textAlign: 'center'
                        }}
                      >
                        <Icon size={22} color={cat.color} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e293b' }}>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div className="form-group">
                <label className="form-label">Issue Summary / Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Deep crater near Metro Station exit causing two-wheeler skid"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
                {errors.title && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '3px' }}>{errors.title}</div>}
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label">Detailed Description *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Provide any additional details like exact size, hazards, whether water is accumulated, etc."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
                {errors.description && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '3px' }}>{errors.description}</div>}
              </div>

              {/* Location */}
              <div className="form-group">
                <label className="form-label">Exact Location / Landmark *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 100 Feet Road, Near Sony World Signal, Koramangala"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                />
                {errors.location && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '3px' }}>{errors.location}</div>}
              </div>

              {/* Severity estimate */}
              <div className="form-group">
                <label className="form-label">Observed Severity</label>
                <select
                  className="form-control"
                  value={formData.severity}
                  onChange={e => setFormData({ ...formData, severity: e.target.value })}
                >
                  <option value="CRITICAL">Critical (High danger to pedestrians/vehicles)</option>
                  <option value="HIGH">High (Disrupting normal transit or hygiene)</option>
                  <option value="MEDIUM">Medium (Moderate wear or localized defect)</option>
                  <option value="LOW">Low (Minor cosmetic or early-stage defect)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('my-reports')}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: '#0d9488' }}
                >
                  <Send size={15} />
                  <span>Submit Civic Report</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: City Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="grid-cols-3">
            <StatCard
              title="City Issues Logged"
              value={incidents.length}
              icon={Layers}
              iconColor="#3b82f6"
              iconBg="#eff6ff"
              description="Total reported civic problems"
            />
            <StatCard
              title="Issues Successfully Resolved"
              value={totalResolved}
              icon={CheckCircle2}
              iconColor="#10b981"
              iconBg="#ecfdf5"
              description="Repairs verified by city engineers"
            />
            <StatCard
              title="Resolution Rate"
              value={`${incidents.length ? Math.round((totalResolved / incidents.length) * 100) : 0}%`}
              icon={Activity}
              iconColor="#0d9488"
              iconBg="#f0fdfa"
              description="Municipal closure efficiency"
            />
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Municipal Complaint Guidelines</div>
            </div>
            <div className="card-body" style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
              <ul style={{ paddingLeft: '1.25rem' }}>
                <li><strong>Potholes:</strong> Critical potholes are prioritized for cold-mix emergency repair squads within 24–48 hours.</li>
                <li><strong>Streetlights:</strong> Dark zones and unlit street lamps are dispatched to local BESCOM/electrical division teams.</li>
                <li><strong>Garbage:</strong> Commercial bin overflow and unauthorized street dumps trigger compactor truck rerouting.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
