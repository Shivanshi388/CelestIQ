import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Globe2, 
  AlertTriangle, 
  Crosshair
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui.store';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/visualization', icon: Globe2, label: '3D Visualization' },
  { path: '/alerts', icon: AlertTriangle, label: 'Alerts & Risk' },
  { path: '/maneuvers', icon: Crosshair, label: 'Maneuver Compare' },
];

export function Sidebar() {
  const { isSidebarOpen } = useUIStore();

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0, width: isSidebarOpen ? 260 : 80 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className="h-screen bg-surface border-r border-border flex flex-col hidden md:flex shrink-0 z-20"
    >
      <div className="h-20 flex items-center px-6 shrink-0 border-b border-border/50">
        <div className="flex items-center space-x-3 text-white">
          <Crosshair className="h-8 w-8 text-primary shrink-0" />
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-bold tracking-widest text-sm"
            >
              ORBITAL<br/><span className="text-muted text-xs">COMMAND</span>
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center px-4 py-3 rounded-lg transition-all duration-200 group relative",
              isActive 
                ? "bg-primary/10 text-primary border border-primary/30" 
                : "text-muted hover:text-white hover:bg-surface-light"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-primary" : "group-hover:text-white")} />
                {isSidebarOpen && (
                  <span className="ml-4 text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
                {isActive && isSidebarOpen && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-r-md shadow-glow-primary"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-4 mt-auto">
        <div className={cn("glass-panel p-4 flex items-center justify-between", !isSidebarOpen && "justify-center px-0")}>
          {isSidebarOpen ? (
            <div>
              <div className="text-xs text-muted mb-1 font-mono uppercase tracking-wider">System Status</div>
              <div className="text-sm text-success flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse-slow shrink-0" />
                <span className="whitespace-nowrap">All Systems Nominal</span>
              </div>
            </div>
          ) : (
            <span className="h-3 w-3 rounded-full bg-success animate-pulse-slow" title="All Systems Nominal" />
          )}
        </div>
      </div>
    </motion.aside>
  );
}
