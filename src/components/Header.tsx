import React from 'react';
import { ASSETS } from '../data/mockData';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  unreadNotifications: number;
  onOpenNotifications: () => void;
  isFramed: boolean;
  onToggleFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  unreadNotifications,
  onOpenNotifications,
  isFramed,
  onToggleFrame,
}) => {
  return (
    <header className="sticky top-0 w-full z-40 bg-[#0f131c]/85 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_1px_8px_rgba(0,0,0,0.25)]">
      <div className="h-16 px-4 sm:px-6 max-w-5xl mx-auto flex items-center justify-between">
        {/* Brand logo & Live status */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <img
            alt="Red Salt Brand Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src={ASSETS.logo}
          />
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-lg tracking-tight text-[#dfe2ef]">Red Salt</span>
            <div className="flex items-center ml-1 px-2 py-0.5 rounded-full bg-[#e11d48]/20 border border-[#e11d48]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] animate-pulse mr-1" />
              <span className="text-[11px] font-semibold text-[#ffb3b6] tracking-wider uppercase">Live</span>
            </div>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Frame/Full mode toggle for preview versatility */}
          <button
            onClick={onToggleFrame}
            title={isFramed ? "Switch to Full Width View" : "Switch to Mobile Device Frame"}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-[#1c1f29] hover:bg-[#262a34] text-[#e5bdbe] border border-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isFramed ? 'desktop_windows' : 'smartphone'}
            </span>
            <span className="font-medium font-mono text-[11px]">{isFramed ? 'Full View' : 'Phone Frame'}</span>
          </button>

          {/* Notifications button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#e5bdbe] hover:text-[#dfe2ef] hover:bg-[#1c1f29] transition-colors relative"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadNotifications > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#e11d48] ring-2 ring-[#0f131c]" />
            )}
          </button>

          {/* User profile avatar */}
          <button
            onClick={() => onNavigate('account-profile')}
            aria-label="Account Profile"
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ring-offset-2 ring-offset-[#0f131c] ${
              currentScreen === 'account-profile'
                ? 'ring-2 ring-[#e11d48]'
                : 'hover:opacity-90 ring-1 ring-white/10'
            }`}
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={ASSETS.profileAlex}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
