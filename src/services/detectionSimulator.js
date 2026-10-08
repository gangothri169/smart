// Simulated IoT Stream & AI Detection Generator
import { evaluateIncidentPriority } from './prioritization';

const SIMULATION_SCENARIOS = [
  {
    category: 'POTHOLE',
    title: 'Asphalt Shear Fracture on Hosur Main Road',
    description: 'Substantial road depression (~14cm depth) detected on inside lane of busy tech corridor.',
    location: 'Hosur Main Road, Near Forum Mall Junction, Koramangala',
    latitude: 12.9348,
    longitude: 77.6115,
    severity: 'HIGH',
    evidenceType: 'pothole_deep',
    deviceType: 'CAM',
    deviceId: 'CAM-082 (Bus Rapid Transit Dashcam)'
  },
  {
    category: 'STREETLIGHT',
    title: 'Extinguished Luminaire Row on Indiranagar 100ft Road',
    description: 'Zero current reading on 3 consecutive 120W LED fixtures across 60m road stretch.',
    location: '100 Feet Road, Near 6th Main Signal, Indiranagar',
    latitude: 12.9734,
    longitude: 77.6402,
    severity: 'HIGH',
    evidenceType: 'light_out',
    deviceType: 'NODE',
    deviceId: 'NODE-099 (Smart Streetlight Mesh)'
  },
  {
    category: 'GARBAGE',
    title: 'Public Dustbin Spillover Near Metro Station Stairs',
    description: 'Smart optical sensor triggered 98% volume capacity with secondary waste bags piled around base.',
    location: 'MG Road Metro Station Exit 2, Brigade Road Junction',
    latitude: 12.9754,
    longitude: 77.6067,
    severity: 'CRITICAL',
    evidenceType: 'garbage_spill',
    deviceType: 'CAM',
    deviceId: 'CAM-112 (Metro Precinct Security Node)'
  },
  {
    category: 'POTHOLE',
    title: 'Hazardous Crater at Electronic City Toll Flyover',
    description: 'Deep road fissure (20cm) on high-speed flyover descent lane causing abrupt braking.',
    location: 'Elevated Expressway Ramp, Electronic City Phase 1',
    latitude: 12.8452,
    longitude: 77.6602,
    severity: 'CRITICAL',
    evidenceType: 'pothole_deep',
    deviceType: 'CAM',
    deviceId: 'CAM-045 (Highway Surveillance Drone)'
  },
  {
    category: 'STREETLIGHT',
    title: 'Severe Pole Oscillation & Flicker at Whitefield Roundabout',
    description: 'Structural vibration sensor triggered accompanied by intermittent lamp shorting.',
    location: 'ITPL Main Road, Hope Farm Circle, Whitefield',
    latitude: 12.9846,
    longitude: 77.7499,
    severity: 'MEDIUM',
    evidenceType: 'light_flicker',
    deviceType: 'NODE',
    deviceId: 'NODE-155 (Luminance & Gyro Node)'
  },
  {
    category: 'GARBAGE',
    title: 'Commercial Vegetable Waste Dumped at Market Gate',
    description: 'Wet waste heap occupying 50% width of pedestrian service lane; intense leachate seepage.',
    location: 'Russell Market South Gate, Shivajinagar',
    latitude: 12.9858,
    longitude: 77.6009,
    severity: 'HIGH',
    evidenceType: 'garbage_spill',
    deviceType: 'CAM',
    deviceId: 'CAM-033 (Market Ward CCTV)'
  },
  {
    category: 'POTHOLE',
    title: 'Cracked Bitumen Surface Near Malleshwaram 8th Cross',
    description: 'Network of crocodile cracking with loose aggregate stone scatter on residential street.',
    location: 'Sampige Road, 8th Cross, Malleshwaram',
    latitude: 12.9992,
    longitude: 77.5714,
    severity: 'LOW',
    evidenceType: 'pothole_cracks',
    deviceType: 'CAM',
    deviceId: 'CAM-018 (Municipal Patrol Vehicle)'
  }
];

let scenarioIndex = 0;

export function generateSimulatedIncident(existingIncidents = []) {
  // Determine next unique ID
  const existingIds = existingIncidents
    .map(i => parseInt(i.id.replace('UP-', ''), 10))
    .filter(n => !isNaN(n));
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 1014;
  const newId = `UP-${maxId + 1}`;

  // Pick scenario cyclically with minor coordinate jitter to simulate distinct points
  const template = SIMULATION_SCENARIOS[scenarioIndex % SIMULATION_SCENARIOS.length];
  scenarioIndex++;

  const jitterLat = (Math.random() - 0.5) * 0.003;
  const jitterLng = (Math.random() - 0.5) * 0.003;

  // Run AI evaluation
  const evaluation = evaluateIncidentPriority({
    category: template.category,
    severity: template.severity,
    location: template.location
  });

  const now = new Date().toISOString();

  const incident = {
    id: newId,
    category: template.category,
    title: template.title,
    description: template.description,
    location: template.location,
    latitude: Number((template.latitude + jitterLat).toFixed(4)),
    longitude: Number((template.longitude + jitterLng).toFixed(4)),
    severity: template.severity,
    priority: evaluation.priority,
    priorityScore: evaluation.priorityScore,
    priorityReason: evaluation.priorityReason,
    recommendedAction: evaluation.recommendedAction,
    department: evaluation.department,
    status: 'Detected',
    detectionSource: template.deviceId,
    createdAt: now,
    updatedAt: now,
    resolvedAt: null,
    evidenceType: template.evidenceType,
    history: [
      {
        timestamp: now,
        action: 'Detected',
        user: `${template.deviceId} Edge AI`,
        note: `Confidence rating 95.8% | AI Priority Score ${evaluation.priorityScore}/100`
      }
    ]
  };

  const notification = {
    id: `NOTIF-${Date.now().toString().slice(-5)}`,
    title: `New Incident Detected: ${incident.id}`,
    description: `${incident.title} (${incident.priority} Priority, ${incident.location})`,
    timestamp: now,
    incidentId: incident.id,
    read: false,
    type: incident.priority === 'CRITICAL' ? 'critical' : incident.priority === 'HIGH' ? 'alert' : 'info'
  };

  const activity = {
    id: `ACT-${Date.now().toString().slice(-5)}`,
    title: `Simulated Detection (${incident.category})`,
    detail: `${incident.id} generated by ${template.deviceId} at ${incident.location}`,
    timestamp: now,
    badge: incident.priority,
    type: 'detection'
  };

  return { incident, notification, activity };
}
