import { Bell, Menu, Search, ChevronDown, User } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function Header() {
  const { user } = useAuthStore();
  const { toggleSidebar } = useUIStore();

  return (
    <header className="h-20 border-b border-border bg-background/50 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-muted hover:text-white transition-colors focus:outline-none"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div>
          <div className="text-sm text-muted">Welcome back,</div>
          <div className="text-lg font-semibold text-primary">{user?.name}</div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="hidden md:flex relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search satellites, alerts..."
            className="bg-surface border border-border rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-white placeholder:text-muted"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-muted hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger animate-pulse-slow" />
        </button>

        {/* Profile */}
        <button className="flex items-center space-x-3 group">
          <div className="h-10 w-10 rounded-full bg-surface-light border border-border flex items-center justify-center text-primary font-bold group-hover:border-primary/50 transition-colors">
            MC
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium text-white">{user?.name}</div>
            <div className="text-xs text-muted">{user?.role}</div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted hidden md:block group-hover:text-white transition-colors" />
        </button>
      </div>
    </header>
  );
}
