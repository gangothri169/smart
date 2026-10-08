import React, { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  PlusCircle,
  Clock,
  Sparkles,
  CheckCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  X,
  User,
  LogOut
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { USER_ROLES, ROLE_LABELS } from '../services/auth';

export default function Header() {
  const {
    activeTab,
    searchQuery,
    setSearchQuery,
    notifications,
    isNotificationOpen,
    setIsNotificationOpen,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setActiveIncident,
    incidents,
    simulateNewDetection,
    setIsCreateModalOpen,
    currentUser,
    logout
  } = useCity();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const pageTitles = {
    overview: 'Infrastructure Overview',
    monitoring: 'Real-Time IoT Monitoring Station',
    issues: 'Issue Management & Workflows',
    map: 'Geospatial Incident Map',
    departments: 'Municipal Department Allocation',
    analytics: 'Performance & Incident Analytics',
    settings: 'System Configuration',
    public_portal: 'Civic Grievance Portal'
  };

  const handleNotificationClick = notif => {
    markNotificationAsRead(notif.id);
    if (notif.incidentId) {
      const inc = incidents.find(i => i.id === notif.incidentId);
      if (inc) setActiveIncident(inc);
    }
  };

  return (
    <header className="top-header">
      {/* Page Title & Breadcrumb */}
      <div className="header-left">
        <div className="header-breadcrumbs">
          <span>UrbanPulse</span>
          <span>/</span>
          <span className="current">{pageTitles[activeTab] || 'Operations'}</span>
        </div>

        {/* Global Search Input */}
        <div className="header-search">
          <Search size={15} className="header-search-icon" />
          <input
            type="text"
            placeholder="Search by ID, keyword, location..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="header-right">
        {/* Simulate New Detection Button */}
        <button
          onClick={simulateNewDetection}
          className="btn btn-primary btn-sm"
          title="Simulate incoming sensor telemetry"
          style={{ background: 'linear-gradient(135deg, #0d9488, #0284c7)' }}
        >
          <Sparkles size={14} />
          <span>Simulate Telemetry</span>
        </button>

        {/* Create Manual Report Button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn btn-secondary btn-sm"
          title="Log a manual civic or inspector report"
        >
          <PlusCircle size={14} color="#0d9488" />
          <span>Manual Report</span>
        </button>

        {/* Live Clock */}
        <div className="clock-display" title="System Local Time">
          <Clock size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
          {currentTime}
        </div>

        {/* Municipal System Status Chip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: '#f8fafc',
            padding: '0.3rem 0.65rem',
            borderRadius: '20px',
            border: '1px solid #e2e8f0'
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0d9488' }} />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a' }}>Operations Command</span>
        </div>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="btn-icon"
            style={{ position: 'relative' }}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '10px',
                  fontWeight: '700',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 4px rgba(0,0,0,0.3)'
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationOpen && (
            <div className="notification-popover">
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#f8fafc'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Civic Notifications</span>
                  <span
                    style={{
                      background: '#0d9488',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.45rem',
                      borderRadius: '10px'
                    }}
                  >
                    {unreadCount} new
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={markAllNotificationsAsRead}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0d9488',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <CheckCheck size={13} />
                    Mark all read
                  </button>
                  <button
                    onClick={() => setIsNotificationOpen(false)}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Notification List */}
              <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                    No recent notifications
                  </div>
                ) : (
                  notifications.map(n => {
                    let Icon = Info;
                    let iconColor = '#3b82f6';
                    if (n.type === 'critical' || n.type === 'alert') {
                      Icon = AlertTriangle;
                      iconColor = '#ef4444';
                    } else if (n.type === 'success') {
                      Icon = CheckCircle2;
                      iconColor = '#10b981';
                    }

                    return (
                      <div
                        key={n.id}
                        className={`notification-item ${!n.read ? 'unread' : ''}`}
                        onClick={() => handleNotificationClick(n)}
                      >
                        <div style={{ paddingTop: '2px' }}>
                          <Icon size={16} color={iconColor} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a' }}>
                            {n.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                            {n.description}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '4px' }}>
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        {!n.read && (
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: '#0d9488',
                              alignSelf: 'center'
                            }}
                          />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
