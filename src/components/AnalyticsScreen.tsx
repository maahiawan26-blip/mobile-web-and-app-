import React, { useState, useMemo } from 'react';
import { UserMatrixItem, TimePeriod } from '../types';

interface AnalyticsScreenProps {
  users: UserMatrixItem[];
  onToggleUserActive: (id: string) => void;
  onOpenAudit: () => void;
  onInviteUser: () => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  users,
  onToggleUserActive,
  onOpenAudit,
  onInviteUser,
}) => {
  const [period, setPeriod] = useState<TimePeriod>('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [exportState, setExportState] = useState<'idle' | 'syncing' | 'ready'>('idle');
  const [activeChartPoint, setActiveChartPoint] = useState<{ x: number; y: number; val: string } | null>({
    x: 300,
    y: 20,
    val: '$32.4K',
  });

  // Dynamic KPI calculations based on selected timeframe
  const kpis = useMemo(() => {
    switch (period) {
      case '24h':
        return { mrr: '$24.6K', mrrDelta: '+2.1%', active: '8,450', activeDelta: '+4.2%', load: '18%', conv: '5.12%' };
      case '7d':
        return { mrr: '$184.2K', mrrDelta: '+12.8%', active: '34,120', activeDelta: '+8.3%', load: '24%', conv: '4.82%' };
      case '30d':
        return { mrr: '$742.0K', mrrDelta: '+19.4%', active: '112,800', activeDelta: '+14.1%', load: '31%', conv: '4.95%' };
      case 'all':
        return { mrr: '$2.84M', mrrDelta: '+48.2%', active: '250,000+', activeDelta: '+32.0%', load: '24%', conv: '4.88%' };
    }
  }, [period]);

  // Filter users by search input
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  const handleExport = () => {
    if (exportState !== 'idle') return;
    setExportState('syncing');
    setTimeout(() => {
      setExportState('ready');
      setTimeout(() => {
        setExportState('idle');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 space-y-5 pt-2 pb-8">
      {/* Operational Header & Controls */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-ping" />
              <span className="text-[11px] font-bold text-[#ffb3b6] uppercase tracking-widest font-mono">
                Sys.Core v4.9.1
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#dfe2ef] tracking-tight">
              Platform Operations
            </h2>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#e11d48] hover:bg-[#be0037] text-[#fffaf9] shadow-lg shadow-[#e11d48]/25 active:scale-95 transition-all cursor-pointer font-medium"
          >
            {exportState === 'syncing' ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                <span className="text-xs font-semibold">Syncing...</span>
              </>
            ) : exportState === 'ready' ? (
              <>
                <span className="material-symbols-outlined text-[18px]">done</span>
                <span className="text-xs font-semibold">Ready</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">ios_share</span>
                <span className="text-xs font-semibold">Export</span>
              </>
            )}
          </button>
        </div>

        {/* Time Horizon Filter Bar */}
        <div className="flex items-center p-1 rounded-xl bg-[#181b25] border border-white/[0.05] overflow-x-auto no-scrollbar gap-1">
          {(['24h', '7d', '30d', 'all'] as TimePeriod[]).map((t) => {
            const labels: Record<TimePeriod, string> = {
              '24h': 'Today',
              '7d': '7D',
              '30d': '30D',
              all: 'All-time',
            };
            const isActive = period === t;
            return (
              <button
                key={t}
                onClick={() => setPeriod(t)}
                className={`flex-1 py-1.5 px-3 rounded-lg text-center text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#262a34] text-[#dfe2ef] font-semibold shadow-sm border border-white/10'
                    : 'text-[#e5bdbe]/70 hover:text-[#dfe2ef]'
                }`}
              >
                {labels[t]}
              </button>
            );
          })}
        </div>
      </section>

      {/* Key Admin KPI Bento Grid */}
      <section className="grid grid-cols-2 gap-3">
        {/* Card 1: MRR */}
        <div className="p-4 rounded-xl bg-[#1c1f29] border border-white/[0.05] flex flex-col justify-between shadow-md relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-[#e11d48]/10 blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#e5bdbe]/75">Monthly Recurring</span>
            <span className="material-symbols-outlined text-[18px] text-[#ffb3b6]">payments</span>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-bold text-[#dfe2ef] font-mono">{kpis.mrr}</div>
            <div className="flex items-center gap-1 mt-1 font-mono">
              <span className="material-symbols-outlined text-[14px] text-[#ffb3b6]">trending_up</span>
              <span className="text-xs text-[#ffb3b6]">{kpis.mrrDelta}</span>
              <span className="text-[10px] text-[#e5bdbe]/60 ml-0.5">vs last mo</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Users */}
        <div className="p-4 rounded-xl bg-[#1c1f29] border border-white/[0.05] flex flex-col justify-between shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#e5bdbe]/75">Active Platform</span>
            <span className="material-symbols-outlined text-[18px] text-[#ffb2b9]">groups</span>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-bold text-[#dfe2ef] font-mono">{kpis.active}</div>
            <div className="flex items-center gap-1 mt-1 font-mono">
              <span className="material-symbols-outlined text-[14px] text-[#ffb2b9]">arrow_upward</span>
              <span className="text-xs text-[#ffb2b9]">{kpis.activeDelta}</span>
              <span className="text-[10px] text-[#e5bdbe]/60 ml-0.5">peak flow</span>
            </div>
          </div>
        </div>

        {/* Card 3: Server Load */}
        <div className="p-4 rounded-xl bg-[#1c1f29] border border-white/[0.05] flex flex-col justify-between shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#e5bdbe]/75">Server Cluster</span>
            <span className="material-symbols-outlined text-[18px] text-[#ffb3b6]">dns</span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-[#dfe2ef] font-mono">{kpis.load}</span>
              <span className="text-[10px] font-mono text-[#ffb3b6] px-1.5 py-0.2 bg-[#e11d48]/20 rounded border border-[#e11d48]/30">
                Optimal
              </span>
            </div>
            <div className="w-full bg-[#262a34] h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#e11d48] h-full rounded-full transition-all duration-500"
                style={{ width: kpis.load }}
              />
            </div>
          </div>
        </div>

        {/* Card 4: Conversion Rate */}
        <div className="p-4 rounded-xl bg-[#1c1f29] border border-white/[0.05] flex flex-col justify-between shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#e5bdbe]/75">Conversion Rate</span>
            <span className="material-symbols-outlined text-[18px] text-[#ffb2b7]">conversion_path</span>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-bold text-[#dfe2ef] font-mono">{kpis.conv}</div>
            <div className="flex items-center gap-1 mt-1 font-mono">
              <span className="material-symbols-outlined text-[14px] text-[#ffb3b6]">arrow_upward</span>
              <span className="text-xs text-[#ffb3b6]">+0.4%</span>
              <span className="text-[10px] text-[#e5bdbe]/60 ml-0.5">benchmark</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Revenue & Traffic Chart Card */}
      <section className="p-4 rounded-xl bg-[#1c1f29] border border-white/[0.05] flex flex-col gap-3 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#dfe2ef]">Throughput &amp; Gross Volume</h3>
            <p className="text-xs text-[#e5bdbe]/70">Telemetry nodes synchronized</p>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#262a34] border border-white/5">
            <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-pulse" />
            <span className="text-[10px] font-mono text-[#dfe2ef] font-semibold">REALTIME</span>
          </div>
        </div>

        {/* Vector Chart Area */}
        <div className="relative w-full h-44 pt-2">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 340 140">
            <defs>
              <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="1">
                <stop offset="0%" stopColor="#e11d48" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#e11d48" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Dotted Grid lines */}
            <line stroke="#31353f" strokeDasharray="3 3" strokeWidth="0.8" x1="0" x2="340" y1="20" y2="20" />
            <line stroke="#31353f" strokeDasharray="3 3" strokeWidth="0.8" x1="0" x2="340" y1="65" y2="65" />
            <line stroke="#31353f" strokeDasharray="3 3" strokeWidth="0.8" x1="0" x2="340" y1="110" y2="110" />
            {/* Shaded Area Under Curve */}
            <path
              d="M0,95 Q40,80 80,88 T160,45 T240,60 T300,20 T340,32 L340,135 L0,135 Z"
              fill="url(#chartGradient)"
            />
            {/* Chart Stroke Line */}
            <path
              d="M0,95 Q40,80 80,88 T160,45 T240,60 T300,20 T340,32"
              fill="none"
              stroke="#e11d48"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
            {/* Interactive Data Point Markers */}
            <circle
              cx="80"
              cy="88"
              r="4"
              className="fill-[#1c1f29] stroke-[#ffb3b6] hover:scale-150 cursor-pointer transition-transform"
              strokeWidth="2"
              onClick={() => setActiveChartPoint({ x: 80, y: 88, val: '$14.2K' })}
            />
            <circle
              cx="160"
              cy="45"
              r="4"
              className="fill-[#1c1f29] stroke-[#ffb3b6] hover:scale-150 cursor-pointer transition-transform"
              strokeWidth="2"
              onClick={() => setActiveChartPoint({ x: 160, y: 45, val: '$22.8K' })}
            />
            <circle
              cx="240"
              cy="60"
              r="4"
              className="fill-[#1c1f29] stroke-[#ffb3b6] hover:scale-150 cursor-pointer transition-transform"
              strokeWidth="2"
              onClick={() => setActiveChartPoint({ x: 240, y: 60, val: '$18.9K' })}
            />
            <circle
              cx="300"
              cy="20"
              fill="#fffaf9"
              r="5"
              stroke="#e11d48"
              strokeWidth="3"
              className="cursor-pointer"
              onClick={() => setActiveChartPoint({ x: 300, y: 20, val: '$32.4K' })}
            />
          </svg>

          {/* Active Point Tooltip Pill */}
          {activeChartPoint && (
            <div
              className="absolute pointer-events-none transition-all duration-200"
              style={{
                left: `${(activeChartPoint.x / 340) * 100}%`,
                top: `${activeChartPoint.y}px`,
                transform: 'translate(-50%, -130%)',
              }}
            >
              <div className="px-2 py-0.5 rounded bg-[#e11d48] text-[#fffaf9] shadow-md font-mono text-[11px] font-bold">
                {activeChartPoint.val}
              </div>
            </div>
          )}
        </div>

        {/* Chart Horizontal Timestamps */}
        <div className="flex justify-between items-center text-[#e5bdbe]/70 font-mono text-xs px-1 pt-1">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:59</span>
        </div>
      </section>

      {/* User Management Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[#dfe2ef]">User Matrix</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#262a34] text-[#e5bdbe]/80 font-mono">
              {users.filter((u) => u.active).length} Active Now
            </span>
          </div>
          <button
            onClick={onInviteUser}
            className="text-xs text-[#ffb3b6] hover:underline font-medium cursor-pointer"
          >
            Manage All
          </button>
        </div>

        {/* Search input */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#181b25] border border-white/[0.05] text-[#dfe2ef]">
          <span className="material-symbols-outlined text-[18px] text-[#e5bdbe]/60">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search identities, emails, tokens..."
            className="bg-transparent border-none outline-none text-xs text-[#dfe2ef] placeholder:text-[#ac8889]/60 w-full"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#e5bdbe]/60 hover:text-white"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
          <span className="material-symbols-outlined text-[16px] text-[#ac8889]">tune</span>
        </div>

        {/* User Rows Mosaic */}
        <div className="flex flex-col gap-2">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#1c1f29] hover:bg-[#262a34] border border-white/[0.05] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    alt={user.name}
                    src={user.avatarUrl}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-[#1c1f29] transition-colors ${
                      user.active ? 'bg-[#e11d48]' : 'bg-gray-500'
                    }`}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#dfe2ef]">{user.name}</span>
                  <span className="text-[11px] text-[#e5bdbe]/70 font-mono">{user.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold font-mono ${
                    user.role === 'ADMIN'
                      ? 'bg-[#e11d48]/20 text-[#ffb3b6] border border-[#e11d48]/30'
                      : user.role === 'DEVELOPER'
                      ? 'bg-[#891933]/30 text-[#ff97a3] border border-[#ff97a3]/30'
                      : 'bg-[#31353f] text-[#e5bdbe]/70'
                  }`}
                >
                  {user.role}
                </span>

                {/* Animated Switch Button */}
                <button
                  onClick={() => onToggleUserActive(user.id)}
                  aria-label={`Toggle access for ${user.name}`}
                  className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                    user.active ? 'bg-[#e11d48]' : 'bg-[#262a34]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      user.active
                        ? 'translate-x-4 bg-[#fffaf9]'
                        : 'translate-x-0 bg-[#e5bdbe]/50'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="p-6 text-center text-xs text-[#e5bdbe]/60 bg-[#181b25] rounded-xl border border-white/5 font-mono">
              No matching accounts located in mesh matrix.
            </div>
          )}
        </div>
      </section>

      {/* System Health & Security Monitor Bento */}
      <section className="p-4 rounded-xl bg-[#1c1f29] border border-white/[0.05] flex flex-col gap-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#ffb3b6]">shield</span>
            <h3 className="text-xs font-semibold text-[#dfe2ef]">System Diagnostics</h3>
          </div>
          <button
            onClick={onOpenAudit}
            className="text-xs text-[#e5bdbe]/80 hover:text-[#dfe2ef] flex items-center gap-1 cursor-pointer font-mono"
          >
            <span>Audit Trail</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Latency Metric */}
          <div className="p-3 rounded-lg bg-[#181b25] border border-white/[0.05] flex flex-col justify-between gap-1">
            <div className="flex items-center justify-between text-[#e5bdbe]/75">
              <span className="text-[11px]">API Latency</span>
              <span className="material-symbols-outlined text-[14px] text-[#ffb3b6]">speed</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-mono font-bold text-[#dfe2ef]">19.4</span>
              <span className="text-xs text-[#e5bdbe]/70 font-mono">ms</span>
            </div>
            <div className="flex items-center gap-1 text-[#ffb3b6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
              <span className="text-[10px] font-mono">Edge CDN Sync</span>
            </div>
          </div>

          {/* Database Health Metric */}
          <div className="p-3 rounded-lg bg-[#181b25] border border-white/[0.05] flex flex-col justify-between gap-1">
            <div className="flex items-center justify-between text-[#e5bdbe]/75">
              <span className="text-[11px]">DB Uptime</span>
              <span className="material-symbols-outlined text-[14px] text-[#ffb2b9]">database</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-mono font-bold text-[#dfe2ef]">99.98</span>
              <span className="text-xs text-[#e5bdbe]/70 font-mono">%</span>
            </div>
            <div className="flex items-center gap-1 text-[#ffb2b9]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb2b9]" />
              <span className="text-[10px] font-mono">12 Shards Clean</span>
            </div>
          </div>
        </div>

        {/* Quick Event Micro-Stream */}
        <div className="p-2.5 rounded-lg bg-[#181b25] border border-white/[0.05] flex items-center justify-between text-xs text-[#e5bdbe]/80">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="material-symbols-outlined text-[16px] text-[#e11d48]">verified_user</span>
            <span className="font-mono text-[11px] truncate text-[#dfe2ef]">
              SecOps: OAuth token rotated for node #71
            </span>
          </div>
          <span className="font-mono text-[10px] whitespace-nowrap text-[#ac8889] ml-2">2m ago</span>
        </div>
      </section>
    </div>
  );
};
