import React, { useState } from 'react';
import { ScreenType } from '../types';

interface AccountScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ onNavigate }) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('architect@corp.redsalt.io');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [trustDevice, setTrustDevice] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Dynamic entropy evaluation
  const calculateEntropy = (val: string) => {
    if (!val) return { score: 0, text: 'Awaiting Input', color: 'text-[#ac8889]' };
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    switch (score) {
      case 1:
        return { score: 1, text: 'Weak Key', color: 'text-[#ffb4ab]' };
      case 2:
        return { score: 2, text: 'Moderate', color: 'text-[#ffb2b9]' };
      case 3:
        return { score: 3, text: 'Strong Vault', color: 'text-[#ffb3b6]' };
      case 4:
      default:
        return { score: 4, text: 'Post-Quantum Ready', color: 'text-[#ffb3b6] font-bold' };
    }
  };

  const entropy = calculateEntropy(password);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);

      setTimeout(() => {
        setIsSignedIn(true);
        setAuthSuccess(false);
      }, 1200);
    }, 1200);
  };

  const handleSocialAuth = (provider: string) => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
      setTimeout(() => {
        setIsSignedIn(true);
        setAuthSuccess(false);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full relative min-h-full">
      {/* Atmospheric background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 flex items-center justify-center">
        <div className="w-[360px] h-[360px] rounded-full bg-[#e11d48]/15 blur-[120px] transform -translate-y-24" />
        <div className="w-[220px] h-[220px] rounded-full bg-[#db2b4e]/10 blur-[80px] transform translate-y-36" />
      </div>

      <div className="flex flex-col w-full px-4 sm:px-6 pb-24 pt-2 max-w-md mx-auto">
        {/* Hero & Brand Emblem Header */}
        <div className="flex flex-col items-center text-center mt-3 mb-6 relative">
          <div className="relative flex items-center justify-center mb-4 group">
            {/* Glow ambient layer */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#e11d48] to-[#ffb2b9] rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition duration-700" />
            {/* Hexagonal Logo matching brand icon */}
            <div className="relative w-20 h-20 bg-[#262a34] border border-white/10 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
              <svg
                className="w-14 h-14 drop-shadow-[0_4px_12px_rgba(225,29,72,0.4)]"
                fill="none"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon fill="#e11d48" opacity="0.95" points="50,6 88,28 88,72 50,94 12,72 12,28" />
                <polygon fill="#ffb3b6" opacity="0.25" points="50,6 88,28 50,50 12,28" />
                <polygon fill="#be0037" opacity="0.45" points="50,50 88,28 88,72" />
                <polygon fill="#891933" opacity="0.6" points="50,50 88,72 50,94" />
                <polygon fill="#db2b4e" opacity="0.35" points="50,50 50,94 12,72" />
                <polygon fill="#ffdadc" opacity="0.15" points="50,50 12,72 12,28" />
                <circle cx="50" cy="50" fill="#fffaf9" r="14" />
                <circle cx="50" cy="50" fill="#e11d48" r="7" />
              </svg>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e11d48]/15 border border-[#e11d48]/30 text-[#ffb3b6] mb-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb3b6] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
              Enterprise Mesh v2.4
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-[#dfe2ef] tracking-tight">
            Red Salt
          </h1>
          <p className="text-xs text-[#ac8889] mt-1 max-w-[280px]">
            {isSignedIn
              ? 'Authorized session active on Cluster US-East.'
              : 'Sign in to access your secure Red Salt workspace and nodes.'}
          </p>
        </div>

        {/* If user is already authenticated */}
        {isSignedIn ? (
          <div className="w-full bg-[#181b25]/90 backdrop-blur-xl rounded-xl border border-white/[0.08] shadow-2xl p-6 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e11d48]/20 border border-[#e11d48]/40 flex items-center justify-center text-[#ffb3b6]">
              <span className="material-symbols-outlined text-[32px]">verified</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#dfe2ef]">
                {fullName || 'Alex Vance (Lead Architect)'}
              </h3>
              <p className="text-xs text-[#e5bdbe]/80 font-mono mt-0.5">{email}</p>
            </div>

            <div className="w-full bg-[#1c1f29] rounded-lg p-3 text-left border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#e5bdbe]/70">Node Anchor</span>
                <span className="text-[#dfe2ef] font-mono font-semibold">#RS-9921-US-EAST</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#e5bdbe]/70">Access Token</span>
                <span className="text-[#ffb3b6] font-mono">256-Bit HSM Key</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#e5bdbe]/70">Zero-Trust Posture</span>
                <span className="text-emerald-400 font-mono text-[11px] font-bold">100% COMPLIANT</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 pt-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full h-11 rounded-lg bg-[#e11d48] hover:bg-[#be0037] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#e11d48]/30 transition-all"
              >
                <span>Return to Dashboard</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <button
                onClick={() => setIsSignedIn(false)}
                className="w-full h-10 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#e5bdbe] font-medium text-xs flex items-center justify-center gap-2 cursor-pointer border border-white/5 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>Disconnect Keypair</span>
              </button>
            </div>
          </div>
        ) : (
          /* Primary Interactive Glass Card */
          <div className="w-full bg-[#181b25]/90 backdrop-blur-xl rounded-xl border border-white/[0.08] shadow-2xl p-5 sm:p-6 flex flex-col relative overflow-hidden">
            {/* Subtle specular sheen */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffb3b6]/30 to-transparent" />

            {/* Segmented Tab Toggle */}
            <div className="grid grid-cols-2 p-1 bg-[#0a0e17] rounded-lg mb-5 border border-white/5">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`py-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition duration-200 cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-[#1c1f29] text-[#dfe2ef] shadow-sm border border-white/10'
                    : 'text-[#ac8889] hover:text-[#dfe2ef]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">lock_open</span>
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`py-2 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition duration-200 cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-[#1c1f29] text-[#dfe2ef] shadow-sm border border-white/10'
                    : 'text-[#ac8889] hover:text-[#dfe2ef]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                Create Account
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
              {/* Name Field (Hidden on Sign In) */}
              {authMode === 'signup' && (
                <div className="flex flex-col gap-1.5 animate-in fade-in duration-200">
                  <label className="text-xs text-[#dfe2ef] font-medium flex items-center justify-between">
                    <span>Full Name</span>
                    <span className="font-mono text-[#ac8889] text-[10px]">Required</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#ac8889] pointer-events-none text-[18px]">
                      badge
                    </span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ada Lovelace"
                      required={authMode === 'signup'}
                      className="w-full h-11 pl-10 pr-4 bg-[#262a34]/60 text-[#dfe2ef] placeholder-[#ac8889]/60 rounded-lg text-xs border border-white/5 focus:bg-[#262a34] focus:outline-none focus:ring-2 focus:ring-[#e11d48]/40 transition duration-150"
                    />
                  </div>
                </div>
              )}

              {/* Work Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#dfe2ef] font-medium flex items-center justify-between">
                  <span>Work Email</span>
                  <span className="font-mono text-[#ac8889] text-[10px]">Single Sign-On</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#ac8889] pointer-events-none text-[18px]">
                    alternate_email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@corp.redsalt.io"
                    required
                    className="w-full h-11 pl-10 pr-4 bg-[#262a34]/60 text-[#dfe2ef] placeholder-[#ac8889]/60 rounded-lg text-xs border border-white/5 focus:bg-[#262a34] focus:outline-none focus:ring-2 focus:ring-[#e11d48]/40 transition duration-150"
                  />
                </div>
              </div>

              {/* Master Keyphrase Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-[#dfe2ef] font-medium">Master Keyphrase</label>
                  <button
                    type="button"
                    onClick={() => alert("Keyphrase recovery credentials sent to linked hardware token.")}
                    className="text-[11px] text-[#ffb3b6] hover:text-[#ffdadc] transition duration-150 cursor-pointer font-mono"
                  >
                    Forgot Key?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#ac8889] pointer-events-none text-[18px]">
                    vpn_key
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full h-11 pl-10 pr-10 bg-[#262a34]/60 text-[#dfe2ef] placeholder-[#ac8889]/60 rounded-lg text-xs border border-white/5 focus:bg-[#262a34] focus:outline-none focus:ring-2 focus:ring-[#e11d48]/40 transition duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    className="absolute right-3 text-[#ac8889] hover:text-[#dfe2ef] transition duration-150 flex items-center justify-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>

                {/* Dynamic Security Strength Bar */}
                <div className="flex flex-col gap-1 mt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#ac8889]">Entropy Strength</span>
                    <span className={`font-mono ${entropy.color}`}>{entropy.text}</span>
                  </div>
                  <div className="w-full h-1 bg-[#31353f] rounded-full overflow-hidden flex gap-1">
                    <div
                      className={`flex-1 h-full rounded-full transition-colors duration-300 ${
                        entropy.score >= 1 ? 'bg-[#e11d48]' : 'bg-[#1c1f29]'
                      }`}
                    />
                    <div
                      className={`flex-1 h-full rounded-full transition-colors duration-300 ${
                        entropy.score >= 2 ? 'bg-[#ffb2b9]' : 'bg-[#1c1f29]'
                      }`}
                    />
                    <div
                      className={`flex-1 h-full rounded-full transition-colors duration-300 ${
                        entropy.score >= 3 ? 'bg-[#ffb3b6]' : 'bg-[#1c1f29]'
                      }`}
                    />
                    <div
                      className={`flex-1 h-full rounded-full transition-colors duration-300 ${
                        entropy.score >= 4 ? 'bg-[#db2b4e]' : 'bg-[#1c1f29]'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Remember device toggle */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={trustDevice}
                    onChange={(e) => setTrustDevice(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#e11d48] bg-[#262a34] focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs text-[#dfe2ef]">Trust this hardware profile for 30 days</span>
                </label>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isAuthenticating || authSuccess}
                className="w-full h-12 mt-1 rounded-lg bg-gradient-to-r from-[#e11d48] to-[#891933] hover:from-[#e11d48] hover:to-[#be0037] text-[#fffaf9] text-xs font-semibold shadow-lg shadow-[#e11d48]/25 active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2 relative overflow-hidden group cursor-pointer disabled:opacity-80"
              >
                {isAuthenticating ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      progress_activity
                    </span>
                    <span>Authenticating Mesh...</span>
                  </>
                ) : authSuccess ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] text-white">check_circle</span>
                    <span>Keypair Verified!</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-0.5">
                      lock
                    </span>
                    <span>
                      {authMode === 'signin' ? 'Continue with Red Salt' : 'Establish New Account'}
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-[#31353f]" />
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#ac8889]">
                Or Single-Tap Access
              </span>
              <div className="flex-1 h-px bg-[#31353f]" />
            </div>

            {/* Social Authentication Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Apple Auth */}
              <button
                type="button"
                onClick={() => handleSocialAuth('Apple')}
                className="h-11 px-3 bg-[#262a34] hover:bg-[#353943] active:scale-[0.98] rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-sm text-[#dfe2ef] border border-white/5 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.98-12.01-14.7-5.88-9.17-10.46-19.8-13.73-31.89-3.27-12.09-4.9-23.79-4.9-35.11 0-14.7 3.69-26.68 11.08-35.94 7.39-9.26 16.59-13.97 27.6-14.15 4.8 0 10.23 1.34 16.29 4.02 6.06 2.68 10.15 4.06 12.28 4.14 1.74 0 6.06-1.46 12.95-4.38 6.89-2.92 12.63-4.14 17.22-3.66 12.74 1.09 22.84 5.99 30.3 14.7-10.99 6.64-16.38 15.82-16.16 27.53.22 9.26 3.81 17.07 10.79 23.43 6.97 6.37 15.25 10.02 24.84 10.95-2.07 6.42-4.58 13.06-7.53 19.92zM119.22 33.07c0-7.39 2.68-14.47 8.04-21.25 5.36-6.78 11.96-11.04 19.81-12.78.33 1.31.49 2.5.49 3.59 0 7.29-2.83 14.53-8.5 21.72-5.66 7.18-12.41 11.48-20.25 12.89-.22-1.31-.33-2.39-.33-3.23z" />
                </svg>
                <span className="text-xs font-medium">Apple ID</span>
              </button>

              {/* Google Auth */}
              <button
                type="button"
                onClick={() => handleSocialAuth('Google')}
                className="h-11 px-3 bg-[#262a34] hover:bg-[#353943] active:scale-[0.98] rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-sm text-[#dfe2ef] border border-white/5 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-xs font-medium">Google</span>
              </button>
            </div>
          </div>
        )}

        {/* Security & Compliance Footer Strip */}
        <div className="mt-6 flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181b25] border border-white/5 shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-[#ffb2b9]">verified_user</span>
            <span className="font-mono text-[11px] text-[#e5bdbe]/80">
              256-bit Post-Quantum End-to-End Encrypted
            </span>
          </div>
          <p className="text-[11px] text-[#ac8889] max-w-[300px] leading-relaxed">
            Protected by biometric zero-knowledge protocol. Red Salt never stores your plain-text credentials.
          </p>
        </div>
      </div>
    </div>
  );
};
