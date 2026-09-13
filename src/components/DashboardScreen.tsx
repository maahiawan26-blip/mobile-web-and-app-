import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ActivityItem } from '../types';

interface DashboardScreenProps {
  treasuryBalance: number;
  activities: ActivityItem[];
  onOpenDeposit: () => void;
  onOpenSend: () => void;
  onOpenSwap: () => void;
  onOpenAudit: () => void;
  onNavigateToAnalytics: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  treasuryBalance,
  activities,
  onOpenDeposit,
  onOpenSend,
  onOpenSwap,
  onOpenAudit,
  onNavigateToAnalytics,
}) => {
  const [velocityTimeframe, setVelocityTimeframe] = useState<'7D' | '30D'>('7D');
  const [rulesActive, setRulesActive] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Sparkline data configurations for 7D vs 30D
  const sparklineData7D = [
    { label: 'Mon', value: 38 },
    { label: 'Tue', value: 32 },
    { label: 'Wed', value: 34 },
    { label: 'Thu', value: 45 },
    { label: 'Fri', value: 40 },
    { label: 'Sat', value: 52 },
    { label: 'Today', value: 58 }
  ];

  const sparklineData30D = [
    { label: 'W1', value: 24 },
    { label: 'W2', value: 33 },
    { label: 'W3', value: 42 },
    { label: 'W4', value: 58 }
  ];

  const activePoints = velocityTimeframe === '7D' ? sparklineData7D : sparklineData30D;

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 space-y-4 pt-2 pb-8">
      {/* User Welcome Header Bar */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#dfe2ef] tracking-tight">
            Welcome back, Alex 👋
          </h2>
          <p className="text-xs text-[#e5bdbe]/75 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ffb3b6] animate-pulse" />
            Cluster node US-East active • Latency 14ms
          </p>
        </div>
        <div className="px-3 py-1 rounded-full bg-[#262a34] border border-white/5 flex items-center gap-1.5 shadow-sm">
          <span className="material-symbols-outlined text-[#ffb3b6] text-[14px]">calendar_today</span>
          <span className="text-[11px] font-semibold text-[#dfe2ef]">May 24</span>
        </div>
      </div>

      {/* Main Balance & Consolidated Treasury Card */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#e11d48] via-[#262a34] to-[#1c1f29] border border-white/[0.08] shadow-xl p-4 sm:p-5">
        {/* Decorative Prismatic Hexagon SVG Glow */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 opacity-20 pointer-events-none">
          <svg className="w-full h-full text-[#ffb3b6]" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <polygon fill="none" opacity="0.6" points="100,10 185,55 185,145 100,190 15,145 15,55" stroke="currentColor" strokeWidth="3" />
            <polygon fill="none" opacity="0.3" points="100,30 165,65 165,135 100,170 35,135 35,65" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="100" cy="100" opacity="0.8" r="28" stroke="currentColor" strokeWidth="4" />
            <line opacity="0.3" stroke="currentColor" strokeWidth="1" x1="100" x2="100" y1="10" y2="190" />
            <line opacity="0.3" stroke="currentColor" strokeWidth="1" x1="15" x2="185" y1="55" y2="145" />
            <line opacity="0.3" stroke="currentColor" strokeWidth="1" x1="15" x2="185" y1="145" y2="55" />
          </svg>
        </div>

        <div className="relative z-10 space-y-4">
          {/* Top row: Label and 7d pill */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#fffaf9]/85 tracking-wider uppercase font-mono">
              Consolidated Treasury
            </span>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0a0e17]/60 backdrop-blur-md border border-white/10">
              <span className="material-symbols-outlined text-[#ffb3b6] text-[14px]">trending_up</span>
              <span className="text-xs font-bold text-[#ffb3b6] font-mono">+18.4%</span>
              <span className="text-[11px] text-[#e5bdbe]/70 font-mono">7d</span>
            </div>
          </div>

          {/* Metric Big Number */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-medium text-[#fffaf9]/90">$</span>
              <h1 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#fffaf9]">
                {treasuryBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h1>
            </div>
            <p className="text-xs text-[#e5bdbe]/80 mt-1 font-mono">
              Available liquidity • $6,420.10 pending validation
            </p>
          </div>

          {/* Quick Action Buttons Row */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            <button
              onClick={onOpenDeposit}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#0a0e17]/75 hover:bg-[#0a0e17] text-[#dfe2ef] active:scale-95 transition-all shadow-sm border border-white/5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-[#e11d48]/30 flex items-center justify-center mb-1 group-hover:bg-[#e11d48]/50 transition-colors">
                <span className="material-symbols-outlined text-[#ffb3b6] text-[18px]">add</span>
              </div>
              <span className="text-xs font-medium">Deposit</span>
            </button>

            <button
              onClick={onOpenSend}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#0a0e17]/75 hover:bg-[#0a0e17] text-[#dfe2ef] active:scale-95 transition-all shadow-sm border border-white/5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-[#262a34] flex items-center justify-center mb-1 group-hover:bg-[#31353f] transition-colors">
                <span className="material-symbols-outlined text-[#dfe2ef] text-[18px]">north_east</span>
              </div>
              <span className="text-xs font-medium">Send</span>
            </button>

            <button
              onClick={onOpenSwap}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#0a0e17]/75 hover:bg-[#0a0e17] text-[#dfe2ef] active:scale-95 transition-all shadow-sm border border-white/5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-[#262a34] flex items-center justify-center mb-1 group-hover:bg-[#31353f] transition-colors">
                <span className="material-symbols-outlined text-[#dfe2ef] text-[18px]">swap_horiz</span>
              </div>
              <span className="text-xs font-medium">Swap</span>
            </button>

            <button
              onClick={onNavigateToAnalytics}
              className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#0a0e17]/75 hover:bg-[#0a0e17] text-[#dfe2ef] active:scale-95 transition-all shadow-sm border border-white/5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-[#262a34] flex items-center justify-center mb-1 group-hover:bg-[#31353f] transition-colors">
                <span className="material-symbols-outlined text-[#dfe2ef] text-[18px]">query_stats</span>
              </div>
              <span className="text-xs font-medium">Insights</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Sparkline & Velocity Module */}
      <div className="p-4 rounded-xl bg-[#181b25] border border-white/[0.05] shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#e5bdbe]/80 uppercase tracking-wider font-mono">
              Weekly Velocity Trend
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-base font-mono font-semibold text-[#dfe2ef]">
                {velocityTimeframe === '7D' ? '1,240 ops/hr' : '28,900 ops/mo'}
              </span>
              <span className="text-xs text-[#ffb3b6] flex items-center font-mono">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 9.2%
              </span>
            </div>
          </div>
          <div className="flex gap-1 bg-[#1c1f29] p-1 rounded-full border border-white/5">
            <button
              onClick={() => setVelocityTimeframe('7D')}
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                velocityTimeframe === '7D'
                  ? 'bg-[#e11d48] text-[#fffaf9] shadow-sm'
                  : 'text-[#e5bdbe]/70 hover:text-[#dfe2ef]'
              }`}
            >
              7D
            </button>
            <button
              onClick={() => setVelocityTimeframe('30D')}
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                velocityTimeframe === '30D'
                  ? 'bg-[#e11d48] text-[#fffaf9] shadow-sm'
                  : 'text-[#e5bdbe]/70 hover:text-[#dfe2ef]'
              }`}
            >
              30D
            </button>
          </div>
        </div>

        {/* Compact Linear Sparkline Inline SVG with Ruby Crimson Gradient */}
        <div className="w-full h-16 pt-1 relative">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 340 60">
            <defs>
              <linearGradient id="rubyGlow" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#e11d48" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Shaded Area */}
            {velocityTimeframe === '7D' ? (
              <polygon
                fill="url(#rubyGlow)"
                points="0,52 30,46 65,48 100,32 135,38 170,22 205,28 240,14 275,18 310,8 340,4 340,60 0,60"
              />
            ) : (
              <polygon
                fill="url(#rubyGlow)"
                points="0,55 80,42 160,35 240,20 340,6 340,60 0,60"
              />
            )}
            {/* Polyline Stroke */}
            {velocityTimeframe === '7D' ? (
              <polyline
                fill="none"
                points="0,52 30,46 65,48 100,32 135,38 170,22 205,28 240,14 275,18 310,8 340,4"
                stroke="#ffb3b6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            ) : (
              <polyline
                fill="none"
                points="0,55 80,42 160,35 240,20 340,6"
                stroke="#ffb3b6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            )}
            {/* Active Data Point Highlight */}
            <circle
              cx="340"
              cy={velocityTimeframe === '7D' ? "4" : "6"}
              fill="#e11d48"
              r="4.5"
              stroke="#ffffff"
              strokeWidth="2"
              className="animate-pulse"
            />
          </svg>
        </div>

        <div className="flex items-center justify-between text-xs text-[#e5bdbe]/70 pt-1 font-mono">
          {activePoints.map((item, idx) => (
            <span
              key={idx}
              className={idx === activePoints.length - 1 ? 'text-[#ffb3b6] font-bold' : ''}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* Active System Alert Notification Pill */}
      <div className="p-3 rounded-xl bg-[#1c1f29] border border-white/[0.05] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#db2b4e]/20 text-[#ffb2b7] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#dfe2ef] truncate">Security Audit Verified</p>
            <p className="text-[11px] text-[#e5bdbe]/75 truncate">Zero vulnerabilities detected on Salt V3 contract.</p>
          </div>
        </div>
        <button
          onClick={onOpenAudit}
          className="shrink-0 ml-2 px-3 py-1 rounded-full bg-[#262a34] hover:bg-[#31353f] text-[#dfe2ef] text-xs font-medium transition-colors border border-white/5 cursor-pointer"
        >
          Review
        </button>
      </div>

      {/* Quick Features Bento Module Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#dfe2ef]">Core Modules</h3>
          <span className="text-xs text-[#ffb3b6] hover:underline cursor-pointer font-mono">
            Customize
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Feature 1: Cloud Files */}
          <div className="p-4 rounded-xl bg-[#181b25] hover:bg-[#1c1f29] border border-white/[0.05] transition-all shadow-sm flex flex-col justify-between space-y-3 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#262a34] flex items-center justify-center text-[#ffb3b6] group-hover:bg-[#e11d48] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">folder_zip</span>
              </div>
              <span className="text-xs text-[#e5bdbe]/70 font-mono">1.2 TB</span>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#dfe2ef]">Cloud Files</h4>
              <p className="text-[11px] text-[#e5bdbe]/70">Synchronized strata</p>
            </div>
          </div>

          {/* Feature 2: Automated Rules */}
          <div
            onClick={() => setRulesActive(!rulesActive)}
            className="p-4 rounded-xl bg-[#181b25] hover:bg-[#1c1f29] border border-white/[0.05] transition-all shadow-sm flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#262a34] flex items-center justify-center text-[#ffb2b9] group-hover:bg-[#891933] group-hover:text-[#ff97a3] transition-colors">
                <span className="material-symbols-outlined text-[20px]">auto_mode</span>
              </div>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono transition-colors ${
                  rulesActive
                    ? 'bg-[#e11d48]/20 text-[#ffb3b6] border border-[#e11d48]/30'
                    : 'bg-white/10 text-white/50'
                }`}
              >
                {rulesActive ? '12 ON' : 'PAUSED'}
              </span>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#dfe2ef]">Automated Rules</h4>
              <p className="text-[11px] text-[#e5bdbe]/70">Dynamic routing</p>
            </div>
          </div>

          {/* Feature 3: Team Access */}
          <div className="p-4 rounded-xl bg-[#181b25] hover:bg-[#1c1f29] border border-white/[0.05] transition-all shadow-sm flex flex-col justify-between space-y-3 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#262a34] flex items-center justify-center text-[#ffb3b6] group-hover:bg-[#e11d48] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </div>
              <div className="flex -space-x-1.5">
                <div className="w-5 h-5 rounded-full bg-[#31353f] border border-[#0f131c] flex items-center justify-center text-[9px] font-bold text-[#dfe2ef]">
                  JD
                </div>
                <div className="w-5 h-5 rounded-full bg-[#e11d48] border border-[#0f131c] flex items-center justify-center text-[9px] font-bold text-white">
                  AL
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#dfe2ef]">Team Access</h4>
              <p className="text-[11px] text-[#e5bdbe]/70">8 seats allocated</p>
            </div>
          </div>

          {/* Feature 4: Security Vault */}
          <div className="p-4 rounded-xl bg-[#181b25] hover:bg-[#1c1f29] border border-white/[0.05] transition-all shadow-sm flex flex-col justify-between space-y-3 cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#262a34] flex items-center justify-center text-[#ffb2b7] group-hover:bg-[#db2b4e] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[20px]">encrypted</span>
              </div>
              <span className="material-symbols-outlined text-[#ffb3b6] text-[16px]">lock</span>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#dfe2ef]">Security Vault</h4>
              <p className="text-[11px] text-[#e5bdbe]/70">FIPS-140-3 HSM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Section: Active Key Infrastructure Node Visualization */}
      <div className="rounded-xl bg-[#181b25] border border-white/[0.05] p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb3b6] text-[20px]">hub</span>
            <h3 className="text-xs font-semibold text-[#dfe2ef]">Prismatic Mesh Network</h3>
          </div>
          <span className="font-mono text-xs text-[#ffb3b6] bg-[#e11d48]/15 border border-[#e11d48]/30 px-2 py-0.5 rounded-full">
            Optimal
          </span>
        </div>

        {/* Refractive Canvas Visual with Image Backdrop */}
        <div
          className="relative w-full h-32 rounded-lg overflow-hidden bg-cover bg-center shadow-inner border border-white/[0.06]"
          style={{ backgroundImage: `url('${ASSETS.meshRender}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#181b25] via-[#181b25]/40 to-transparent" />
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[#dfe2ef] text-xs">
            <div className="flex items-center gap-1.5 backdrop-blur-md px-2 py-0.5 rounded bg-[#0a0e17]/80 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#ffb3b6] animate-ping" />
              <span className="font-mono text-[11px]">Node #RS-9921</span>
            </div>
            <span className="font-mono text-[11px] text-[#e5bdbe]/90 backdrop-blur-md px-2 py-0.5 rounded bg-[#0a0e17]/80 border border-white/10">
              99.998% Sync
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="space-y-3 pb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#dfe2ef]">Activity Feed</h3>
          <button
            onClick={onNavigateToAnalytics}
            className="text-xs text-[#e5bdbe]/80 hover:text-[#dfe2ef] flex items-center gap-0.5 cursor-pointer font-mono"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="rounded-xl bg-[#181b25] border border-white/[0.05] divide-y divide-white/[0.05] shadow-md overflow-hidden">
          {activities.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#262a34] flex items-center justify-center text-[#ffb3b6] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#dfe2ef] truncate">{item.title}</p>
                  <p className="text-[11px] text-[#e5bdbe]/70 truncate">{item.subtitle}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p
                  className={`text-xs font-mono font-semibold ${
                    item.type === 'inflow' ? 'text-[#ffb3b6]' : 'text-[#dfe2ef]'
                  }`}
                >
                  {item.amount}
                </p>
                <span
                  className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-mono font-medium ${
                    item.status === 'Completed'
                      ? 'text-[#ffb3b6] bg-[#e11d48]/20'
                      : 'text-[#e5bdbe]/70 bg-[#31353f]'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
