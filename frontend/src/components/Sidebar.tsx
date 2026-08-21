import { NavLink } from 'react-router-dom';
import { Home, Globe, AlertTriangle, Layers, Target } from 'lucide-react';

export const Sidebar = () => {
  const activeClass = "flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white border border-primary/40 shadow-[0_0_15px_rgba(74,91,220,0.4)] transition-all duration-300 relative overflow-hidden group";
  const inactiveClass = "flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:text-foreground hover:bg-surface-light border border-transparent transition-all duration-200 group";

  return (
    <aside className="w-60 h-full bg-surface/50 backdrop-blur-md border-r border-border p-5 flex flex-col justify-between shrink-0 transition-colors duration-300">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 text-foreground select-none">
          <div className="relative w-8 h-8 flex items-center justify-center">
             <Target className="w-6 h-6 text-primary absolute" />
             <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping opacity-30" />
             <div className="absolute inset-[-4px] rounded-full border border-primary/20 animate-[spin_8s_linear_infinite]" />
          </div>
          <div className="font-bold text-base tracking-wider leading-tight">
            ORBITAL<br/><span className="text-primary text-[10px] uppercase font-bold tracking-[0.2em]">Command</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          <NavLink to="/" className={({isActive}) => isActive ? activeClass : inactiveClass}>
            {({ isActive }) => (
              <>
                <Home className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-muted group-hover:text-foreground'}`} />
                <span className="font-medium text-xs tracking-wide">Dashboard</span>
                {isActive && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-l-full animate-pulse shadow-[0_0_8px_rgba(0,229,255,1)]" />}
              </>
            )}
          </NavLink>
          <NavLink to="/3d" className={({isActive}) => isActive ? activeClass : inactiveClass}>
            {({ isActive }) => (
              <>
                <Globe className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-muted group-hover:text-foreground'}`} />
                <span className="font-medium text-xs tracking-wide">3D Visualization</span>
                {isActive && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-l-full animate-pulse shadow-[0_0_8px_rgba(0,229,255,1)]" />}
              </>
            )}
          </NavLink>
          <NavLink to="/alerts" className={({isActive}) => isActive ? activeClass : inactiveClass}>
            {({ isActive }) => (
              <>
                <AlertTriangle className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-muted group-hover:text-foreground'}`} />
                <span className="font-medium text-xs tracking-wide">Alerts & Risk</span>
                {isActive && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-l-full animate-pulse shadow-[0_0_8px_rgba(0,229,255,1)]" />}
              </>
            )}
          </NavLink>
          <NavLink to="/maneuvers" className={({isActive}) => isActive ? activeClass : inactiveClass}>
            {({ isActive }) => (
              <>
                <Layers className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-muted group-hover:text-foreground'}`} />
                <span className="font-medium text-xs tracking-wide">Maneuver Compare</span>
                {isActive && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent rounded-l-full animate-pulse shadow-[0_0_8px_rgba(0,229,255,1)]" />}
              </>
            )}
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};
