// AI Prioritization & Scoring Engine (Municipal Logic)
// Deterministic civic infrastructure risk scoring engine.

import { DEPARTMENTS } from '../data/seedData';

/**
 * Calculates priority score and rationale based on incident attributes.
 * Scale: 0 to 100
 * Thresholds:
 *  >= 85 : CRITICAL
 *  65 - 84 : HIGH
 *  40 - 64 : MEDIUM
 *  0 - 39  : LOW
 */
export function evaluateIncidentPriority({
  category,
  severity,
  location = '',
  hazardType = '',
  pedestrianTraffic = 'medium',
  vehicularTraffic = 'medium'
}) {
  let baseScore = 0;

  // Base score from severity
  switch (severity?.toUpperCase()) {
    case 'CRITICAL':
      baseScore = 80;
      break;
    case 'HIGH':
      baseScore = 65;
      break;
    case 'MEDIUM':
      baseScore = 45;
      break;
    case 'LOW':
    default:
      baseScore = 25;
      break;
  }

  // Location / Traffic Corridor modifier
  let trafficModifier = 0;
  const locLower = (location || '').toLowerCase();
  if (locLower.includes('ring road') || locLower.includes('highway') || locLower.includes('junction') || locLower.includes('flyover') || locLower.includes('arterial')) {
    trafficModifier += 10;
  } else if (locLower.includes('commercial') || locLower.includes('market') || locLower.includes('terminal') || locLower.includes('hospital') || locLower.includes('school')) {
    trafficModifier += 8;
  } else if (locLower.includes('main road') || locLower.includes('stage') || locLower.includes('block')) {
    trafficModifier += 4;
  }

  // Category specific risk modifier
  let categoryRisk = 0;
  let riskExplanation = '';

  if (category === 'POTHOLE') {
    if (severity === 'CRITICAL') {
      categoryRisk = 7;
      riskExplanation = 'Deep cavity exceeding safety thresholds on high-speed lane; extreme two-wheeler skidding hazard.';
    } else if (severity === 'HIGH') {
      categoryRisk = 5;
      riskExplanation = 'Significant pavement crater affecting vehicular clearance and causing localized traffic bottlenecks.';
    } else {
      categoryRisk = 2;
      riskExplanation = 'Surface fatigue and road cracking requiring routine maintenance before monsoons.';
    }
  } else if (category === 'STREETLIGHT') {
    if (severity === 'CRITICAL') {
      categoryRisk = 9;
      riskExplanation = 'Exposed high-voltage electrical hardware or dark zone in sensitive public school/pedestrian transit corridor.';
    } else if (severity === 'HIGH') {
      categoryRisk = 6;
      riskExplanation = 'Complete circuit failure along high-traffic corridor creating vision impairment at night.';
    } else {
      categoryRisk = 2;
      riskExplanation = 'Intermittent luminaire flicker or partial LED burnout without total lighting failure.';
    }
  } else if (category === 'GARBAGE') {
    if (severity === 'CRITICAL' || severity === 'HIGH') {
      categoryRisk = 6;
      riskExplanation = 'Bulk organic overflow spilling into public pathway, creating sanitation risks and attracting stray animals.';
    } else {
      categoryRisk = 2;
      riskExplanation = 'Solid waste bin near maximum storage capacity; scheduled clearing required.';
    }
  }

  // Calculate final score bounded between 10 and 99
  const calculatedScore = Math.min(99, Math.max(15, baseScore + trafficModifier + categoryRisk));

  // Determine Priority Label
  let priority = 'LOW';
  if (calculatedScore >= 85) priority = 'CRITICAL';
  else if (calculatedScore >= 65) priority = 'HIGH';
  else if (calculatedScore >= 40) priority = 'MEDIUM';

  // Determine Recommended Action
  let recommendedAction = '';
  if (category === 'POTHOLE') {
    if (priority === 'CRITICAL') {
      recommendedAction = 'Deploy emergency rapid cold-mix asphalt patch crew and place reflective safety cones within 90 minutes.';
    } else if (priority === 'HIGH') {
      recommendedAction = 'Schedule priority bituminous repair within 24 hours with road safety signage.';
    } else {
      recommendedAction = 'Include in upcoming weekly municipal resurfacing and seal-coat roster.';
    }
  } else if (category === 'STREETLIGHT') {
    if (priority === 'CRITICAL') {
      recommendedAction = 'Dispatch emergency electrical line technician; isolate feeder circuit and secure live components immediately.';
    } else if (priority === 'HIGH') {
      recommendedAction = 'Inspect feeder pillar, test circuit breakers, and replace faulty LED drivers within 12 hours.';
    } else {
      recommendedAction = 'Log for scheduled ballast/lamp replacement during bi-weekly maintenance run.';
    }
  } else if (category === 'GARBAGE') {
    if (priority === 'CRITICAL' || priority === 'HIGH') {
      recommendedAction = 'Dispatch secondary high-capacity compactor truck and order sanitization sweep within 4 hours.';
    } else {
      recommendedAction = 'Reroute ward waste collection vehicle for standard clearance cycle.';
    }
  }

  // Assigned Department
  let department = DEPARTMENTS.ROAD;
  if (category === 'STREETLIGHT') department = DEPARTMENTS.ELECTRICAL;
  if (category === 'GARBAGE') department = DEPARTMENTS.WASTE;

  return {
    priorityScore: calculatedScore,
    priority,
    priorityReason: riskExplanation || `Calculated based on ${severity} severity in ${location} zone.`,
    recommendedAction,
    department,
    breakdown: {
      severityBase: baseScore,
      trafficImpact: trafficModifier,
      safetyRisk: categoryRisk
    }
  };
}
