import { Flame, ShieldAlert, Wifi, BatteryWarning } from 'lucide-react';

export const AlertRiskDashboard = () => {
  const alerts = [
    { icon: <Flame className="w-4 h-4 text-danger" />, name: 'Solar Flare Impact', target: 'All Satellites', severity: 'Critical', time: '10:24:35', status: 'Active', statusColor: 'bg-danger/10 text-danger border-danger/30' },
    { icon: <BatteryWarning className="w-4 h-4 text-warning" />, name: 'Fuel Level Low', target: 'SAT-07', severity: 'High', time: '10:23:11', status: 'Active', statusColor: 'bg-danger/10 text-danger border-danger/30' },
    { icon: <Wifi className="w-4 h-4 text-warning" />, name: 'Communication Delay', target: 'ORB-12', severity: 'Medium', time: '10:22:47', status: 'Monitoring', statusColor: 'bg-warning/10 text-warning border-warning/30' },
    { icon: <ShieldAlert className="w-4 h-4 text-success" />, name: 'Orbital Debris Detected', target: 'GEO-03', severity: 'Low', time: '10:21:33', status: 'Monitoring', statusColor: 'bg-success/10 text-success border-success/30' },
    { icon: <BatteryWarning className="w-4 h-4 text-warning" />, name: 'Battery Temperature High', target: 'SAT-15', severity: 'High', time: '10:20:15', status: 'Active', statusColor: 'bg-danger/10 text-danger border-danger/30' },
  ];

  const getAlertStyle = (severity: string, status: string) => {
    const isPulse = severity === 'Critical' && status === 'Active' ? 'animate-[pulse_3s_infinite]' : '';
    switch (severity) {
      case 'Critical':
        return `${isPulse} bg-gradient-to-r from-danger/10 via-danger/5 to-transparent border-danger/20 hover:border-danger/40 hover:shadow-[0_0_12px_rgba(239,68,68,0.1)]`;
      case 'High':
        return `bg-gradient-to-r from-warning/10 via-warning/5 to-transparent border-warning/20 hover:border-warning/40 hover:shadow-[0_0_12px_rgba(245,158,11,0.08)]`;
      case 'Medium':
        return `bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20 hover:border-primary/40 hover:shadow-[0_0_12px_rgba(74,91,220,0.08)]`;
      default:
        return `bg-gradient-to-r from-success/10 via-success/5 to-transparent border-success/20 hover:border-success/40 hover:shadow-[0_0_12px_rgba(16,185,129,0.08)]`;
    }
  };

  return (
    <div className="glass-panel p-5 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">Alert & Risk Dashboard</h2>
        <p className="text-xs text-muted">Monitor risks and system alerts</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="bg-gradient-to-b from-surface-light to-surface/40 rounded-xl p-3 border border-border flex flex-col items-center justify-center text-center hover:border-danger/30 transition-all duration-300">
          <div className="text-[10px] text-muted font-bold tracking-wider uppercase mb-1">Critical</div>
          <div className="text-2xl font-light text-danger mb-0.5">3</div>
          <div className="text-[9px] text-danger/80">Immediate Action</div>
        </div>
        <div className="bg-gradient-to-b from-surface-light to-surface/40 rounded-xl p-3 border border-border flex flex-col items-center justify-center text-center hover:border-warning/30 transition-all duration-300">
          <div className="text-[10px] text-muted font-bold tracking-wider uppercase mb-1">High</div>
          <div className="text-2xl font-light text-warning mb-0.5">7</div>
          <div className="text-[9px] text-warning/80">↑ High Priority</div>
        </div>
        <div className="bg-gradient-to-b from-surface-light to-surface/40 rounded-xl p-3 border border-border flex flex-col items-center justify-center text-center hover:border-primary/30 transition-all duration-300">
          <div className="text-[10px] text-muted font-bold tracking-wider uppercase mb-1">Medium</div>
          <div className="text-2xl font-light text-foreground mb-0.5">12</div>
          <div className="text-[9px] text-muted">Monitor</div>
        </div>
        <div className="bg-gradient-to-b from-surface-light to-surface/40 rounded-xl p-3 border border-border flex flex-col items-center justify-center text-center hover:border-success/30 transition-all duration-300">
          <div className="text-[10px] text-muted font-bold tracking-wider uppercase mb-1">Low</div>
          <div className="text-2xl font-light text-success mb-0.5">5</div>
          <div className="text-[9px] text-success/80">↓ Low Priority</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="text-sm font-semibold text-foreground mb-2">Active Alerts</h3>
        <div className="flex-1 overflow-y-auto pr-1 space-y-2">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 px-2 text-[10px] text-muted font-bold uppercase tracking-wider mb-2 border-b border-border pb-2">
            <div>Alert</div>
            <div>Satellite</div>
            <div>Severity</div>
            <div>Time</div>
            <div>Status</div>
          </div>
          
          {alerts.map((alert, i) => (
            <div 
              key={i} 
              style={{ animationDelay: `${i * 60}ms` }}
              className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 items-center px-3 py-2 rounded-lg border transition-all duration-300 cursor-pointer group page-enter ${getAlertStyle(alert.severity, alert.status)}`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-surface border border-border flex items-center justify-center group-hover:border-foreground/20 transition-colors">
                  {alert.icon}
                </div>
                <span className="text-xs text-foreground font-medium truncate">{alert.name}</span>
              </div>
              <div className="text-xs text-muted font-medium">{alert.target}</div>
              <div className="text-xs flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${alert.severity === 'Critical' ? 'bg-danger' : alert.severity === 'High' ? 'bg-warning' : alert.severity === 'Medium' ? 'bg-primary' : 'bg-success'}`}></span>
                <span className={`font-semibold ${alert.severity === 'Critical' ? 'text-danger' : alert.severity === 'High' ? 'text-warning' : alert.severity === 'Medium' ? 'text-primary' : 'text-success'}`}>{alert.severity}</span>
              </div>
              <div className="text-xs text-muted font-mono">{alert.time}</div>
              <div>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${alert.statusColor}`}>
                  {alert.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full mt-3 text-xs text-muted hover:text-foreground py-2 border-t border-border transition-colors">
        View All Alerts
      </button>
    </div>
  );
};
