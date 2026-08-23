import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';
import { Shield, Lock, User, UserPlus, Eye, EyeOff, Globe } from 'lucide-react';

export const LoginPage = () => {
  const { login, signup, loginAsGuest, initDb, changePassword } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  // UI states
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize DB from JSON
  useEffect(() => {
    initDb();
  }, [initDb]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setIsLoading(true);
    // Simulate minor network delay for premium visual loading effect
    setTimeout(() => {
      if (isForgotPassword) {
        const result = changePassword(username, password);
        if (!result.success) {
          setError(result.error || 'Password reset failed.');
          setIsLoading(false);
        } else {
          setError('Password reset successful! You can now log in.');
          setTimeout(() => {
            setIsForgotPassword(false);
            setPassword('');
            setIsLoading(false);
            setError('');
          }, 1500);
        }
      } else if (isSignUp) {
        const result = signup(username, password, fullName);
        if (!result.success) {
          setError(result.error || 'Registration failed.');
          setIsLoading(false);
        }
      } else {
        const result = login(username, password);
        if (!result.success) {
          setError(result.error || 'Authentication failed.');
          setIsLoading(false);
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-screen relative overflow-hidden bg-[#05070f] flex items-center justify-center font-sans">
      {/* Dynamic atmospheric grid lines and glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(74,91,220,0.12)_0%,_transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(10,12,20,0.5)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(10,12,20,0.5)_1px,_transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,_white,_transparent_80%)] opacity-30 pointer-events-none" />

      {/* Floating orbital lines */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-primary/10 animate-[spin_40s_linear_infinite] pointer-events-none" />
      <div className="absolute w-[800px] h-[800px] rounded-full border border-secondary/5 animate-[spin_60s_linear_infinite_reverse] pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md relative z-10 mx-4">
        {/* Glow Header */}
        <div className="text-center mb-8 select-none">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary border border-primary/30 shadow-[0_0_30px_rgba(74,91,220,0.3)] mb-4 animate-pulse">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-widest text-glow text-white">
            SENTINEL
          </h1>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mt-1">
            Orbital Defense Command
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#0c0f1d]/85 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle light bar at the top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <h2 className="text-xl font-medium text-white mb-6 text-center tracking-wide">
            {isForgotPassword ? 'Reset Security Credentials' : isSignUp ? 'Initialize Sentinel Operator Account' : 'Authenticate Security Clearance'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono block">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/65 border border-slate-800 rounded-lg text-white text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 outline-none"
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono block">
                Username
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin or operator"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/65 border border-slate-800 rounded-lg text-white text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono block">
                {isForgotPassword ? 'New Password' : 'Password'}
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/65 border border-slate-800 rounded-lg text-white text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className={`p-3 border rounded-lg text-xs text-center animate-[shake_0.4s_ease-in-out] ${error.includes('successful') ? 'bg-success/10 border-success/30 text-success' : 'bg-danger/10 border-danger/30 text-danger'}`}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white text-sm font-semibold rounded-lg shadow-[0_4px_15px_rgba(74,91,220,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : isForgotPassword ? (
                <>
                  <Lock className="w-4 h-4" /> Reset Password
                </>
              ) : isSignUp ? (
                <>
                  <UserPlus className="w-4 h-4" /> Create Operator Session
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Initialize Credentials
                </>
              )}
            </button>
          </form>

          {/* Toggle form link */}
          <div className="mt-6 text-center text-xs text-slate-400 space-y-2">
            {!isForgotPassword && !isSignUp && (
              <p>
                Forgot your password?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(true);
                    setError('');
                  }}
                  className="text-primary hover:text-primary-light font-semibold hover:underline"
                >
                  Reset Credentials
                </button>
              </p>
            )}
            
            {isForgotPassword ? (
              <p>
                Remembered your password?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setError('');
                  }}
                  className="text-primary hover:text-primary-light font-semibold hover:underline"
                >
                  Authenticate Instead
                </button>
              </p>
            ) : isSignUp ? (
              <p>
                Already have a security clearance?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setError('');
                  }}
                  className="text-primary hover:text-primary-light font-semibold hover:underline"
                >
                  Authenticate Instead
                </button>
              </p>
            ) : (
              <p>
                Need to register?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setError('');
                  }}
                  className="text-primary hover:text-primary-light font-semibold hover:underline"
                >
                  Create Security Account
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Guest access option */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              loginAsGuest();
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-all bg-slate-900/40 border border-slate-800/60 px-4 py-2 rounded-full hover:bg-slate-900/80"
          >
            <Globe className="w-3.5 h-3.5" /> Continue as Guest (3D Visualization Locked)
          </button>
        </div>
      </div>
    </div>
  );
};
