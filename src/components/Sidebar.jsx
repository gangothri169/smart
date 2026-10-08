import React from 'react';
import {
  LayoutDashboard,
  Activity,
  ListOrdered,
  MapPin,
  Building2,
  BarChart3,
  Settings,
  ShieldCheck,
  Radio,
  Users
} from 'lucide-react';
import { useCity } from '../context/CityContext';

export default function Sidebar() {
  const { activeTab, setActiveTab, incidents } = useCity();

  const openIncidentsCount = incidents.filter(i => i.status !== 'Resolved').length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'monitoring', label: 'Live Telemetry', icon: Activity, pulse: true },
    { id: 'issues', label: 'Incident Management', icon: ListOrdered, badge: openIncidentsCount },
    { id: 'map', label: 'Map View', icon: MapPin },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'public_portal', label: 'Public Grievances', icon: Users },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand-badge">
          <div className="brand-icon-wrapper">
            <Radio size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div className="brand-title">UrbanPulse AI</div>
            <div className="brand-sub">Smart City Operations</div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge !== undefined && (
                <span
                  style={{
                    backgroundColor: isActive ? '#0d9488' : '#334155',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '10px'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="sidebar-footer">
        <div className="status-indicator">
          <div className="status-dot pulse" />
          <span>Telemetry Mesh: Active</span>
        </div>
        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <ShieldCheck size={12} color="#14b8a6" />
          <span>Municipal Operations • v1.0</span>
        </div>
      </div>
    </aside>
  );
}
