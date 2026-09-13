import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenType, ActivityItem, UserMatrixItem, SystemNotification } from './types';
import { INITIAL_ACTIVITIES, INITIAL_USERS, NOTIFICATIONS, ASSETS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { AccountScreen } from './components/AccountScreen';
import {
  TransactionModal,
  AuditReportModal,
  NotificationsModal,
  InviteUserModal,
} from './components/Modals';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [isFramed, setIsFramed] = useState(false);
  const [treasuryBalance, setTreasuryBalance] = useState<number>(48920.50);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [users, setUsers] = useState<UserMatrixItem[]>(INITIAL_USERS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(NOTIFICATIONS);

  // Modals state
  const [transMode, setTransMode] = useState<'deposit' | 'send' | 'swap' | null>(null);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  // Unread notification count
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleTransactionSubmit = (
    amount: number,
    type: 'inflow' | 'outflow',
    label: string
  ) => {
    if (type === 'inflow') {
      setTreasuryBalance((prev) => prev + amount);
    } else {
      setTreasuryBalance((prev) => Math.max(0, prev - amount));
    }

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: label,
      subtitle: `${type === 'inflow' ? 'Inbound node settlement' : 'Disbursement'} • Just now`,
      amount: `${type === 'inflow' ? '+' : '-'}$${amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      type,
      status: 'Completed',
      time: 'Just now',
      icon: type === 'inflow' ? 'call_received' : 'north_east',
    };

    setActivities((prev) => [newActivity, ...prev]);
  };

  const handleToggleUserActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );
  };

  const handleAddUser = (name: string, email: string, role: 'ADMIN' | 'DEVELOPER' | 'VIEWER') => {
    const newUser: UserMatrixItem = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      avatarUrl: ASSETS.alinaVance,
      active: true,
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setIsNotifOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0f131c] text-[#dfe2ef] flex flex-col items-center selection:bg-[#e11d48]/30 selection:text-white font-sans antialiased">
      {/* Outer framing wrapper */}
      <div
        className={`w-full flex flex-col flex-1 transition-all duration-300 ${
          isFramed
            ? 'max-w-[420px] my-4 rounded-[40px] border-[6px] border-[#262a34] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden bg-[#0f131c]'
            : 'max-w-md sm:max-w-xl mx-auto'
        }`}
      >
        {/* Sticky App Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          unreadNotifications={unreadCount}
          onOpenNotifications={() => setIsNotifOpen(true)}
          isFramed={isFramed}
          onToggleFrame={() => setIsFramed(!isFramed)}
        />

        {/* Dynamic Screen View with Motion Transitions */}
        <main className="flex-1 w-full flex flex-col relative pb-20 pt-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="w-full flex flex-col flex-1"
            >
              {currentScreen === 'home' && (
                <HomeScreen onNavigate={setCurrentScreen} />
              )}

              {currentScreen === 'dashboard' && (
                <DashboardScreen
                  treasuryBalance={treasuryBalance}
                  activities={activities}
                  onOpenDeposit={() => setTransMode('deposit')}
                  onOpenSend={() => setTransMode('send')}
                  onOpenSwap={() => setTransMode('swap')}
                  onOpenAudit={() => setIsAuditOpen(true)}
                  onNavigateToAnalytics={() => setCurrentScreen('analytics')}
                />
              )}

              {currentScreen === 'analytics' && (
                <AnalyticsScreen
                  users={users}
                  onToggleUserActive={handleToggleUserActive}
                  onOpenAudit={() => setIsAuditOpen(true)}
                  onInviteUser={() => setIsInviteOpen(true)}
                />
              )}

              {currentScreen === 'account-profile' && (
                <AccountScreen onNavigate={setCurrentScreen} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Floating Bottom Navigation Pill */}
        <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      </div>

      {/* Interactive Modals */}
      <TransactionModal
        isOpen={transMode !== null}
        mode={transMode}
        onClose={() => setTransMode(null)}
        onSubmit={handleTransactionSubmit}
      />

      <AuditReportModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
      />

      <NotificationsModal
        isOpen={isNotifOpen}
        notifications={notifications}
        onClose={() => setIsNotifOpen(false)}
        onMarkAllRead={handleMarkAllRead}
      />

      <InviteUserModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
}
