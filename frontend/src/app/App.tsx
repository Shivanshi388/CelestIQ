import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { DashboardHome } from '../pages/DashboardHome';
import { OrbitView } from '../pages/OrbitView';
import { AlertsView } from '../pages/AlertsView';
import { ManeuversView } from '../pages/ManeuversView';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';
import { LoginPage } from '../pages/LoginPage';
import { useAuthStore } from '../store/auth.store';

function App() {
  const { isAuthenticated, user, initDb } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      initDb();
    }
  }, [isAuthenticated, initDb]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const isGuest = user?.role === 'Guest';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-[var(--text-main)] transition-colors duration-300">
      {/* Sidebar fixed on the left */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Subtle background glow effects - visible in dark mode only */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none dark:block hidden" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none dark:block hidden" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background/0 to-transparent rounded-full pointer-events-none dark:block hidden" />
        
        <Topbar />

        {/* Scrollable Dashboard Container */}
        <main className="flex-1 overflow-y-auto p-5 z-10">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/3d" element={isGuest ? <UnauthorizedPage /> : <OrbitView />} />
            <Route 
              path="/alerts" 
              element={isGuest ? (
                <UnauthorizedPage 
                  title="Alerts & Risk Locked" 
                  message="Guest users are restricted from viewing detailed risk assessments and critical system alerts. Please authenticate using authorized credentials to view system alerts." 
                />
              ) : <AlertsView />} 
            />
            <Route 
              path="/maneuvers" 
              element={isGuest ? (
                <UnauthorizedPage 
                  title="Maneuver Compare Locked" 
                  message="Guest users are restricted from analyzing orbital maneuver comparisons and telemetry forecasts. Please authenticate using authorized credentials to view maneuver operations." 
                />
              ) : <ManeuversView />} 
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
