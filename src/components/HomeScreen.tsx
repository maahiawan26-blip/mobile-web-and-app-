import React, { useState } from 'react';
import { ASSETS, FAQS } from '../data/mockData';
import { ScreenType } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Dynamic Ambient Glow Backdrops */}
      <div className="relative w-full overflow-hidden px-4 sm:px-6">
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#e11d48]/20 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute top-96 -right-20 w-64 h-64 bg-[#db2b4e]/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Hero Section */}
        <section className="relative pt-6 pb-8 flex flex-col items-center text-center">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#262a34] border border-white/5 shadow-sm mb-5">
            <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-ping" />
            <span className="text-[11px] font-semibold text-[#ffb3b6] uppercase tracking-wider font-mono">
              Engine v3.4 Live Release
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#dfe2ef] tracking-tight max-w-sm sm:max-w-md mb-3 leading-tight">
            Experience Next-Gen Digital Precision with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb3b6] via-[#ffdadc] to-[#ffb2b7]">
              Red Salt
            </span>
          </h1>
          <p className="text-sm text-[#e5bdbe]/80 max-w-xs sm:max-w-sm mb-8 leading-relaxed">
            Engineered for real-time velocity. Harness crystalline architectural clarity, zero-lag enterprise sync, and reactive analytics.
          </p>

          {/* Twin CTAs */}
          <div className="flex flex-col w-full gap-3 max-w-xs">
            <button
              onClick={() => onNavigate('account-profile')}
              className="w-full h-12 rounded-full bg-gradient-to-r from-[#e11d48] to-[#db2b4e] hover:brightness-110 text-[#fffaf9] text-[15px] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#e11d48]/30 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Get Started Free</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full h-12 rounded-full bg-[#262a34] hover:bg-[#31353f] border border-white/5 text-[#dfe2ef] text-[15px] font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#ffb3b6]">play_circle</span>
              <span>Explore Demo</span>
            </button>
          </div>

          {/* Visual Salt Facet Hexagon Element */}
          <div className="relative w-full max-w-xs mt-8 h-48 flex items-center justify-center rounded-xl bg-[#181b25] border border-white/[0.06] shadow-inner overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#181b25] via-transparent to-transparent z-10 pointer-events-none" />
            <svg
              className="w-36 h-36 drop-shadow-[0_0_25px_rgba(225,29,72,0.45)] animate-[pulse_4s_ease-in-out_infinite]"
              fill="none"
              viewBox="0 0 100 115"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                fill="rgba(225, 29, 72, 0.15)"
                points="50,5 95,30 95,85 50,110 5,85 5,30"
                stroke="#ffb3b6"
                strokeOpacity="0.6"
                strokeWidth="1.5"
              />
              <polygon
                fill="rgba(219, 43, 78, 0.35)"
                points="50,15 85,35 85,80 50,100 15,80 15,35"
              />
              <line stroke="#ffb3b6" strokeOpacity="0.4" strokeWidth="1" x1="50" x2="50" y1="15" y2="100" />
              <line stroke="#ffb3b6" strokeOpacity="0.3" strokeWidth="1" x1="15" x2="85" y1="35" y2="80" />
              <line stroke="#ffb3b6" strokeOpacity="0.3" strokeWidth="1" x1="85" x2="15" y1="35" y2="80" />
              <circle cx="50" cy="57.5" fill="#fffaf9" r="14" />
              <circle cx="50" cy="57.5" fill="#e11d48" r="7" />
            </svg>
            <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ffb3b6] animate-ping" />
                <span className="font-mono text-xs text-[#e5bdbe]/80">CRYSTAL_NODE_01</span>
              </div>
              <span className="font-mono text-xs text-[#ffb3b6] font-semibold">ONLINE</span>
            </div>
          </div>
        </section>

        {/* Interactive Counter Strip */}
        <section className="py-4">
          <div className="w-full bg-[#1c1f29] border border-white/[0.06] rounded-xl p-4 shadow-md flex items-center justify-between">
            <div className="flex flex-col items-center flex-1 px-1">
              <span className="font-mono text-lg sm:text-xl text-[#ffb3b6] font-bold">99.99%</span>
              <span className="text-[11px] text-[#e5bdbe]/70 mt-0.5">SLA Uptime</span>
            </div>
            <div className="w-[1px] h-8 bg-[#31353f]" />
            <div className="flex flex-col items-center flex-1 px-1">
              <span className="font-mono text-lg sm:text-xl text-[#dfe2ef] font-bold">250K+</span>
              <span className="text-[11px] text-[#e5bdbe]/70 mt-0.5">Active Devs</span>
            </div>
            <div className="w-[1px] h-8 bg-[#31353f]" />
            <div className="flex flex-col items-center flex-1 px-1">
              <span className="font-mono text-lg sm:text-xl text-[#ffb3b6] font-bold">&lt;15ms</span>
              <span className="text-[11px] text-[#e5bdbe]/70 mt-0.5">Global Sync</span>
            </div>
          </div>
        </section>

        {/* Featured Capabilities / Services */}
        <section className="pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] font-bold text-[#ffb3b6] uppercase tracking-wider font-mono">
                Core Infrastructure
              </span>
              <h2 className="text-xl font-bold text-[#dfe2ef]">Built for Velocity</h2>
            </div>
            <span className="text-xs text-[#e5bdbe]/70">3 Services</span>
          </div>

          <div className="flex flex-col gap-3">
            {/* Capability Card 1 */}
            <div className="relative group p-4 rounded-xl bg-[#181b25] hover:bg-[#1c1f29] border border-white/[0.05] transition-all duration-300 shadow-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#e11d48]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#262a34] flex items-center justify-center text-[#ffb3b6] shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">sync</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#dfe2ef]">Real-Time Cloud Sync</h3>
                    <span className="font-mono text-xs text-[#ffb3b6] bg-[#e11d48]/20 border border-[#e11d48]/30 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-[#e5bdbe]/75 mt-1 leading-relaxed">
                    Zero-conflict state streaming driven by Himalayan salt hash partitioning. Synchronizes state across 42 global edge points instantly.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[#ff97a3] text-xs font-mono">
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                    <span>p99 Latency: 11.2ms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Capability Card 2 */}
            <div className="relative group p-4 rounded-xl bg-[#181b25] hover:bg-[#1c1f29] border border-white/[0.05] transition-all duration-300 shadow-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#891933]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#262a34] flex items-center justify-center text-[#ffb2b9] shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">verified_user</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#dfe2ef]">Enterprise Security</h3>
                    <span className="font-mono text-xs text-[#ffb2b9] bg-[#891933]/40 border border-[#ffb2b9]/30 px-2 py-0.5 rounded-full">
                      SOC2-II
                    </span>
                  </div>
                  <p className="text-xs text-[#e5bdbe]/75 mt-1 leading-relaxed">
                    Post-quantum lattice cryptographic sealing on every transaction. Automated zero-trust posture checks with granular perimeter telemetry.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[#ffb2b9] text-xs font-mono">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    <span>256-bit Lattice Encrypted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Capability Card 3 */}
            <div className="relative group p-4 rounded-xl bg-[#181b25] hover:bg-[#1c1f29] border border-white/[0.05] transition-all duration-300 shadow-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#db2b4e]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#262a34] flex items-center justify-center text-[#ffb2b7] shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[22px]">auto_graph</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#dfe2ef]">AI-Powered Analytics</h3>
                    <span className="font-mono text-xs text-[#ffb2b7] bg-[#db2b4e]/20 border border-[#ffb2b7]/30 px-2 py-0.5 rounded-full">
                      Neural
                    </span>
                  </div>
                  <p className="text-xs text-[#e5bdbe]/75 mt-1 leading-relaxed">
                    Embedded predictive anomaly sensors detect drift and saturation cycles before service degradations impact your end-users.
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-[#dfe2ef] font-mono">
                      <span className="material-symbols-outlined text-[16px] text-[#ffb2b7]">trending_up</span>
                      <span>+34.8% Detection Rate</span>
                    </div>
                    <svg className="w-20 h-4 text-[#e11d48]" fill="none" viewBox="0 0 100 20">
                      <path d="M0 16 L20 14 L40 17 L60 8 L80 11 L100 2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Showcase Asset */}
        <section className="py-4">
          <div className="relative rounded-xl overflow-hidden bg-[#181b25] border border-white/[0.08] shadow-lg group">
            <img
              className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
              alt="High tech server command center"
              src={ASSETS.serverCenter}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/65 to-transparent flex flex-col justify-end p-4">
              <span className="text-[11px] font-bold text-[#ffb3b6] uppercase font-mono tracking-wider">
                Crystalline Hardware Stack
              </span>
              <p className="text-sm font-semibold text-[#dfe2ef] mt-0.5">
                Custom Silicon Optimized for Red Salt Micro-Routines
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-4">
          <div className="p-5 rounded-xl bg-[#1c1f29] border border-white/[0.06] shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-[#ffb3b6]">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-1 text-[18px]">
                    star
                  </span>
                ))}
              </div>
              <span className="text-xs text-[#e5bdbe]/75 font-medium">Verified Enterprise</span>
            </div>
            <blockquote className="text-sm text-[#dfe2ef] italic mb-4 leading-relaxed">
              "Switching our core telemetry to Red Salt felt like shedding 200 milliseconds of friction overnight. The surgical precision and zero latency across regions is unlike anything we've shipped with."
            </blockquote>
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover border border-white/10"
                alt="Marcus Vance"
                src={ASSETS.marcusVance}
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-[#dfe2ef] truncate">Marcus Vance</span>
                <span className="text-xs text-[#e5bdbe]/70 truncate">VP of Platform Infrastructure @ AetherScale</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive FAQ Accordion */}
        <section className="py-4">
          <div className="mb-3">
            <span className="text-[11px] font-bold text-[#ffb3b6] uppercase tracking-wider font-mono">
              Quick Answers
            </span>
            <h2 className="text-xl font-bold text-[#dfe2ef]">Frequently Asked</h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="bg-[#181b25] border border-white/[0.05] rounded-xl overflow-hidden shadow-sm transition-colors">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 flex items-center justify-between text-left text-sm font-semibold text-[#dfe2ef] cursor-pointer hover:bg-white/[0.02]"
                  >
                    <span className="pr-2">{faq.question}</span>
                    <span
                      className={`material-symbols-outlined text-[#ffb3b6] text-[20px] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-0 text-xs text-[#e5bdbe]/80 leading-relaxed animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Final Conversion Banner */}
        <section className="pt-4 pb-8">
          <div className="relative p-6 rounded-xl bg-gradient-to-b from-[#262a34] to-[#181b25] border border-white/[0.08] overflow-hidden shadow-xl text-center flex flex-col items-center">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#e11d48]/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#db2b4e]/20 rounded-full blur-2xl" />
            
            <div className="w-12 h-12 rounded-full bg-[#e11d48]/20 border border-[#e11d48]/30 flex items-center justify-center text-[#ffb3b6] mb-3">
              <span className="material-symbols-outlined text-[24px]">rocket_launch</span>
            </div>
            <h3 className="text-xl font-bold text-[#dfe2ef] tracking-tight mb-2">
              Ready to Elevate Your Velocity?
            </h3>
            <p className="text-xs text-[#e5bdbe]/80 max-w-xs mb-5">
              Deploy your first cluster in under three minutes. No credit card required to start.
            </p>
            <button
              onClick={() => onNavigate('account-profile')}
              className="w-full h-12 rounded-full bg-gradient-to-r from-[#e11d48] to-[#db2b4e] hover:brightness-110 text-[#fffaf9] text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#e11d48]/30 active:scale-95 transition-all cursor-pointer"
            >
              <span>Start Free in 3 Minutes</span>
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
