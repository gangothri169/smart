import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  RotateCcw,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  Building2,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../components/Badges';
import { DEPARTMENTS } from '../data/seedData';

export default function IssueManagement() {
  const {
    incidents,
    roleScopedIncidents,
    setActiveIncident,
    setIsCreateModalOpen,
    searchQuery,
    setSearchQuery,
    updateIncidentStatus,
    currentUser
  } = useCity();

  // Local Filter States
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc, prio-desc

  // Filter logic scoped to user's assigned role
  const filteredIncidents = useMemo(() => {
    return roleScopedIncidents.filter(inc => {
      // Global/local search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = inc.id.toLowerCase().includes(q);
        const matchesTitle = inc.title.toLowerCase().includes(q);
        const matchesLocation = inc.location.toLowerCase().includes(q);
        if (!matchesId && !matchesTitle && !matchesLocation) return false;
      }

      // Category filter
      if (selectedCategory !== 'ALL' && inc.category !== selectedCategory) return false;

      // Priority filter
      if (selectedPriority !== 'ALL' && inc.priority !== selectedPriority) return false;

      // Status filter
      if (selectedStatus !== 'ALL' && inc.status !== selectedStatus) return false;

      // Department filter
      if (selectedDepartment !== 'ALL' && inc.department !== selectedDepartment) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'prio-desc') {
        return b.priorityScore - a.priorityScore;
      }
      return 0;
    });
  }, [incidents, searchQuery, selectedCategory, selectedPriority, selectedStatus, selectedDepartment, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('ALL');
    setSelectedPriority('ALL');
    setSelectedStatus('ALL');
    setSelectedDepartment('ALL');
    setSearchQuery('');
  };

  const isFiltered = selectedCategory !== 'ALL' || selectedPriority !== 'ALL' || selectedStatus !== 'ALL' || selectedDepartment !== 'ALL' || searchQuery.trim().length > 0;

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
            Civic Issue Management
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
            Review, prioritize, dispatch, and track municipal road, lighting, and waste incidents.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn btn-primary"
        >
          <Plus size={16} />
          <span>Create Manual Report</span>
        </button>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Top row: search + sort */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '2.3rem' }}
                placeholder="Search issues by ID, title, or location..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', whiteSpace: 'nowrap' }}>Sort By:</span>
              <select
                className="form-control"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{ width: '160px', padding: '0.45rem 0.65rem', fontSize: '0.82rem' }}
              >
                <option value="date-desc">Newest First</option>
                <option value="prio-desc">Highest Priority Score</option>
              </select>
            </div>
          </div>

          {/* Bottom row: category, priority, status, department filters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', alignItems: 'center' }}>
            {/* Category */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Category</label>
              <select
                className="form-control"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
              >
                <option value="ALL">All Categories</option>
                <option value="POTHOLE">Potholes & Roads</option>
                <option value="STREETLIGHT">Faulty Streetlights</option>
                <option value="GARBAGE">Garbage Overflow</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Priority</label>
              <select
                className="form-control"
                value={selectedPriority}
                onChange={e => setSelectedPriority(e.target.value)}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
              >
                <option value="ALL">All Priorities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Status</label>
              <select
                className="form-control"
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
              >
                <option value="ALL">All Statuses</option>
                <option value="Detected">Detected</option>
                <option value="Under Review">Under Review</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>Department</label>
              <select
                className="form-control"
                value={selectedDepartment}
                onChange={e => setSelectedDepartment(e.target.value)}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
              >
                <option value="ALL">All Departments</option>
                {Object.values(DEPARTMENTS).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div style={{ paddingTop: '1.25rem' }}>
              <button
                onClick={handleClearFilters}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', opacity: isFiltered ? 1 : 0.6 }}
                disabled={!isFiltered}
              >
                <RotateCcw size={13} />
                <span>Clear Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>Operational Incident Register</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0d9488', background: '#f0fdfa', padding: '0.15rem 0.6rem', borderRadius: '12px' }}>
              {filteredIncidents.length} matching
            </span>
          </div>
        </div>

        <div className="card-body" style={{ padding: 0 }}>
          {filteredIncidents.length === 0 ? (
            <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f1f5f9', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', marginBottom: '0.75rem' }}>
                <Search size={20} />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>No incidents matched your query</h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>
                Try adjusting your search criteria or clear the filters.
              </p>
              <button onClick={handleClearFilters} className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="table-container" style={{ border: 'none' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Issue ID</th>
                    <th>Category</th>
                    <th>Title & Location</th>
                    <th>GPS Coords</th>
                    <th>Severity</th>
                    <th>Priority (Score)</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIncidents.map(inc => (
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
                        <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>
                          {inc.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '2px' }}>
                          <MapPin size={12} color="#94a3b8" />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {inc.location}
                          </span>
                        </div>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#64748b' }}>
                        {inc.latitude.toFixed(3)}, {inc.longitude.toFixed(3)}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: inc.severity === 'CRITICAL' ? '#ef4444' : inc.severity === 'HIGH' ? '#d97706' : '#64748b' }}>
                          {inc.severity}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <PriorityBadge priority={inc.priority} />
                          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                            ({inc.priorityScore})
                          </span>
                        </div>
                      </td>
                      <td style={{ maxWidth: '160px', fontSize: '0.78rem', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {inc.department}
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
                          <span>Inspect</span>
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
    </div>
  );
}
