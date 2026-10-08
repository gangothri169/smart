// LocalStorage Persistence Service for UrbanPulse AI
import { INITIAL_INCIDENTS, INITIAL_NOTIFICATIONS, INITIAL_ACTIVITY_LOG } from '../data/seedData';

const STORAGE_KEYS = {
  INCIDENTS: 'urbanpulse_incidents_v1',
  NOTIFICATIONS: 'urbanpulse_notifications_v1',
  ACTIVITY: 'urbanpulse_activity_v1',
  SETTINGS: 'urbanpulse_settings_v1'
};

const DEFAULT_SETTINGS = {
  simulationInterval: 8, // seconds
  autoMonitoring: false,
  soundAlerts: false,
  notificationAlerts: true,
  theme: 'light',
  cityArea: 'Bengaluru Smart City Pilot Corridor'
};

export function loadIncidents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
    if (!raw) {
      saveIncidents(INITIAL_INCIDENTS);
      return INITIAL_INCIDENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_INCIDENTS;
  } catch (err) {
    console.error('Failed to load incidents from localStorage, resetting to seed data:', err);
    return INITIAL_INCIDENTS;
  }
}

export function saveIncidents(incidents) {
  try {
    localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(incidents));
  } catch (err) {
    console.error('Failed to persist incidents:', err);
  }
}

export function loadNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!raw) {
      saveNotifications(INITIAL_NOTIFICATIONS);
      return INITIAL_NOTIFICATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_NOTIFICATIONS;
  } catch (err) {
    console.error('Failed to load notifications:', err);
    return INITIAL_NOTIFICATIONS;
  }
}

export function saveNotifications(notifications) {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  } catch (err) {
    console.error('Failed to persist notifications:', err);
  }
}

export function loadActivityLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
    if (!raw) {
      saveActivityLog(INITIAL_ACTIVITY_LOG);
      return INITIAL_ACTIVITY_LOG;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_ACTIVITY_LOG;
  } catch (err) {
    console.error('Failed to load activity log:', err);
    return INITIAL_ACTIVITY_LOG;
  }
}

export function saveActivityLog(logs) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(logs));
  } catch (err) {
    console.error('Failed to persist activity log:', err);
  }
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to persist settings:', err);
  }
}

export function resetAllStorage() {
  try {
    localStorage.removeItem(STORAGE_KEYS.INCIDENTS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITY);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  } catch (err) {
    console.error('Error clearing localStorage:', err);
  }
}
