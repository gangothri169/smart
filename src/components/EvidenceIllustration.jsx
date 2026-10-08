import React from 'react';

export default function EvidenceIllustration({ type = 'pothole_deep', category = 'POTHOLE', height = 180 }) {
  if (category === 'POTHOLE' || type.includes('pothole')) {
    return (
      <div style={{ position: 'relative', width: '100%', height, background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
        <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
          {/* Asphalt Road Background */}
          <rect width="400" height="200" fill="#334155" />
          {/* Road Lane Markings */}
          <line x1="0" y1="30" x2="400" y2="30" stroke="#f1f5f9" strokeWidth="4" strokeDasharray="20,15" opacity="0.6" />
          <line x1="0" y1="170" x2="400" y2="170" stroke="#f1f5f9" strokeWidth="4" strokeDasharray="20,15" opacity="0.6" />
          <line x1="0" y1="100" x2="400" y2="100" stroke="#e2e8f0" strokeWidth="6" strokeDasharray="40,25" />
          
          {/* Pothole Crater */}
          <ellipse cx="205" cy="115" rx="75" ry="38" fill="#0f172a" />
          <ellipse cx="200" cy="110" rx="70" ry="34" fill="#1e1e24" />
          <ellipse cx="195" cy="108" rx="55" ry="24" fill="#0a0a0c" />
          
          {/* Cracks and Jagged Fractures */}
          <path d="M140,110 L105,95 L80,105 M150,135 L120,155 L90,150" stroke="#475569" strokeWidth="2.5" fill="none" />
          <path d="M260,105 L295,90 L325,95 M250,130 L285,145 L310,140" stroke="#475569" strokeWidth="2.5" fill="none" />
          
          {/* AI Bounding Box & Depth Marker */}
          <rect x="110" y="65" width="180" height="90" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" />
          <rect x="110" y="45" width="130" height="20" fill="#ef4444" rx="3" />
          <text x="115" y="59" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">AI DETECT: CAVITY 16cm</text>
          
          {/* Confidence Tag */}
          <circle cx="280" cy="75" r="4" fill="#10b981" />
          <text x="290" y="79" fill="#10b981" fontSize="10" fontFamily="monospace">CONF: 96.8%</text>
        </svg>
        <div style={{ position: 'absolute', bottom: '6px', right: '10px', fontSize: '10px', color: '#94a3b8', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>
          Edge Vision Telemetry: Pavement Scan
        </div>
      </div>
    );
  }

  if (category === 'STREETLIGHT' || type.includes('light')) {
    return (
      <div style={{ position: 'relative', width: '100%', height, background: '#090d16', borderRadius: '10px', overflow: 'hidden' }}>
        <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
          {/* Night Horizon & Ground */}
          <rect width="400" height="200" fill="#090d16" />
          <rect y="160" width="400" height="40" fill="#1e293b" />
          <line x1="0" y1="160" x2="400" y2="160" stroke="#334155" strokeWidth="2" />
          
          {/* Streetlight Pole */}
          <path d="M170,165 L175,45 Q175,25 205,25 L245,25" stroke="#64748b" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Fixture Lamp Head */}
          <polygon points="240,25 265,33 260,40 235,32" fill="#94a3b8" />
          
          {/* Dark / Flickering Bulb Effect */}
          {type === 'light_flicker' ? (
            <>
              <polygon points="242,38 180,160 320,160" fill="url(#flickerGrad)" opacity="0.35" />
              <defs>
                <linearGradient id="flickerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <circle cx="250" cy="36" r="6" fill="#f59e0b" filter="drop-shadow(0 0 6px #f59e0b)" />
            </>
          ) : (
            <>
              {/* Fault indicator cross */}
              <circle cx="250" cy="35" r="9" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
              <line x1="244" y1="29" x2="256" y2="41" stroke="#ef4444" strokeWidth="2" />
              <line x1="256" y1="29" x2="244" y2="41" stroke="#ef4444" strokeWidth="2" />
            </>
          )}

          {/* Electrical Base Junction Box Alert */}
          <rect x="166" y="125" width="16" height="26" fill="#334155" rx="2" />
          <circle cx="174" cy="138" r="3" fill="#ef4444" />
          
          {/* Diagnostic Overlay */}
          <rect x="25" y="30" width="135" height="48" fill="rgba(15,23,42,0.85)" rx="4" stroke="#f59e0b" strokeWidth="1" />
          <text x="32" y="48" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">LUMINANCE: 0 LUX</text>
          <text x="32" y="62" fill="#cbd5e1" fontSize="9" fontFamily="monospace">POWER DRAW: 0.0 W</text>
          <text x="32" y="74" fill="#ef4444" fontSize="9" fontFamily="monospace">CIRCUIT: OPEN FAULT</text>
        </svg>
        <div style={{ position: 'absolute', bottom: '6px', right: '10px', fontSize: '10px', color: '#94a3b8', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>
          Smart Grid Telemetry: Luminaire Mesh Diagnostic
        </div>
      </div>
    );
  }

  // Garbage category fallback
  return (
    <div style={{ position: 'relative', width: '100%', height, background: '#1c1917', borderRadius: '10px', overflow: 'hidden' }}>
      <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
        {/* Pavement Ground */}
        <rect width="400" height="200" fill="#292524" />
        <rect y="150" width="400" height="50" fill="#44403c" />
        
        {/* Municipal Smart Bin Body */}
        <rect x="160" y="80" width="80" height="85" fill="#047857" rx="6" />
        <rect x="155" y="72" width="90" height="12" fill="#065f46" rx="3" />
        {/* Bin Wheels & Handles */}
        <circle cx="170" cy="165" r="7" fill="#1c1917" />
        <circle cx="230" cy="165" r="7" fill="#1c1917" />
        
        {/* Recyling / City Logo */}
        <circle cx="200" cy="115" r="16" fill="#065f46" />
        <text x="194" y="120" fill="#a7f3d0" fontSize="14" fontWeight="bold">♻</text>
        
        {/* Overflowing Waste Bags & Debris */}
        <ellipse cx="190" cy="68" rx="28" ry="16" fill="#0284c7" opacity="0.9" />
        <ellipse cx="215" cy="62" rx="25" ry="18" fill="#ea580c" opacity="0.9" />
        <ellipse cx="175" cy="58" rx="20" ry="14" fill="#ca8a04" opacity="0.85" />
        {/* Side Spill on Ground */}
        <ellipse cx="255" cy="155" rx="22" ry="12" fill="#78716c" />
        <ellipse cx="270" cy="158" rx="16" ry="8" fill="#ca8a04" />
        
        {/* Optical Volumetric Sensor Bounding Box */}
        <rect x="140" y="45" width="145" height="115" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,3" />
        <rect x="140" y="24" width="125" height="20" fill="#f59e0b" rx="3" />
        <text x="145" y="38" fill="#000000" fontSize="10" fontFamily="monospace" fontWeight="bold">CAPACITY: 142% SPILL</text>
        
        {/* Ultrasonic reading banner */}
        <rect x="20" y="40" width="105" height="42" fill="rgba(0,0,0,0.7)" rx="4" stroke="#a7f3d0" strokeWidth="1" />
        <text x="26" y="56" fill="#a7f3d0" fontSize="10" fontFamily="monospace">FILL SENSOR: FULL</text>
        <text x="26" y="70" fill="#f87171" fontSize="9" fontFamily="monospace">STATUS: OVERFLOW</text>
      </svg>
      <div style={{ position: 'absolute', bottom: '6px', right: '10px', fontSize: '10px', color: '#94a3b8', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>
        Optical Volumetric Telemetry: Smart Waste Node
      </div>
    </div>
  );
}
