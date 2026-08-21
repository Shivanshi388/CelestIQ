import { useState } from 'react';
import { Bell, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-20 w-full flex items-center justify-between px-8 topbar-bg backdrop-blur-md border-b border-border z-30 sticky top-0 transition-all duration-300">
      <div>
        <p className="text-muted text-sm font-medium">Welcome back,</p>
        <h1 className="text-primary text-xl font-bold tracking-wide">Mission Control</h1>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleTheme}
          className="p-2 text-muted hover:text-foreground hover:scale-110 transition-all duration-300 rounded-lg hover:bg-surface-light group"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 transition-transform duration-500 rotate-0 group-hover:rotate-45" />
          ) : (
            <Moon className="w-5 h-5 transition-transform duration-500 rotate-0 group-hover:-rotate-12" />
          )}
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-muted hover:text-foreground hover:scale-110 transition-all duration-300 rounded-lg hover:bg-surface-light"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-background"></span>
          </button>

          {showNotifications && (
            <>
              {/* Overlay Backdrop to click-dismiss and blur container */}
              <div 
                className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]" 
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-3 w-80 bg-surface/95 backdrop-blur-md rounded-xl shadow-2xl border border-border p-4 z-50 animate-[fadeInScale_0.2s_cubic-bezier(0.16,1,0.3,1)_forwards] transform-gpu">
                <h3 className="text-sm font-bold text-foreground mb-3 border-b border-border pb-2 flex justify-between items-center">
                  <span>System Alerts</span>
                  <span className="text-[10px] bg-danger/10 text-danger px-1.5 py-0.5 rounded font-mono">2 NEW</span>
                </h3>
                <div className="space-y-3">
                  <div className="text-xs border-b border-border pb-3 hover:bg-surface-light/40 p-1.5 rounded transition-all duration-200 cursor-pointer">
                    <p className="text-foreground font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse"></span>
                      Anomaly detected on SAT-07
                    </p>
                    <p className="text-muted mt-1 text-[10px] pl-3">Orbit deflection exceeds threshold limit</p>
                    <p className="text-muted mt-1 pl-3 font-mono text-[9px]">2 mins ago</p>
                  </div>
                  <div className="text-xs hover:bg-surface-light/40 p-1.5 rounded transition-all duration-200 cursor-pointer">
                    <p className="text-foreground font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse"></span>
                      Maneuver C requires review
                    </p>
                    <p className="text-muted mt-1 text-[10px] pl-3">Fuel reserves approaching optimal margins</p>
                    <p className="text-muted mt-1 pl-3 font-mono text-[9px]">1 hour ago</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="h-8 w-px bg-border"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-xl hover:bg-surface-light transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-surface-light border border-primary/30 flex items-center justify-center text-primary font-bold group-hover:scale-105 transition-all shadow-glow-primary">
            MC
          </div>
          <div>
            <p className="text-foreground text-sm font-semibold leading-none mb-1">Mission Controller</p>
            <p className="text-muted text-xs">Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted group-hover:text-foreground group-hover:translate-y-0.5 transition-all" />
        </div>
      </div>
    </header>
  );
};
