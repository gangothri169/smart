import React from 'react';

export default function StatCard({ title, value, icon: Icon, iconColor = '#0d9488', iconBg = '#f0fdfa', description, trend }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className="stat-title">{title}</span>
        <div className="stat-icon" style={{ backgroundColor: iconBg, color: iconColor }}>
          <Icon size={18} strokeWidth={2.2} />
        </div>
      </div>
      <div>
        <div className="stat-value">{value}</div>
        {description && <div className="stat-desc">{description}</div>}
      </div>
    </div>
  );
}
