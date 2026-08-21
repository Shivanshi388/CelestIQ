import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { DashboardHome } from '../pages/DashboardHome';
import { OrbitView } from '../pages/OrbitView';
import { AlertsView } from '../pages/AlertsView';
import { ManeuversView } from '../pages/ManeuversView';

function App() {
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
            <Route path="/3d" element={<OrbitView />} />
            <Route path="/alerts" element={<AlertsView />} />
            <Route path="/maneuvers" element={<ManeuversView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
