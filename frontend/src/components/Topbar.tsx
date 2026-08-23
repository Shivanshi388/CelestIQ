import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Sun, Moon, LogOut, User as UserIcon, X, Shield, Activity, Eye, EyeOff, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuthStore } from '../store/auth.store';

export const Topbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, updatePassword } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  };

  return (
    <header className="h-20 w-full flex items-center justify-between px-8 topbar-bg backdrop-blur-md border-b border-border z-30 sticky top-0 transition-all duration-300">
      <div>
        <p className="text-muted text-sm font-medium">Welcome back,</p>
        <h1 className="text-primary text-xl font-bold tracking-wide">{user?.name || 'Guest User'}</h1>
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

        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-muted hover:text-foreground hover:scale-110 transition-all duration-300 rounded-lg hover:bg-surface-light"
          >
            <Bell className="w-5 h-5" />
            {/* Notification Dot without number */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger shadow-[0_0_6px_rgba(220,38,38,0.8)] rounded-full border-2 border-background box-content"></span>
          </button>

          {showNotifications && (
            <>
              <div className="absolute right-0 mt-3 w-80 bg-surface/95 backdrop-blur-md rounded-xl shadow-2xl border border-border p-4 z-50 animate-[fadeInScale_0.2s_cubic-bezier(0.16,1,0.3,1)_forwards] transform-gpu">
                <h3 className="text-sm font-bold text-foreground mb-3 border-b border-border pb-2 flex justify-between items-center">
                  <span>System Alerts</span>
                  {/* Translucent box for NEW badge */}
                  <span className="text-[10px] bg-danger/20 text-danger px-2 py-1 rounded font-bold tracking-wider">2 NEW</span>
                </h3>
                <div className="space-y-3">
                  <div className="text-xs border-b border-border pb-3 hover:bg-surface-light/40 p-1.5 rounded transition-all duration-200 cursor-pointer">
                    <p className="text-foreground font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-danger shadow-[0_0_6px_rgba(220,38,38,0.8)]"></span>
                      Anomaly detected on SAT-07
                    </p>
                    <p className="text-muted mt-1 text-[10px] pl-4">Orbit deflection exceeds threshold limit</p>
                    <p className="text-muted mt-1 pl-4 font-mono text-[9px]">2 mins ago</p>
                  </div>
                  <div className="text-xs hover:bg-surface-light/40 p-1.5 rounded transition-all duration-200 cursor-pointer">
                    <p className="text-foreground font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-warning shadow-[0_0_6px_rgba(245,158,11,0.8)]"></span>
                      Maneuver C requires review
                    </p>
                    <p className="text-muted mt-1 text-[10px] pl-4">Fuel reserves approaching optimal margins</p>
                    <p className="text-muted mt-1 pl-4 font-mono text-[9px]">1 hour ago</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="h-8 w-px bg-border"></div>
        
        <div className="relative" ref={profileMenuRef}>
          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-xl hover:bg-surface-light transition-all duration-300 select-none"
          >
            <div className="w-10 h-10 rounded-full bg-surface-light border border-primary/30 flex items-center justify-center text-primary font-bold group-hover:scale-105 transition-all shadow-glow-primary">
              {getInitials(user?.name)}
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold leading-none mb-1">{user?.name || 'Guest User'}</p>
              <p className="text-muted text-xs uppercase tracking-wide font-mono font-semibold">{user?.role || 'Guest'}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted group-hover:text-foreground transition-all duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
          </div>

          {showProfileMenu && (
            <>
              <div className="absolute right-0 mt-3 w-56 bg-surface/95 backdrop-blur-md rounded-xl shadow-2xl border border-border p-2.5 z-50 animate-[fadeInScale_0.15s_cubic-bezier(0.16,1,0.3,1)_forwards] transform-gpu">
                <div className="px-3 py-2 border-b border-border/80 mb-2">
                  <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Account Details</p>
                  <p className="text-xs text-foreground font-mono truncate mt-1">{user?.username || 'guest_account'}</p>
                </div>
                {user?.role === 'Guest' ? (
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-primary hover:bg-primary/10 text-xs font-semibold tracking-wide transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" /> Login
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowProfileModal(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 mb-1 rounded-lg text-foreground hover:bg-surface-light text-xs font-semibold tracking-wide transition-all duration-200"
                    >
                      <UserIcon className="w-4 h-4 text-primary" /> View Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-danger hover:bg-danger/10 text-xs font-semibold tracking-wide transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" /> End Operator Session
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Profile Info Modal */}
      {showProfileModal && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => {
              setShowProfileModal(false);
              navigate('/');
            }}
          />
          <div className="relative w-full max-w-md bg-background border border-border rounded-2xl shadow-[0_0_50px_rgba(74,91,220,0.2)] overflow-hidden animate-[fadeInScale_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards] transform-gpu flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-border bg-surface/50 backdrop-blur-md">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Operator Profile
              </h2>
              <button 
                onClick={() => setShowProfileModal(false)}
                className="text-muted hover:text-foreground p-1 rounded-lg transition-colors hover:bg-surface-light"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-surface border border-primary/40 flex items-center justify-center text-primary text-3xl font-bold shadow-[0_0_20px_rgba(74,91,220,0.3)]">
                  {getInitials(user?.name)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{user?.name || 'Guest User'}</h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded text-xs font-mono font-bold tracking-wider uppercase">
                      {user?.role || 'Guest'}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-success font-mono uppercase tracking-widest bg-success/10 px-2 py-1 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                      Active
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-surface/50 p-4 rounded-xl border border-border">
                  <p className="text-xs text-muted uppercase font-bold tracking-wider mb-1">Username (System ID)</p>
                  <p className="text-sm text-foreground font-mono bg-background p-2 rounded border border-border inline-block">
                    {user?.username || 'N/A'}
                  </p>
                </div>
                
                <div className="bg-surface/50 p-4 rounded-xl border border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted uppercase font-bold tracking-wider mb-1">Clearance Level</p>
                    <p className="text-sm text-foreground font-medium">
                      {user?.role === 'Operator' ? 'Level 4 (Standard Command)' : 'Level 1 (View Only)'}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-primary/30" />
                </div>

                {/* Change Password Section */}
                {user?.role !== 'Guest' && (
                  <div className="bg-surface/50 p-4 rounded-xl border border-border">
                    <button 
                      onClick={() => {
                        setIsChangingPassword(!isChangingPassword);
                        setPasswordStatus(null);
                        setOldPassword('');
                        setNewPassword('');
                        setShowOldPassword(false);
                        setShowNewPassword(false);
                      }}
                      className="text-xs text-primary uppercase font-bold tracking-wider hover:text-primary-light transition-colors"
                    >
                      {isChangingPassword ? 'Cancel Password Change' : 'Change Security Password'}
                    </button>
                    
                    {isChangingPassword && (
                      <div className="mt-4 space-y-3">
                        <div className="relative flex items-center">
                          <Lock className="absolute left-3 w-4 h-4 text-slate-500" />
                          <input 
                            type={showOldPassword ? 'text' : 'password'} 
                            placeholder="Current password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-2 bg-background border border-border rounded text-sm text-foreground focus:border-primary outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-3 text-slate-500 hover:text-foreground transition-colors"
                          >
                            {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>

                        <div className="relative flex items-center">
                          <Lock className="absolute left-3 w-4 h-4 text-slate-500" />
                          <input 
                            type={showNewPassword ? 'text' : 'password'} 
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-2 bg-background border border-border rounded text-sm text-foreground focus:border-primary outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 text-slate-500 hover:text-foreground transition-colors"
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <button 
                          onClick={() => {
                            if (!oldPassword || !newPassword) {
                              setPasswordStatus({ type: 'error', msg: 'Passwords cannot be empty' });
                              return;
                            }
                            if (!user) return;
                            const res = updatePassword(user.username, oldPassword, newPassword);
                            if (res.success) {
                              setPasswordStatus({ type: 'success', msg: 'Password updated successfully' });
                              setOldPassword('');
                              setNewPassword('');
                              setTimeout(() => setIsChangingPassword(false), 2000);
                            } else {
                              setPasswordStatus({ type: 'error', msg: res.error || 'Failed to update' });
                            }
                          }}
                          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded text-sm transition-colors mt-2"
                        >
                          Update Password
                        </button>
                        {passwordStatus && (
                          <p className={`text-xs mt-2 ${passwordStatus.type === 'success' ? 'text-success' : 'text-danger'}`}>
                            {passwordStatus.msg}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
