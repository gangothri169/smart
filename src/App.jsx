import React from 'react';
import { CityProvider, useCity } from './context/CityContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import LiveMonitoring from './pages/LiveMonitoring';
import IssueManagement from './pages/IssueManagement';
import MapView from './pages/MapView';
import Departments from './pages/Departments';
import Analytics from './pages/Analytics';
import PublicPortal from './pages/PublicPortal';
import SettingsPage from './pages/Settings';
import IncidentDetailsModal from './components/IncidentDetailsModal';
import CreateIncidentModal from './components/CreateIncidentModal';

function AppContent() {
  const { activeTab } = useCity();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'overview':
        return <Dashboard />;
      case 'monitoring':
        return <LiveMonitoring />;
      case 'issues':
        return <IssueManagement />;
      case 'map':
        return <MapView />;
      case 'departments':
        return <Departments />;
      case 'analytics':
        return <Analytics />;
      case 'public_portal':
        return <PublicPortal />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Operational Area */}
      <main className="app-main">
        <Header />
        {renderActivePage()}
      </main>

      {/* Global Modals */}
      <IncidentDetailsModal />
      <CreateIncidentModal />
    </div>
  );
}

export default function App() {
  return (
    <CityProvider>
      <AppContent />
    </CityProvider>
  );
}
