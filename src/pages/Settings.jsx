import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  RotateCcw,
  Sliders,
  Bell,
  Clock,
  Radio,
  Trash2,
  Check,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useCity } from '../context/CityContext';

export default function SettingsPage() {
  const {
    settings,
    setSettings,
    isMonitoring,
    setIsMonitoring,
    resetMonitoringEvents,
    resetAllData
  } = useCity();

  const [intervalVal, setIntervalVal] = useState(settings.simulationInterval || 8);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveSettings = () => {
    setSettings({
      ...settings,
      simulationInterval: parseInt(intervalVal, 10)
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleRestoreDefaults = () => {
    resetAllData();
    setShowResetConfirm(false);
    setIntervalVal(8);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px' }}>
      {/* Page Title */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
          System Configuration & Settings
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
          Telemetry streaming pacing, civic alert parameters, and municipal dataset controls.
        </p>
      </div>

      {saveToast && (
        <div style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Check size={16} />
          <span>System configuration successfully updated!</span>
        </div>
      )}

      {/* Product & Environment Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Radio size={18} color="#0d9488" />
            <span>Product Identity & Environment</span>
          </div>
          <span className="demo-chip">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0284c7' }} />
            Operational Deployment
          </span>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
            <span style={{ color: '#64748b' }}>Platform Name:</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>UrbanPulse AI</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
            <span style={{ color: '#64748b' }}>Tagline:</span>
            <span style={{ fontWeight: 600, color: '#0d9488' }}>Intelligent Infrastructure. Safer Cities.</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6rem' }}>
            <span style={{ color: '#64748b' }}>Deployment Context:</span>
            <span style={{ fontWeight: 600, color: '#1e293b' }}>UrbanPulse AI Smart City Infrastructure Monitoring Platform</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748b' }}>Architecture Type:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#475569' }}>Edge Vision Telemetry Ingestion + Deterministic AI Prioritization Logic</span>
          </div>
        </div>
      </div>

      {/* Simulation Pacing Controls */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Sliders size={18} color="#0d9488" />
            <span>IoT Simulation Stream Parameters</span>
          </div>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Automatic Monitoring Stream Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                Continuous Background Ingestion
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Periodically generates synthetic IoT camera & sensor events in the background
              </div>
            </div>
            <button
              onClick={() => setIsMonitoring(!isMonitoring)}
              className="btn btn-sm"
              style={{
                backgroundColor: isMonitoring ? '#0d9488' : '#f1f5f9',
                color: isMonitoring ? 'white' : '#475569',
                borderColor: isMonitoring ? '#0d9488' : '#cbd5e1'
              }}
            >
              {isMonitoring ? 'Enabled (Streaming)' : 'Paused'}
            </button>
          </div>

          {/* Interval setting */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Simulation Ingestion Interval (Seconds):</span>
              <span style={{ color: '#0d9488', fontFamily: 'var(--font-mono)' }}>{intervalVal}s</span>
            </label>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={intervalVal}
              onChange={e => setIntervalVal(e.target.value)}
              style={{ width: '100%', accentColor: '#0d9488' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>
              <span>5s (High Frequency)</span>
              <span>15s (Normal)</span>
              <span>30s (Slow)</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSaveSettings} className="btn btn-primary btn-sm">
              <Check size={14} />
              <span>Save Stream Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dataset Reset & Management */}
      <div className="card" style={{ borderColor: '#fecaca' }}>
        <div className="card-header" style={{ backgroundColor: '#fff5f5' }}>
          <div className="card-title" style={{ color: '#991b1b' }}>
            <AlertTriangle size={18} color="#ef4444" />
            <span>Municipal Baseline Data Synchronization</span>
          </div>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
            You can restore the baseline municipal records (potholes, streetlights, and waste overflow in Bengaluru wards), or clear only the real-time telemetry buffer.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={resetMonitoringEvents}
              className="btn btn-secondary btn-sm"
            >
              <RotateCcw size={13} />
              <span>Clear Telemetry Buffer Only</span>
            </button>

            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="btn btn-danger btn-sm"
              >
                <Trash2 size={13} />
                <span>Reset to Baseline Municipal Records</span>
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fef2f2', padding: '0.5rem 0.75rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.78rem', color: '#ef4444', fontWeight: 600 }}>Reset all incidents to baseline?</span>
                <button onClick={handleRestoreDefaults} className="btn btn-danger btn-sm">Confirm Reset</button>
                <button onClick={() => setShowResetConfirm(false)} className="btn btn-secondary btn-sm">Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
