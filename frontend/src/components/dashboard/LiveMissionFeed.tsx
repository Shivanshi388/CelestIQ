
export const LiveMissionFeed = () => {
  const feedItems = [
    { time: '10:24:35', event: 'Orbit Adjustment Completed', target: 'Satellite ORB-12', status: 'Success', color: 'text-success', bg: 'bg-success/10 border-success/30' },
    { time: '10:23:11', event: 'Trajectory Update', target: 'Satellite SAT-07', status: 'Info', color: 'text-primary', bg: 'bg-primary/10 border-primary/30' },
    { time: '10:22:47', event: 'Risk Alert: Solar Flare', target: 'All Satellites', status: 'Warning', color: 'text-danger', bg: 'bg-danger/10 border-danger/30' },
  ];

  return (
    <div className="glass-panel p-5 mt-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Live Mission Feed</h2>
          <p className="text-xs text-muted">Real-time telemetry and system updates</p>
        </div>
        <button className="text-xs border border-border bg-surface-light px-3 py-1.5 rounded hover:bg-surface transition-colors text-foreground">
          View All
        </button>
      </div>

      <div className="space-y-2 relative">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-border z-0"></div>
        {feedItems.map((item, i) => (
          <div 
            key={i} 
            style={{ animationDelay: `${i * 80}ms` }}
            className="relative z-10 flex items-center justify-between bg-surface-light/30 rounded-lg p-3 border border-border hover:border-primary/40 hover:bg-surface-light/60 hover:shadow-[0_0_12px_rgba(74,91,220,0.05)] transition-all duration-300 page-enter"
          >
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')} animate-pulse shadow-[0_0_8px_currentColor] ml-[3px]`}></div>
              <div className="text-xs text-muted font-mono">{item.time}</div>
              <div className="text-sm font-medium text-foreground">{item.event}</div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-xs text-muted font-medium">{item.target}</div>
              <div className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border ${item.color} ${item.bg}`}>
                • {item.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
