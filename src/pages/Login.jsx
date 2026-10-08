import React, { useState } from 'react';
import {
  Radio,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Shield,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Building2,
  Wrench,
  Zap,
  Trash2,
  Users
} from 'lucide-react';
import { authenticateUser, USER_ROLES, ROLE_LABELS } from '../services/auth';

export default function Login({ onLoginSuccess }) {
  const [role, setRole] = useState(USER_ROLES.ROAD);
  const [identifier, setIdentifier] = useState('roads@urbanpulse.gov.in');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Role quick configs
  const rolePresets = [
    {
      role: USER_ROLES.PUBLIC,
      label: 'Public Citizen',
      subtitle: 'File complaints & track status',
      icon: Users,
      color: '#3b82f6',
      defaultEmail: 'citizen@urbanpulse.gov.in'
    },
    {
      role: USER_ROLES.ROAD,
      label: 'Road Maintenance',
      subtitle: 'Pothole & road repair operations',
      icon: Wrench,
      color: '#0d9488',
      defaultEmail: 'roads@urbanpulse.gov.in'
    },
    {
      role: USER_ROLES.ELECTRICAL,
      label: 'Electrical Division',
      subtitle: 'Streetlight & grid maintenance',
      icon: Zap,
      color: '#f59e0b',
      defaultEmail: 'electrical@urbanpulse.gov.in'
    },
    {
      role: USER_ROLES.WASTE,
      label: 'Waste Management',
      subtitle: 'Sanitation & garbage clearing',
      icon: Trash2,
      color: '#10b981',
      defaultEmail: 'waste@urbanpulse.gov.in'
    }
  ];

  const handleRoleSelect = selectedRole => {
    setRole(selectedRole);
    setError('');
    const preset = rolePresets.find(p => p.role === selectedRole);
    if (preset) {
      setIdentifier(preset.defaultEmail);
      setPassword('Password@123');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!identifier.trim()) {
        throw new Error('Please enter your email or username.');
      }
      if (!password) {
        throw new Error('Please enter your password.');
      }

      const user = await authenticateUser({
        identifier: identifier.trim(),
        password,
        role
      });

      onLoginSuccess(user);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'radial-gradient(ellipse at 50% 20%, #162646 0%, #0b1324 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        fontFamily: 'var(--font-sans)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          overflow: 'hidden'
        }}
      >
        {/* Header Branding */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0b1324 0%, #1e293b 100%)',
            padding: '2rem 2.25rem 1.75rem',
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            borderBottom: '1px solid #334155'
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
              margin: '0 auto 0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 8px 16px rgba(13, 148, 136, 0.35)'
            }}
          >
            <Radio size={28} strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: '1.55rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: '#ffffff' }}>
            UrbanPulse AI
          </h1>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Intelligent Infrastructure • Municipal Operations Portal
          </p>
        </div>

        {/* Form Container */}
        <div style={{ padding: '2rem 2.25rem' }}>
          {error && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: '#991b1b',
                fontSize: '0.82rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}
            >
              <AlertCircle size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Select Role */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#334155',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                Select Access Role
              </label>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem'
                }}
              >
                {rolePresets.map(preset => {
                  const Icon = preset.icon;
                  const isSelected = role === preset.role;
                  return (
                    <button
                      key={preset.role}
                      type="button"
                      onClick={() => handleRoleSelect(preset.role)}
                      style={{
                        padding: '0.65rem 0.75rem',
                        borderRadius: '10px',
                        border: isSelected ? `2px solid ${preset.color}` : '1px solid #e2e8f0',
                        backgroundColor: isSelected ? '#f8fafc' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: '8px',
                          backgroundColor: isSelected ? preset.color : '#f1f5f9',
                          color: isSelected ? '#ffffff' : '#64748b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: isSelected ? '#0f172a' : '#475569',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {preset.label}
                        </div>
                        <div
                          style={{
                            fontSize: '0.66rem',
                            color: '#94a3b8',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {preset.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email or Username input */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.8rem', color: '#334155' }}>
                Email Address or Username
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8'
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="name@urbanpulse.gov.in"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password input with show/hide */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ fontSize: '0.8rem', color: '#334155' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8'
                  }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  style={{ paddingLeft: '2.4rem', paddingRight: '2.5rem' }}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '0.92rem',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(13, 148, 136, 0.35)'
              }}
            >
              {loading ? 'Authenticating...' : `Enter as ${ROLE_LABELS[role]}`}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Info Footer */}
          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid #f1f5f9',
              fontSize: '0.74rem',
              color: '#64748b',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <Shield size={13} color="#0d9488" />
            <span>Secure SHA-256 authenticated municipal access</span>
          </div>
        </div>
      </div>
    </div>
  );
}
