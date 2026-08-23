import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Globe, AlertTriangle, Layers, Target, Lock, PanelLeftClose, HelpCircle, Bot } from 'lucide-react';
import { useAuthStore } from '../store/auth.store';
import { useUIStore } from '../store/ui.store';
import { FaqModal } from './shared/FaqModal';
import { ChatbotModal } from './shared/ChatbotModal';

export const Sidebar = () => {
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { user } = useAuthStore();
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  
  const activeClass = "flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white border border-primary/40 shadow-[0_0_15px_rgba(74,91,220,0.4)] transition-all duration-300 relative overflow-hidden group";
  const inactiveClass = "flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:text-foreground hover:bg-surface-light border border-transparent transition-all duration-200 group";
  
  const isGuest = user?.role === 'Guest';

  return (
    <aside className={`${isSidebarOpen ? 'w-60' : 'w-20'} h-full bg-surface/50 backdrop-blur-md border-r border-border py-5 flex flex-col justify-between shrink-0 transition-all duration-300 relative group/sidebar`}>
      <div className="flex flex-col w-full">
        {/* Logo Area */}
        <div className={`flex items-center ${isSidebarOpen ? 'px-5 mb-8' : 'px-0 justify-center mb-8'} text-foreground select-none relative group/logo`}>
          <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
             <Target className="w-6 h-6 text-primary absolute" />
             <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping opacity-30" />
             <div className="absolute inset-[-4px] rounded-full border border-primary/20 animate-[spin_8s_linear_infinite]" />
          </div>
          
          <div className={`font-bold text-base tracking-wider leading-tight ml-3 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <span className="text-foreground font-extrabold tracking-widest text-sm">SENTINEL</span>
            <br />
            <span className="text-primary text-[9px] uppercase font-bold tracking-[0.2em]">Command Unit</span>
          </div>

          {/* Original Toggle Icon for Expanded State */}
          {isSidebarOpen && (
            <button 
              onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}
              className="absolute right-4 opacity-0 group-hover/logo:opacity-100 text-muted hover:text-primary transition-all duration-200 focus:opacity-100 z-10"
              title="Close Sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          )}

          {/* Edge Toggle Button (Pill) for Minimized State */}
          {!isSidebarOpen && (
            <button 
              onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}
              className="absolute -right-[1px] w-1.5 h-6 bg-accent/80 hover:bg-accent shadow-[0_0_12px_rgba(0,229,255,0.8)] rounded-full transition-all duration-300 cursor-pointer z-50 opacity-70 hover:opacity-100"
              title="Expand Sidebar"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 px-3">
          <NavLink to="/" className={({isActive}) => isActive ? activeClass : inactiveClass}>
            {({ isActive }) => (
              <>
                <Home className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-muted group-hover:text-foreground'} ${!isSidebarOpen && 'mx-auto'}`} />
                <span className={`font-medium text-xs tracking-wide transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>Dashboard</span>
                {isActive && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-l-full animate-pulse shadow-[0_0_8px_rgba(0,229,255,1)]" />}
              </>
            )}
          </NavLink>
          <NavLink to="/3d" className={({isActive}) => isActive ? activeClass : inactiveClass}>
            {({ isActive }) => (
              <>
                <Globe className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-muted group-hover:text-foreground'} ${!isSidebarOpen && 'mx-auto'}`} />
                <span className={`font-medium text-xs tracking-wide flex items-center gap-1.5 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  3D Visualization
                  {isGuest && <Lock className="w-3 h-3 text-warning animate-pulse" />}
                </span>
                {isActive && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-l-full animate-pulse shadow-[0_0_8px_rgba(0,229,255,1)]" />}
              </>
            )}
          </NavLink>
          <NavLink to="/alerts" className={({isActive}) => isActive ? activeClass : inactiveClass}>
            {({ isActive }) => (
              <>
                <AlertTriangle className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-muted group-hover:text-foreground'} ${!isSidebarOpen && 'mx-auto'}`} />
                <span className={`font-medium text-xs tracking-wide flex items-center gap-1.5 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  Alerts & Risk
                  {isGuest && <Lock className="w-3 h-3 text-warning animate-pulse" />}
                </span>
                {isActive && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-l-full animate-pulse shadow-[0_0_8px_rgba(0,229,255,1)]" />}
              </>
            )}
          </NavLink>
          <NavLink to="/maneuvers" className={({isActive}) => isActive ? activeClass : inactiveClass}>
            {({ isActive }) => (
              <>
                <Layers className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-muted group-hover:text-foreground'} ${!isSidebarOpen && 'mx-auto'}`} />
                <span className={`font-medium text-xs tracking-wide flex items-center gap-1.5 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  Maneuver Compare
                  {isGuest && <Lock className="w-3 h-3 text-warning animate-pulse" />}
                </span>
                {isActive && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-l-full animate-pulse shadow-[0_0_8px_rgba(0,229,255,1)]" />}
              </>
            )}
          </NavLink>
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="px-3 space-y-1.5">
        <button
          onClick={() => setIsChatbotOpen(true)}
          className={inactiveClass + " w-full justify-start"}
        >
          <Bot className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 text-muted group-hover:text-foreground ${!isSidebarOpen && 'mx-auto'}`} />
          <span className={`font-medium text-xs tracking-wide transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
            Help Bot
          </span>
        </button>
        <button
          onClick={() => setIsFaqOpen(true)}
          className={inactiveClass + " w-full justify-start"}
        >
          <HelpCircle className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 text-muted group-hover:text-foreground ${!isSidebarOpen && 'mx-auto'}`} />
          <span className={`font-medium text-xs tracking-wide transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
            User Guide
          </span>
        </button>
      </div>

      <FaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
      <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </aside>
  );
};
