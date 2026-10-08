import React from 'react';
import { AlertCircle, Clock, UserCheck, PlayCircle, CheckCircle2 } from 'lucide-react';

export function StatusBadge({ status }) {
  let badgeClass = 'badge-detected';
  let Icon = AlertCircle;

  switch (status) {
    case 'Under Review':
      badgeClass = 'badge-review';
      Icon = Clock;
      break;
    case 'Assigned':
      badgeClass = 'badge-assigned';
      Icon = UserCheck;
      break;
    case 'In Progress':
      badgeClass = 'badge-progress';
      Icon = PlayCircle;
      break;
    case 'Resolved':
      badgeClass = 'badge-resolved';
      Icon = CheckCircle2;
      break;
    default:
      badgeClass = 'badge-detected';
      Icon = AlertCircle;
      break;
  }

  return (
    <span className={`badge badge-status ${badgeClass}`}>
      <Icon size={12} strokeWidth={2.5} />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  let badgeClass = 'badge-low';

  switch (priority) {
    case 'CRITICAL':
      badgeClass = 'badge-critical';
      break;
    case 'HIGH':
      badgeClass = 'badge-high';
      break;
    case 'MEDIUM':
      badgeClass = 'badge-medium';
      break;
    default:
      badgeClass = 'badge-low';
      break;
  }

  return (
    <span className={`badge ${badgeClass}`}>
      {priority}
    </span>
  );
}

export function CategoryBadge({ category }) {
  let label = 'Pothole';
  let color = '#3b82f6';
  let bg = '#eff6ff';

  if (category === 'STREETLIGHT') {
    label = 'Streetlight';
    color = '#f59e0b';
    bg = '#fffbeb';
  } else if (category === 'GARBAGE') {
    label = 'Garbage';
    color = '#10b981';
    bg = '#ecfdf5';
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.2rem 0.55rem',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: '600',
        backgroundColor: bg,
        color: color,
        border: `1px solid ${color}33`,
        whiteSpace: 'nowrap'
      }}
    >
      {label}
    </span>
  );
}
