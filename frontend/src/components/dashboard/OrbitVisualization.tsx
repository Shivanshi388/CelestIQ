import { Maximize2, Focus, Layers, Search } from 'lucide-react';

export const OrbitVisualization = () => {
  return (
    <div className="glass-panel p-5 h-full flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start relative z-20">
        <div>
          <h2 className="text-lg font-semibold text-foreground">3D Orbit Visualization</h2>
          <p className="text-xs text-muted">Interactive 3D view of orbital objects</p>
        </div>
      </div>

      {/* Control Tools (Right side) */}
      <div className="absolute right-4 top-4 flex flex-col gap-2 z-20">
        <button className="w-8 h-8 rounded-md bg-surface-light border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors hover:shadow-glow-primary">
          <Focus className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-md bg-surface-light border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors hover:shadow-glow-primary">
          <Layers className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-md bg-surface-light border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors hover:shadow-glow-primary">
          <Search className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-md bg-surface-light border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors hover:shadow-glow-primary">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Visualization Area */}
      <div className="flex-1 relative flex items-center justify-center mt-4 min-h-[300px]">
        
        {/* The Earth */}
        <div className="relative w-48 h-48 rounded-full shadow-[0_0_80px_rgba(74,91,220,0.4),inset_-20px_-20px_40px_rgba(0,0,0,0.8)] bg-[#0a1536] z-10 flex items-center justify-center overflow-hidden border border-primary/30">
          {/* Earth Texture */}
          <div className="absolute w-[150%] h-[150%] bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_cloud_2048.jpg/1024px-Land_ocean_ice_cloud_2048.jpg')] bg-cover opacity-90 animate-[spin_120s_linear_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 pointer-events-none" />
        </div>

        {/* Dynamic SVG Gradient Orbit Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minHeight: '100%' }}>
          <defs>
            <linearGradient id="orbit-leo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(var(--primary-rgb))" stopOpacity="0.8" />
              <stop offset="50%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(var(--primary-rgb))" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="orbit-meo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="orbit-geo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="50%" stopColor="rgb(var(--primary-rgb))" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {/* LEO Orbit */}
          <ellipse cx="50%" cy="50%" rx="140" ry="50" transform="rotate(-12)" style={{ transformOrigin: 'center' }} fill="none" stroke="url(#orbit-leo)" strokeWidth="1" />
          <ellipse cx="50%" cy="50%" rx="140" ry="50" transform="rotate(-12)" style={{ transformOrigin: 'center' }} fill="none" stroke="rgb(var(--primary-rgb))" strokeWidth="1.5" strokeDasharray="6 30" className="animate-[dash_20s_linear_infinite]" />
          
          {/* MEO Orbit */}
          <ellipse cx="50%" cy="50%" rx="225" ry="80" transform="rotate(6)" style={{ transformOrigin: 'center' }} fill="none" stroke="url(#orbit-meo)" strokeWidth="1" />
          <ellipse cx="50%" cy="50%" rx="225" ry="80" transform="rotate(6)" style={{ transformOrigin: 'center' }} fill="none" stroke="rgb(var(--accent-rgb))" strokeWidth="1.5" strokeDasharray="10 40" className="animate-[dash_30s_linear_infinite]" />
          
          {/* GEO Orbit */}
          <ellipse cx="50%" cy="50%" rx="300" ry="110" transform="rotate(-6)" style={{ transformOrigin: 'center' }} fill="none" stroke="url(#orbit-geo)" strokeWidth="1" />
          <ellipse cx="50%" cy="50%" rx="300" ry="110" transform="rotate(-6)" style={{ transformOrigin: 'center' }} fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="15 60" className="animate-[dash_40s_linear_infinite]" />
        </svg>

        {/* Satellite SAT-07 */}
        <div className="absolute top-[35%] left-[20%] flex flex-col items-center gap-1 z-20 hover:scale-110 transition-transform duration-300 cursor-pointer">
          <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_15px_rgba(74,91,220,1)] animate-pulse" />
          <div className="bg-surface/90 backdrop-blur-sm border border-primary/50 text-[10px] px-2 py-0.5 rounded text-foreground text-center font-medium shadow-lg">
            SAT-07<br/><span className="text-primary font-bold">LEO</span>
          </div>
        </div>

        {/* Satellite SAT-15 */}
        <div className="absolute top-[65%] left-[45%] flex flex-col items-center gap-1 z-20 hover:scale-110 transition-transform duration-300 cursor-pointer">
          <div className="w-2.5 h-2.5 rounded-full bg-warning shadow-[0_0_15px_rgba(245,158,11,1)] animate-pulse" />
          <div className="bg-surface/90 backdrop-blur-sm border border-warning/50 text-[10px] px-2 py-0.5 rounded text-foreground text-center font-medium shadow-lg">
            SAT-15<br/><span className="text-warning font-bold">LEO</span>
          </div>
        </div>

        {/* Satellite ORB-12 */}
        <div className="absolute top-[20%] right-[30%] flex flex-col items-center gap-1 z-20 hover:scale-110 transition-transform duration-300 cursor-pointer">
          <div className="w-2.5 h-2.5 rounded-full bg-success shadow-[0_0_15px_rgba(16,185,129,1)] animate-pulse" />
          <div className="bg-surface/90 backdrop-blur-sm border border-success/50 text-[10px] px-2 py-0.5 rounded text-foreground text-center font-medium shadow-lg">
            ORB-12<br/><span className="text-success font-bold">MEO</span>
          </div>
        </div>

        {/* Satellite GEO-03 */}
        <div className="absolute top-[25%] right-[15%] flex flex-col items-center gap-1 z-20 hover:scale-110 transition-transform duration-300 cursor-pointer">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(192,132,252,1)] animate-pulse" />
          <div className="bg-surface/90 backdrop-blur-sm border border-purple-500/50 text-[10px] px-2 py-0.5 rounded text-foreground text-center font-medium shadow-lg">
            GEO-03<br/><span className="text-purple-400 font-bold">GEO</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-center mt-4 relative z-20">
        <div className="flex items-center gap-2 text-xs text-muted border border-border bg-surface px-3 py-1.5 rounded transition-all duration-300 hover:border-success/30">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_6px_rgb(16,185,129)]"></span>
          Real-time Tracking
        </div>
        <div className="text-xs text-muted border border-border bg-surface px-3 py-1.5 rounded font-mono transition-all duration-300 hover:border-primary/30">
          10:24:35 UTC
        </div>
        <button className="text-xs border border-border bg-surface px-4 py-1.5 rounded hover:bg-surface-light transition-all duration-300 hover:shadow-glow-primary hover:border-primary/50 text-foreground">
          Pause
        </button>
      </div>
    </div>
  );
};
