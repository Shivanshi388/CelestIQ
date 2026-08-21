import { Activity, Target, ShieldAlert, Fuel } from 'lucide-react';

export const WebDashboardStats = () => {
  return (
    <div className="glass-panel p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">Web Dashboard</h2>
        <p className="text-xs text-muted">Real-time overview of orbital operations</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Satellites */}
        <div className="bg-gradient-to-b from-surface-light to-surface/40 rounded-xl p-4 border border-border flex flex-col justify-between hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(74,91,220,0.15)] transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="text-[10px] text-muted font-bold tracking-wider uppercase mb-2 flex justify-between items-center z-10">
            Satellites <Activity className="w-3 h-3 text-muted group-hover:text-primary transition-colors" />
          </div>
          <div className="text-3xl font-light text-foreground mb-2 z-10">24</div>
          <div className="flex items-center gap-1.5 text-xs text-primary z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Active
          </div>
          {/* Sparkline Telemetry */}
          <svg className="w-16 h-8 opacity-30 absolute bottom-3 right-4 text-primary group-hover:opacity-60 transition-opacity" viewBox="0 0 50 20">
            <path d="M0 18 L 10 10 L 20 15 L 30 5 L 40 12 L 50 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Missions */}
        <div className="bg-gradient-to-b from-surface-light to-surface/40 rounded-xl p-4 border border-border flex flex-col justify-between hover:-translate-y-1 hover:border-secondary/50 hover:shadow-[0_0_15px_rgba(107,124,255,0.15)] transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="text-[10px] text-muted font-bold tracking-wider uppercase mb-2 flex justify-between items-center z-10">
            Missions <Target className="w-3 h-3 text-muted group-hover:text-secondary transition-colors" />
          </div>
          <div className="text-3xl font-light text-foreground mb-2 z-10">12</div>
          <div className="flex items-center gap-1.5 text-xs text-secondary z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            In Progress
          </div>
          {/* Sparkline Telemetry */}
          <svg className="w-16 h-8 opacity-30 absolute bottom-3 right-4 text-secondary group-hover:opacity-60 transition-opacity" viewBox="0 0 50 20">
            <path d="M0 15 Q 10 5, 20 12 T 40 8 T 50 12" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Alerts */}
        <div className="bg-gradient-to-b from-surface-light to-surface/40 rounded-xl p-4 border border-border flex flex-col justify-between hover:-translate-y-1 hover:border-danger/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="text-[10px] text-muted font-bold tracking-wider uppercase mb-2 flex justify-between items-center z-10">
            Alerts <ShieldAlert className="w-3 h-3 text-muted group-hover:text-danger transition-colors" />
          </div>
          <div className="text-3xl font-light text-danger mb-2 z-10">3</div>
          <div className="flex items-center gap-1.5 text-xs text-danger z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse"></span>
            Critical
          </div>
          {/* Sparkline Telemetry */}
          <svg className="w-16 h-8 opacity-30 absolute bottom-3 right-4 text-danger group-hover:opacity-60 transition-opacity" viewBox="0 0 50 20">
            <path d="M0 15 L 8 5 L 16 18 L 24 10 L 32 15 L 40 4 L 50 16" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Fuel Reserve */}
        <div className="bg-gradient-to-b from-surface-light to-surface/40 rounded-xl p-4 border border-border flex flex-col justify-between hover:-translate-y-1 hover:border-success/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-300 cursor-pointer group relative overflow-hidden">
          <div className="text-[10px] text-muted font-bold tracking-wider uppercase mb-2 flex justify-between items-center z-10">
            Fuel Reserve <Fuel className="w-3 h-3 text-muted group-hover:text-success transition-colors" />
          </div>
          <div className="text-3xl font-light text-foreground mb-2 z-10">78%</div>
          <div className="flex items-center gap-1.5 text-xs text-success z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
            Optimal
          </div>
          {/* Sparkline Telemetry */}
          <svg className="w-16 h-8 opacity-30 absolute bottom-3 right-4 text-success group-hover:opacity-60 transition-opacity" viewBox="0 0 50 20">
            <path d="M0 18 Q 15 8, 30 14 T 50 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};
