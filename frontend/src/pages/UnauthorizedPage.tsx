import { ShieldAlert, LogIn, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/auth.store';
import { Link } from 'react-router-dom';

interface UnauthorizedPageProps {
  title?: string;
  message?: string;
}

export const UnauthorizedPage = ({
  title = "3D Visualization Locked",
  message = "Guest users are restricted from launching dynamic telemetry views and interactive 3D orbit simulation graphics. Please authenticate using authorized credentials to view live telemetry coordinates."
}: UnauthorizedPageProps) => {
  const { logout } = useAuthStore();

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col items-center justify-center p-8 select-none">
      {/* Glow Alert Icon Container */}
      <div className="w-20 h-20 rounded-2xl bg-danger/10 border border-danger/30 flex items-center justify-center text-danger mb-6 animate-bounce shadow-[0_0_40px_rgba(239,68,68,0.15)]">
        <ShieldAlert className="w-10 h-10" />
      </div>

      {/* Main Locked HUD */}
      <div className="glass-panel max-w-md p-8 text-center border-danger/20 relative overflow-hidden bg-gradient-to-b from-surface-light to-surface/40">
        {/* Decorative corner indicator */}
        <div className="absolute top-0 right-0 bg-danger/10 text-danger border-b border-l border-danger/20 text-[9px] px-3 py-1 font-mono uppercase tracking-widest font-bold">
          Access Denied
        </div>

        <h2 className="text-2xl font-light text-foreground tracking-wide mb-2">
          {title}
        </h2>
        <p className="text-xs text-muted font-mono tracking-widest uppercase mb-4">
          Requires Administrator / Operator Clearence
        </p>
        
        <p className="text-sm text-muted mb-6 leading-relaxed">
          {message}
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 border border-border bg-surface-light px-4 py-2.5 rounded-lg hover:bg-surface text-foreground transition-all duration-300 font-medium text-xs shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Go to Dashboard
          </Link>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 bg-gradient-to-r from-danger to-red-600 text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-all duration-300 font-semibold text-xs shadow-[0_4px_15px_rgba(239,68,68,0.2)]"
          >
            <LogIn className="w-4 h-4" /> Authenticate Account
          </button>
        </div>
      </div>
    </div>
  );
};
