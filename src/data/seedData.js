// Realistic demonstration dataset for UrbanPulse AI
// Smart City Infrastructure Monitoring (Bengaluru Municipal Corporation Pilot Area)

export const DEPARTMENTS = {
  ROAD: 'Road Infrastructure & Maintenance',
  ELECTRICAL: 'Electrical & Street Lighting Division',
  WASTE: 'Solid Waste Management & Sanitation'
};

export const CATEGORIES = {
  POTHOLE: 'Pothole & Road Hazard',
  STREETLIGHT: 'Faulty Streetlight',
  GARBAGE: 'Garbage & Waste Overflow'
};

export const INITIAL_INCIDENTS = [
  {
    id: 'UP-1001',
    category: 'POTHOLE',
    title: 'Severe Cavity on Outer Ring Road Flyover Ramp',
    description: 'Deep road depression (~18cm depth) on fast lane near junction, causing sudden swerving of two-wheelers and high risk of collisions.',
    location: 'Outer Ring Road, Marathahalli Junction Ramp B',
    latitude: 12.9562,
    longitude: 77.7019,
    severity: 'CRITICAL',
    priority: 'CRITICAL',
    priorityScore: 94,
    priorityReason: 'High-speed arterial corridor; depth exceeds 15cm safety threshold with imminent hazard for light motor vehicles.',
    recommendedAction: 'Immediate deployment of asphalt patch squad; place warning retro-reflective cones within 90 minutes.',
    department: DEPARTMENTS.ROAD,
    status: 'In Progress',
    detectionSource: 'CAM-014 (Mobile Highway Patrol Cam)',
    createdAt: new Date(Date.now() - 3600 * 1000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    resolvedAt: null,
    evidenceType: 'pothole_deep',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 8).toISOString(), action: 'Detected', user: 'AI Edge Vision Node CAM-014', note: 'Visual anomaly confidence 96.4%' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 7).toISOString(), action: 'Prioritized', user: 'UrbanPulse AI Engine', note: 'Classified Critical (Score: 94/100)' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 5).toISOString(), action: 'Assigned', user: 'Dispatcher Manoj K.', note: 'Routed to Rapid Road Repair Unit 3' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(), action: 'In Progress', user: 'Engineer S. Patil', note: 'Emergency crew on site, barricading lane' }
    ]
  },
  {
    id: 'UP-1002',
    category: 'STREETLIGHT',
    title: 'Consecutive Dark Poles at Primary School Pedestrian Crossing',
    description: 'Circuit breaker trip resulting in 4 consecutive non-operational LED luminaires on 80-meter pedestrian pathway.',
    location: '12th Main Road, HAL 2nd Stage, Indiranagar',
    latitude: 12.9719,
    longitude: 77.6412,
    severity: 'CRITICAL',
    priority: 'CRITICAL',
    priorityScore: 89,
    priorityReason: 'Complete illumination loss at designated school zone and vulnerable pedestrian transit node after dusk.',
    recommendedAction: 'Dispatch electrical line technician to inspect pole junction box and replace phase contactor.',
    department: DEPARTMENTS.ELECTRICAL,
    status: 'Assigned',
    detectionSource: 'NODE-032 (Smart SmartGrid Node)',
    createdAt: new Date(Date.now() - 3600 * 1000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 9).toISOString(),
    resolvedAt: null,
    evidenceType: 'light_out',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 14).toISOString(), action: 'Detected', user: 'IoT Luminescence Mesh Node 032', note: 'Zero lux recorded during scheduled active hours' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 12).toISOString(), action: 'Under Review', user: 'UrbanPulse AI Engine', note: 'Fault correlated with feeder line alert' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 9).toISOString(), action: 'Assigned', user: 'System Auto-Router', note: 'Assigned to East Division Electric Crew' }
    ]
  },
  {
    id: 'UP-1003',
    category: 'GARBAGE',
    title: 'Severe Commercial Waste Overflow Blocking Sidewalk',
    description: 'Bulk commercial organic and dry waste spillage occupying entire pedestrian walkway and spilling onto motor carriage lane.',
    location: 'Commercial Street, Tasker Town Market Area',
    latitude: 12.9822,
    longitude: 77.6083,
    severity: 'HIGH',
    priority: 'HIGH',
    priorityScore: 78,
    priorityReason: 'High pedestrian footfall commercial market; runoff hazard and public health risk in high-density shopping zone.',
    recommendedAction: 'Dispatch mechanical waste compactor truck and order secondary collection cycle.',
    department: DEPARTMENTS.WASTE,
    status: 'In Progress',
    detectionSource: 'CAM-008 (Municipal Surveillance Cam)',
    createdAt: new Date(Date.now() - 3600 * 1000 * 22).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    resolvedAt: null,
    evidenceType: 'garbage_spill',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 22).toISOString(), action: 'Detected', user: 'Edge AI CAM-008', note: 'Bin volume fill detected at 145% (spill condition)' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 18).toISOString(), action: 'Assigned', user: 'Waste Ops Supervisor', note: 'Assigned to Ward 93 Sanitation Squad' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 4).toISOString(), action: 'In Progress', user: 'Driver R. Kumar', note: 'Compactor vehicle en route to Commercial St' }
    ]
  },
  {
    id: 'UP-1004',
    category: 'POTHOLE',
    title: 'Multiple Surface Fractures near Metro Pillar 124',
    description: 'Cluster of crocodile cracks and medium asphalt craters causing traffic slowdown during morning peak hours.',
    location: 'CMH Road, Metro Pillar 124, Indiranagar',
    latitude: 12.9784,
    longitude: 77.6398,
    severity: 'MEDIUM',
    priority: 'MEDIUM',
    priorityScore: 58,
    priorityReason: 'Moderate depth road deterioration; causing minor bottle-necking but no structural foundation failure.',
    recommendedAction: 'Include in scheduled weekly night milling and bituminous overlay cycle.',
    department: DEPARTMENTS.ROAD,
    status: 'Under Review',
    detectionSource: 'CAM-019 (City Bus Dashcam Vision)',
    createdAt: new Date(Date.now() - 3600 * 1000 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    resolvedAt: null,
    evidenceType: 'pothole_cracks',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 30).toISOString(), action: 'Detected', user: 'Bus Fleet IoT Video Stream', note: 'Repeated vertical vibration spikes > 2.4g' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(), action: 'Under Review', user: 'Ward Road Inspector', note: 'Assessing resurfacing scope' }
    ]
  },
  {
    id: 'UP-1005',
    category: 'STREETLIGHT',
    title: 'High-Mast Luminaire Flickering at MG Road Promenade',
    description: 'High-frequency flickering and intermittent driver shutoff on 20m high-mast pole at major civic promenade.',
    location: 'Mahatma Gandhi Road, Near Trinity Circle',
    latitude: 12.9733,
    longitude: 77.6205,
    severity: 'MEDIUM',
    priority: 'MEDIUM',
    priorityScore: 52,
    priorityReason: 'Visual disturbance and degraded lighting level in prominent commercial district; ballast overheating suspected.',
    recommendedAction: 'Inspect LED power supply unit and replace faulty constant-current driver module.',
    department: DEPARTMENTS.ELECTRICAL,
    status: 'Detected',
    detectionSource: 'NODE-081 (Smart Streetlight Node)',
    createdAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    resolvedAt: null,
    evidenceType: 'light_flicker',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 5).toISOString(), action: 'Detected', user: 'IoT Luminaire Current Sensor', note: 'Erratic power draw oscillations (24W - 180W)' }
    ]
  },
  {
    id: 'UP-1006',
    category: 'GARBAGE',
    title: 'Overflowing Smart Dumpster Unit at Residential Park Corner',
    description: 'Solid waste container capacity at 98%; lids ajar with stray animal scavenging around the perimeter.',
    location: 'Madhavan Park, 3rd Block, Jayanagar',
    latitude: 12.9304,
    longitude: 77.5834,
    severity: 'MEDIUM',
    priority: 'MEDIUM',
    priorityScore: 61,
    priorityReason: 'Recreational residential zone; odor dispersion and hygiene hazard near senior citizen walking track.',
    recommendedAction: 'Reroute afternoon tipper truck for priority clearance.',
    department: DEPARTMENTS.WASTE,
    status: 'Assigned',
    detectionSource: 'NODE-105 (Ultrasonic Bin Sensor)',
    createdAt: new Date(Date.now() - 3600 * 1000 * 16).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 11).toISOString(),
    resolvedAt: null,
    evidenceType: 'garbage_full',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 16).toISOString(), action: 'Detected', user: 'IoT Ultrasonic Fill Sensor', note: 'Bin level exceeded 95% threshold for > 2 hours' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 11).toISOString(), action: 'Assigned', user: 'South Zone Waste Control', note: 'Assigned to Vehicle KA-01-EA-4921' }
    ]
  },
  {
    id: 'UP-1007',
    category: 'POTHOLE',
    title: 'Submerged Road Cavity Near Stormwater Drain',
    description: 'Waterlogged depression camouflaged by light rainwater pool, causing vehicle underbody scrapes.',
    location: '100 Feet Intermediate Ring Road, Koramangala 4th Block',
    latitude: 12.9352,
    longitude: 77.6245,
    severity: 'HIGH',
    priority: 'HIGH',
    priorityScore: 76,
    priorityReason: 'Hidden waterlogged hazard on major tech-hub commuter link; severe risk of wet-skid accidents.',
    recommendedAction: 'Clear stormwater inlet blockage and apply fast-curing polymer modified cold-mix asphalt.',
    department: DEPARTMENTS.ROAD,
    status: 'Resolved',
    createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    resolvedAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    evidenceType: 'pothole_deep',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 48).toISOString(), action: 'Detected', user: 'Traffic Surveillance AI CAM-022', note: 'Identified standing water hazard' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 40).toISOString(), action: 'Assigned', user: 'Koramangala Ward Officer', note: 'Assigned to Highway maintenance crew' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 20).toISOString(), action: 'In Progress', user: 'Site Foreman Dinesh', note: 'Drain cleaned, road surface dried and primed' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 12).toISOString(), action: 'Resolved', user: 'Civil Engineer P. Rao', note: 'Cold mix leveled and compacted. Traffic reopened.' }
    ]
  },
  {
    id: 'UP-1008',
    category: 'STREETLIGHT',
    title: 'Damaged Fixture Arm Following Wind Gusts',
    description: 'Streetlight pole #67 physical arm detached from bracket and hanging precariously by electrical wiring.',
    location: 'Sarjapur Main Road, Near Bellandur Gate',
    latitude: 12.9261,
    longitude: 77.6762,
    severity: 'CRITICAL',
    priority: 'CRITICAL',
    priorityScore: 92,
    priorityReason: 'Physical overhead falling hazard directly over motorized lane; imminent electrocution/impact risk.',
    recommendedAction: 'Emergency power cutoff to feeder segment; dispatch hydraulic crane platform for luminaire removal.',
    department: DEPARTMENTS.ELECTRICAL,
    status: 'In Progress',
    detectionSource: 'CAM-055 (Traffic Monitoring Camera)',
    createdAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 1).toISOString(),
    resolvedAt: null,
    evidenceType: 'light_out',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 3).toISOString(), action: 'Detected', user: 'Traffic AI CAM-055', note: 'Structural deflection alert triggered' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(), action: 'Prioritized', user: 'UrbanPulse Safety Engine', note: 'Critical Safety Alert issued' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 1).toISOString(), action: 'In Progress', user: 'Emergency Electrical Van 4', note: 'Sky-lift stationed on site; segment de-energized' }
    ]
  },
  {
    id: 'UP-1009',
    category: 'GARBAGE',
    title: 'Accumulated Construction Debris on Green Belt',
    description: 'Unauthorized dumping of masonry rubble, broken tiles, and packaging sacks along municipal green verge.',
    location: '14th Cross, 27th Main, HSR Layout Sector 1',
    latitude: 12.9121,
    longitude: 77.6446,
    severity: 'LOW',
    priority: 'LOW',
    priorityScore: 34,
    priorityReason: 'Off-carriage debris without active drainage blockage or pedestrian thoroughfare obstruction.',
    recommendedAction: 'Schedule JCB loader and tipper lorry during scheduled non-peak ward debris drive.',
    department: DEPARTMENTS.WASTE,
    status: 'Under Review',
    detectionSource: 'CAM-072 (Ward CCTV Node)',
    createdAt: new Date(Date.now() - 3600 * 1000 * 42).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 36).toISOString(),
    resolvedAt: null,
    evidenceType: 'garbage_spill',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 42).toISOString(), action: 'Detected', user: 'Ward Surveillance Cam 072', note: 'Static object segmentation flag' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 36).toISOString(), action: 'Under Review', user: 'Sanitation Junior Engineer', note: 'Notice issued for community clearing' }
    ]
  },
  {
    id: 'UP-1010',
    category: 'POTHOLE',
    title: 'Pavement Edge Erosion on Residential Lane',
    description: 'Bitumen edge crumbling along curb line over 3.5 meter length in quiet neighborhood.',
    location: '7th Cross, Malleshwaram West',
    latitude: 12.9984,
    longitude: 77.5678,
    severity: 'LOW',
    priority: 'LOW',
    priorityScore: 28,
    priorityReason: 'Low-speed residential zone; edge crumbling does not impinge on primary vehicular wheel paths.',
    recommendedAction: 'Queue for upcoming residential sub-division patch program.',
    department: DEPARTMENTS.ROAD,
    status: 'Resolved',
    createdAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 28).toISOString(),
    resolvedAt: new Date(Date.now() - 3600 * 1000 * 28).toISOString(),
    evidenceType: 'pothole_cracks',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 72).toISOString(), action: 'Detected', user: 'Mobile Pavement Scan 09', note: 'Edge index variance noted' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 50).toISOString(), action: 'Assigned', user: 'West Zone Works Branch', note: 'Allocated to Ward 65 Maintenance' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 28).toISOString(), action: 'Resolved', user: 'Maintenance Contractor', note: 'Edge curb stone reset and bitumen edge sealed.' }
    ]
  },
  {
    id: 'UP-1011',
    category: 'STREETLIGHT',
    title: 'Total Blackout on Service Road Underpass',
    description: '8 sodium-vapor underpass fixtures unlit due to moisture ingress in distribution box; pitch black condition.',
    location: 'Old Airport Road, Domlur Underpass Service Road',
    latitude: 12.9611,
    longitude: 77.6387,
    severity: 'HIGH',
    priority: 'HIGH',
    priorityScore: 82,
    priorityReason: 'Zero illumination inside enclosed tunnel section; heightened accident vulnerability for evening motorists.',
    recommendedAction: 'Drain distribution box, install water-tight seal, and replace blown main fuses.',
    department: DEPARTMENTS.ELECTRICAL,
    status: 'Resolved',
    createdAt: new Date(Date.now() - 3600 * 1000 * 55).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
    resolvedAt: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
    evidenceType: 'light_out',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 55).toISOString(), action: 'Detected', user: 'IoT Tunnel Substation Monitor', note: 'Zero illumination current alert' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 45).toISOString(), action: 'Assigned', user: 'Central Electrical Control', note: 'Emergency dispatch to Domlur Underpass' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(), action: 'In Progress', user: 'Tech Team Lead V. Gowda', note: 'Replacing junction seal and MCB units' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 18).toISOString(), action: 'Resolved', user: 'Tech Team Lead V. Gowda', note: 'Underpass fully relit and verified by remote telemetry.' }
    ]
  },
  {
    id: 'UP-1012',
    category: 'GARBAGE',
    title: 'Biomedical and Wet Waste Dumped Outside Clinic Complex',
    description: 'Improper segregation and unsealed clinical waste bags mixed with general wet refuse on side lane.',
    location: '17th Main Road, BTM Layout 2nd Stage',
    latitude: 12.9165,
    longitude: 77.6101,
    severity: 'HIGH',
    priority: 'HIGH',
    priorityScore: 81,
    priorityReason: 'Biohazard risk and contamination threat adjacent to healthcare clinics and local eateries.',
    recommendedAction: 'Dispatch specialized hazardous waste disposal van; issue notice to non-compliant commercial clinics.',
    department: DEPARTMENTS.WASTE,
    status: 'Detected',
    createdAt: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
    resolvedAt: null,
    evidenceType: 'garbage_spill',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 6).toISOString(), action: 'Detected', user: 'Smart Health Patrol Cam-03', note: 'Bio-refuse pattern matched' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 6).toISOString(), action: 'Prioritized', user: 'UrbanPulse Health & Hazard Engine', note: 'Elevated to High Priority' }
    ]
  },
  {
    id: 'UP-1013',
    category: 'POTHOLE',
    title: 'Severe Trench Depression Near Bus Terminal Gate',
    description: 'Unfinished utility trench subsidence creating a 2-meter long ridge across main entrance gate.',
    location: 'Majestic Bus Stand, Terminal 2 Entry Gate',
    latitude: 12.9772,
    longitude: 77.5713,
    severity: 'HIGH',
    priority: 'HIGH',
    priorityScore: 84,
    priorityReason: 'Mass transit hub with thousands of buses and pedestrians per hour; severe disruption and chassis damage risk.',
    recommendedAction: 'Mandate immediate concrete backfill and heavy-duty cold bituminous asphalt compaction.',
    department: DEPARTMENTS.ROAD,
    status: 'Assigned',
    detectionSource: 'CAM-090 (Station Entrance Camera)',
    createdAt: new Date(Date.now() - 3600 * 1000 * 19).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 10).toISOString(),
    resolvedAt: null,
    evidenceType: 'pothole_deep',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 19).toISOString(), action: 'Detected', user: 'Terminal Automated AI Vision', note: 'Significant vehicular deceleration and bump profile' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 10).toISOString(), action: 'Assigned', user: 'Terminal Transit Ops', note: 'Assigned to Public Works Urban Transit Wing' }
    ]
  },
  {
    id: 'UP-1014',
    category: 'STREETLIGHT',
    title: 'Exposed Live Wires at Base of Streetlight Pole #19',
    description: 'Inspection hatch missing with exposed wiring terminals at knee height near busy bus stop shelter.',
    location: 'Bannerghatta Main Road, Near Jayadeva Hospital Flyover',
    latitude: 12.9182,
    longitude: 77.5973,
    severity: 'CRITICAL',
    priority: 'CRITICAL',
    priorityScore: 97,
    priorityReason: 'Extreme public electrocution danger in high pedestrian hospital zone; live conductors accessible to public.',
    recommendedAction: 'Emergency line cutoff, replace terminal block, and bolt tamper-proof steel junction door.',
    department: DEPARTMENTS.ELECTRICAL,
    status: 'In Progress',
    detectionSource: 'NODE-142 (Tamper Alert Sensor)',
    createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 1).toISOString(),
    resolvedAt: null,
    evidenceType: 'light_out',
    history: [
      { timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(), action: 'Detected', user: 'IoT Pole Tamper Switch & Current Sensor', note: 'Enclosure breached and ground fault detected' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 1.5).toISOString(), action: 'Prioritized', user: 'UrbanPulse Safety Engine', note: 'Emergency Critical Alert: High Public Hazard' },
      { timestamp: new Date(Date.now() - 3600 * 1000 * 1).toISOString(), action: 'In Progress', user: 'Rapid Electrical Safety Unit', note: 'Crew on site, insulating wires and fitting replacement cover' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    title: 'Emergency Critical Incident Detected',
    description: 'Live exposed wiring detected on Bannerghatta Rd near Jayadeva Hospital (UP-1014).',
    timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    incidentId: 'UP-1014',
    read: false,
    type: 'critical'
  },
  {
    id: 'NOTIF-02',
    title: 'New Pothole Detected on Outer Ring Road',
    description: 'CAM-014 flagged severe cavity on fast lane flyover ramp (UP-1001).',
    timestamp: new Date(Date.now() - 3600 * 1000 * 8).toISOString(),
    incidentId: 'UP-1001',
    read: false,
    type: 'alert'
  },
  {
    id: 'NOTIF-03',
    title: 'Incident Resolved: Koramangala 4th Block',
    description: 'Submerged road cavity (UP-1007) successfully asphalted and verified.',
    timestamp: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    incidentId: 'UP-1007',
    read: true,
    type: 'success'
  },
  {
    id: 'NOTIF-04',
    title: 'Department Assignment Update',
    description: 'UP-1002 assigned to Electrical & Street Lighting Division.',
    timestamp: new Date(Date.now() - 3600 * 1000 * 9).toISOString(),
    incidentId: 'UP-1002',
    read: true,
    type: 'info'
  }
];

