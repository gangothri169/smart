import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  loadIncidents,
  saveIncidents,
  loadNotifications,
  saveNotifications,
  loadActivityLog,
  saveActivityLog,
  loadSettings,
  saveSettings,
  resetAllStorage
} from '../services/storage';
import { generateSimulatedIncident } from '../services/detectionSimulator';
import { evaluateIncidentPriority } from '../services/prioritization';
import { INITIAL_INCIDENTS, INITIAL_NOTIFICATIONS, INITIAL_ACTIVITY_LOG, DEPARTMENTS } from '../data/seedData';

const CityContext = createContext(null);

export function CityProvider({ children }) {
  // Master Incident Datasets
  const [incidents, setIncidents] = useState(() => loadIncidents());
  const [notifications, setNotifications] = useState(() => loadNotifications());
  const [activityLogs, setActivityLogs] = useState(() => loadActivityLog());
  const [settings, setSettings] = useState(() => loadSettings());

  // Navigation & UI state
  const [activeTab, setActiveTab] = useState('overview');
  const [activeIncident, setActiveIncident] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Current User profile info
  const currentUser = {
    name: 'Municipal Operations Command',
    role: 'Operations'
  };

  // Live Telemetry stream state
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [monitoringEvents, setMonitoringEvents] = useState([
    {
      id: 'EVT-501',
      timestamp: new Date(Date.now() - 1000 * 45).toLocaleTimeString(),
      deviceId: 'CAM-014',
      type: 'POTHOLE',
      location: 'Outer Ring Road, Marathahalli',
      confidence: '96.4%',
      status: 'Processed & Incident Created',
      severity: 'CRITICAL'
    },
    {
      id: 'EVT-502',
      timestamp: new Date(Date.now() - 1000 * 95).toLocaleTimeString(),
      deviceId: 'NODE-032',
      type: 'STREETLIGHT',
      location: '12th Main Road, Indiranagar',
      confidence: '99.1%',
      status: 'Processed & Incident Created',
      severity: 'CRITICAL'
    },
    {
      id: 'EVT-503',
      timestamp: new Date(Date.now() - 1000 * 160).toLocaleTimeString(),
      deviceId: 'CAM-008',
      type: 'GARBAGE',
      location: 'Commercial Street Market',
      confidence: '94.2%',
      status: 'Processed & Incident Created',
      severity: 'HIGH'
    }
  ]);

  // Persist state changes
  useEffect(() => {
    saveIncidents(incidents);
  }, [incidents]);

  useEffect(() => {
    saveNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    saveActivityLog(activityLogs);
  }, [activityLogs]);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // All incidents accessible
  const roleScopedIncidents = incidents;
  const roleScopedMonitoringEvents = monitoringEvents;
  const canModifyIncident = () => true;

  // Simulate new detection trigger
  const simulateNewDetection = useCallback(() => {
    const { incident, notification, activity } = generateSimulatedIncident(incidents);

    // Update incidents list (prepend)
    setIncidents(prev => [incident, ...prev]);

    // Update notifications
    setNotifications(prev => [notification, ...prev]);

    // Update activity logs
    setActivityLogs(prev => [activity, ...prev]);

    // Append to live monitoring stream
    setMonitoringEvents(prev => [
      {
        id: `EVT-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toLocaleTimeString(),
        deviceId: incident.detectionSource.split(' ')[0],
        type: incident.category,
        location: incident.location.split(',')[0],
        confidence: '97.2%',
        status: 'Processed & Incident Created',
        severity: incident.severity
      },
      ...prev.slice(0, 24)
    ]);

    return incident;
  }, [incidents]);

  // Automatic monitoring timer
  useEffect(() => {
    if (!isMonitoring) return;

    const intervalSec = Math.max(5, settings.simulationInterval || 8);
    const timer = setInterval(() => {
      simulateNewDetection();
    }, intervalSec * 1000);

    return () => clearInterval(timer);
  }, [isMonitoring, settings.simulationInterval, simulateNewDetection]);

  // Status transition
  const updateIncidentStatus = (id, newStatus) => {
    const targetIncident = incidents.find(i => i.id === id);
    if (!targetIncident) return;

    const now = new Date().toISOString();
    let updatedIncident = null;

    setIncidents(prev =>
      prev.map(item => {
        if (item.id === id) {
          const isResolving = newStatus === 'Resolved';
          const historyEntry = {
            timestamp: now,
            action: newStatus,
            user: 'Civic Operations Dispatcher',
            note: `Incident status updated to "${newStatus}"`
          };

          updatedIncident = {
            ...item,
            status: newStatus,
            updatedAt: now,
            resolvedAt: isResolving ? now : (newStatus === 'In Progress' || newStatus === 'Detected' ? null : item.resolvedAt),
            history: [historyEntry, ...(item.history || [])]
          };
          return updatedIncident;
        }
        return item;
      })
    );

    // Add activity log
    const activityItem = {
      id: `ACT-${Date.now().toString().slice(-5)}`,
      title: `Status Changed: ${id} → ${newStatus}`,
      detail: `Incident marked as ${newStatus} by Operations Command.`,
      timestamp: now,
      badge: newStatus.toUpperCase(),
      type: newStatus === 'Resolved' ? 'resolved' : 'status_change'
    };
    setActivityLogs(prev => [activityItem, ...prev]);

    // Add notification
    const notifItem = {
      id: `NOTIF-${Date.now().toString().slice(-5)}`,
      title: `Incident ${id} Updated`,
      description: `Status changed to ${newStatus}.`,
      timestamp: now,
      incidentId: id,
      read: false,
      type: newStatus === 'Resolved' ? 'success' : 'info'
    };
    setNotifications(prev => [notifItem, ...prev]);

    // Update active incident view if open
    if (activeIncident && activeIncident.id === id) {
      setActiveIncident(updatedIncident);
    }
  };

  // Priority transition
  const updateIncidentPriority = (id, newPriority) => {
    const targetIncident = incidents.find(i => i.id === id);
    if (!targetIncident) return;

    const now = new Date().toISOString();
    let updatedIncident = null;

    setIncidents(prev =>
      prev.map(item => {
        if (item.id === id) {
          const historyEntry = {
            timestamp: now,
            action: 'Priority Adjusted',
            user: 'Operations Officer',
            note: `Priority changed from ${item.priority} to ${newPriority}`
          };

          let newScore = item.priorityScore;
          if (newPriority === 'CRITICAL' && newScore < 85) newScore = 88;
          if (newPriority === 'HIGH' && (newScore < 65 || newScore >= 85)) newScore = 74;
          if (newPriority === 'MEDIUM' && (newScore < 40 || newScore >= 65)) newScore = 52;
          if (newPriority === 'LOW' && newScore >= 40) newScore = 30;

          updatedIncident = {
            ...item,
            priority: newPriority,
            priorityScore: newScore,
            updatedAt: now,
            history: [historyEntry, ...(item.history || [])]
          };
          return updatedIncident;
        }
        return item;
      })
    );

    const activityItem = {
      id: `ACT-${Date.now().toString().slice(-5)}`,
      title: `Priority Override: ${id} (${newPriority})`,
      detail: `Priority manually re-evaluated by Operations Command.`,
      timestamp: now,
      badge: newPriority,
      type: 'priority'
    };
    setActivityLogs(prev => [activityItem, ...prev]);

    if (activeIncident && activeIncident.id === id) {
      setActiveIncident(updatedIncident);
    }
  };

  // Department assignment
  const updateIncidentDepartment = (id, newDept) => {
    const targetIncident = incidents.find(i => i.id === id);
    if (!targetIncident) return;

    const now = new Date().toISOString();
    let updatedIncident = null;

    setIncidents(prev =>
      prev.map(item => {
        if (item.id === id) {
          const historyEntry = {
            timestamp: now,
            action: 'Department Reassigned',
            user: 'Workload Dispatcher',
            note: `Assigned to ${newDept}`
          };

          updatedIncident = {
            ...item,
            department: newDept,
            status: item.status === 'Detected' ? 'Assigned' : item.status,
            updatedAt: now,
            history: [historyEntry, ...(item.history || [])]
          };
          return updatedIncident;
        }
        return item;
      })
    );

    const activityItem = {
      id: `ACT-${Date.now().toString().slice(-5)}`,
      title: `Reassigned: ${id}`,
      detail: `Allocated to ${newDept}.`,
      timestamp: now,
      badge: 'DISPATCH',
      type: 'assignment'
    };
    setActivityLogs(prev => [activityItem, ...prev]);

    if (activeIncident && activeIncident.id === id) {
      setActiveIncident(updatedIncident);
    }
  };

  // Create manual incident
  const createManualIncident = formData => {
    const existingIds = incidents
      .map(i => parseInt(i.id.replace('UP-', ''), 10))
      .filter(n => !isNaN(n));
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 1014;
    const newId = `UP-${maxId + 1}`;

    const evaluation = evaluateIncidentPriority({
      category: formData.category,
      severity: formData.severity,
      location: formData.location
    });

    const now = new Date().toISOString();

    const newIncident = {
      id: newId,
      category: formData.category,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      latitude: parseFloat(formData.latitude) || 12.9716,
      longitude: parseFloat(formData.longitude) || 77.5946,
      severity: formData.severity,
      priority: formData.priority || evaluation.priority,
      priorityScore: evaluation.priorityScore,
      priorityReason: evaluation.priorityReason,
      recommendedAction: evaluation.recommendedAction,
      department: formData.department || evaluation.department,
      status: formData.status || 'Detected',
      detectionSource: 'Civic Report / Field Inspector App',
      createdAt: now,
      updatedAt: now,
      resolvedAt: null,
      evidenceType: formData.category === 'POTHOLE' ? 'pothole_deep' : formData.category === 'STREETLIGHT' ? 'light_out' : 'garbage_spill',
      history: [
        {
          timestamp: now,
          action: 'Created',
          user: 'Field Inspection Console',
          note: 'Logged via UrbanPulse Console'
        }
      ]
    };

    setIncidents(prev => [newIncident, ...prev]);

    const notification = {
      id: `NOTIF-${Date.now().toString().slice(-5)}`,
      title: `Civic Report Registered: ${newId}`,
      description: `${newIncident.title} (${newIncident.priority} Priority)`,
      timestamp: now,
      incidentId: newId,
      read: false,
      type: 'alert'
    };
    setNotifications(prev => [notification, ...prev]);

    const activity = {
      id: `ACT-${Date.now().toString().slice(-5)}`,
      title: `Civic Report (${newIncident.category})`,
      detail: `${newId} logged at ${newIncident.location}`,
      timestamp: now,
      badge: 'REPORT',
      type: 'detection'
    };
    setActivityLogs(prev => [activity, ...prev]);

    return newIncident;
  };

  // Delete incident
  const deleteIncident = id => {
    const itemToDelete = incidents.find(i => i.id === id);
    if (!itemToDelete) return;

    setIncidents(prev => prev.filter(i => i.id !== id));

    if (activeIncident && activeIncident.id === id) {
      setActiveIncident(null);
    }

    const now = new Date().toISOString();
    const activity = {
      id: `ACT-${Date.now().toString().slice(-5)}`,
      title: `Incident Deleted: ${id}`,
      detail: `Record removed from municipal operational ledger.`,
      timestamp: now,
      badge: 'DELETED',
      type: 'status_change'
    };
    setActivityLogs(prev => [activity, ...prev]);
  };

  // Notifications
  const markNotificationAsRead = id => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Reset monitoring stream events only
  const resetMonitoringEvents = () => {
    setMonitoringEvents([]);
  };

  // Reset whole data to seed dataset
  const resetAllData = () => {
    resetAllStorage();
    setIncidents(INITIAL_INCIDENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActivityLogs(INITIAL_ACTIVITY_LOG);
    setActiveIncident(null);
    setIsMonitoring(false);
  };

  // Value export
  const value = {
    currentUser,
    canModifyIncident,
    incidents,
    roleScopedIncidents,
    notifications,
    activityLogs,
    settings,
    setSettings,
    activeTab,
    setActiveTab,
    activeIncident,
    setActiveIncident,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isNotificationOpen,
    setIsNotificationOpen,
    searchQuery,
    setSearchQuery,
    isMonitoring,
    setIsMonitoring,
    monitoringEvents,
    roleScopedMonitoringEvents,
    resetMonitoringEvents,
    simulateNewDetection,
    updateIncidentStatus,
    updateIncidentPriority,
    updateIncidentDepartment,
    createManualIncident,
    deleteIncident,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    resetAllData
  };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}
