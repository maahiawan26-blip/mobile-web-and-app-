import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const navItems: { path: ScreenType; label: string; icon: string }[] = [
    { path: 'home', label: 'Home', icon: 'home' },
    { path: 'dashboard', label: 'Dashboard', icon: 'space_dashboard' },
    { path: 'analytics', label: 'Analytics', icon: 'insights' },
    { path: 'account-profile', label: 'Account', icon: 'account_circle' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-safe">
      <div className="px-4 pb-4 pt-2">
        <nav className="pointer-events-auto mx-auto max-w-sm sm:max-w-md h-16 rounded-full bg-[#262a34]/85 backdrop-blur-2xl px-2 flex items-center justify-around shadow-[0_12px_36px_-4px_rgba(0,0,0,0.75)] border border-white/[0.08]">
          {navItems.map((item) => {
            const isActive = currentScreen === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-3.5 py-1.5 rounded-full transition-all duration-200 gap-0.5 relative group ${
                  isActive
                    ? 'text-[#ffb3b6] bg-[#e11d48]/20 font-semibold shadow-inner'
                    : 'text-[#dfe2ef]/65 hover:text-[#dfe2ef] hover:bg-white/[0.05]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                    isActive ? 'scale-110 text-[#ffb3b6]' : 'group-hover:scale-105'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-[11px] font-medium tracking-tight">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#e11d48]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