export const INITIAL_ACTIVITY_LOG = [
  {
    id: 'ACT-01',
    title: 'Critical Electrical Hazard In Progress',
    detail: 'Rapid Electrical Safety Unit dispatched for UP-1014 (Bannerghatta Road).',
    timestamp: new Date(Date.now() - 3600 * 1000 * 1).toISOString(),
    badge: 'CRITICAL',
    type: 'status_change'
  },
  {
    id: 'ACT-02',
    title: 'AI Detection Event Recorded',
    detail: 'NODE-142 triggered tamper switch on streetlight pole #19.',
    timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    badge: 'IoT DETECTION',
    type: 'detection'
  },
  {
    id: 'ACT-03',
    title: 'Road Repair Unit Assigned',
    detail: 'Pothole incident UP-1001 assigned to Rapid Road Repair Unit 3.',
    timestamp: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    badge: 'ASSIGNMENT',
    type: 'assignment'
  },
  {
    id: 'ACT-04',
    title: 'Issue Resolved: UP-1007',
    detail: 'Waterlogged depression on 100 Feet Ring Rd repaired by civil team.',
    timestamp: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    badge: 'RESOLVED',
    type: 'resolved'
  },
  {
    id: 'ACT-05',
    title: 'Smart Waste Compactor Dispatched',
    detail: 'Vehicle allocated to Commercial Street commercial overflow (UP-1003).',
    timestamp: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
    badge: 'IN PROGRESS',
    type: 'assignment'
  }
];
