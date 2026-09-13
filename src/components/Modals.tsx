import React, { useState } from 'react';
import { SystemNotification } from '../types';

// 1. Transaction Modal (Deposit, Send, Swap)
interface TransactionModalProps {
  isOpen: boolean;
  mode: 'deposit' | 'send' | 'swap' | null;
  onClose: () => void;
  onSubmit: (amount: number, type: 'inflow' | 'outflow', label: string) => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  mode,
  onClose,
  onSubmit,
}) => {
  const [amountStr, setAmountStr] = useState('1000');
  const [note, setNote] = useState('');

  if (!isOpen || !mode) return null;

  const titleMap = {
    deposit: 'Treasury Deposit',
    send: 'Disburse Funds',
    swap: 'Liquidity Rebalance / Swap',
  };

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amountStr);
    if (isNaN(val) || val <= 0) return;

    if (mode === 'deposit') {
      onSubmit(val, 'inflow', note || 'Treasury Inbound Transfer');
    } else {
      onSubmit(val, 'outflow', note || 'Disbursement Outflow');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-[#181b25] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb3b6] text-[20px]">
              {mode === 'deposit' ? 'add_circle' : mode === 'send' ? 'north_east' : 'swap_horiz'}
            </span>
            <h3 className="text-sm font-semibold text-[#dfe2ef]">{titleMap[mode]}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#e5bdbe]/60 hover:text-white hover:bg-white/5"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleAction} className="space-y-3.5">
          <div>
            <label className="text-xs text-[#e5bdbe]/80 font-medium block mb-1">
              Amount (USD)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-sm text-[#e5bdbe]/60 font-mono">$</span>
              <input
                type="number"
                step="any"
                required
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                className="w-full h-11 pl-8 pr-4 bg-[#262a34]/60 border border-white/5 rounded-lg text-sm font-mono text-[#dfe2ef] focus:outline-none focus:ring-2 focus:ring-[#e11d48]/40"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-[#e5bdbe]/80 font-medium block mb-1">
              Reference / Note
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Stripe Clearing, Node Payout"
              className="w-full h-11 px-3 bg-[#262a34]/60 border border-white/5 rounded-lg text-xs text-[#dfe2ef] focus:outline-none focus:ring-2 focus:ring-[#e11d48]/40"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#dfe2ef] text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-10 rounded-lg bg-[#e11d48] hover:bg-[#be0037] text-white text-xs font-semibold shadow-lg shadow-[#e11d48]/30 cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Audit Report Modal
interface AuditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditReportModal: React.FC<AuditReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-[#181b25] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb3b6] text-[22px]">verified_user</span>
            <div>
              <h3 className="text-sm font-semibold text-[#dfe2ef]">Salt V3 Security Audit</h3>
              <p className="text-[10px] text-[#e5bdbe]/70 font-mono">HASH: #0x8F92...B31A</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#e5bdbe]/60 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2.5 text-xs text-[#e5bdbe]/80">
          <div className="p-3 bg-[#1c1f29] rounded-xl border border-white/5 space-y-2">
            <div className="flex justify-between font-mono">
              <span className="text-[#dfe2ef]">Vulnerabilities Found:</span>
              <span className="text-emerald-400 font-bold">0 (ZERO)</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-[#dfe2ef]">Cryptographic Primitive:</span>
              <span>Post-Quantum Lattice</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-[#dfe2ef]">Hardware Module:</span>
              <span>FIPS-140-3 Level 4 HSM</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-[#dfe2ef]">Auditor:</span>
              <span className="text-[#ffb3b6]">CertiK &amp; OpenZeppelin</span>
            </div>
          </div>
          <p className="leading-relaxed text-[11px]">
            The Red Salt V3 cryptographic mesh consensus contracts and Himalayan partitioning shards have been formally verified under automated continuous penetration testing.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full h-10 rounded-lg bg-[#e11d48] hover:bg-[#be0037] text-white text-xs font-semibold cursor-pointer transition-all"
        >
          Acknowledge Verification
        </button>
      </div>
    </div>
  );
};

// 3. Notifications Drawer Modal
interface NotificationsModalProps {
  isOpen: boolean;
  notifications: SystemNotification[];
  onClose: () => void;
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  notifications,
  onClose,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-[#181b25] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-3 mt-14 sm:mt-12">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb3b6] text-[20px]">notifications</span>
            <h3 className="text-sm font-semibold text-[#dfe2ef]">Live Telemetry Alerts</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#e5bdbe]/60 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="divide-y divide-white/5 max-h-72 overflow-y-auto pr-1 space-y-1">
          {notifications.map((notif) => (
            <div key={notif.id} className="pt-2 pb-2 text-xs flex gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#e11d48] mt-1 shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-[#dfe2ef]">{notif.title}</span>
                  <span className="text-[10px] text-[#ac8889] font-mono">{notif.time}</span>
                </div>
                <p className="text-[11px] text-[#e5bdbe]/75 mt-0.5 leading-snug">
                  {notif.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex gap-2">
          <button
            onClick={onMarkAllRead}
            className="w-full h-9 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#dfe2ef] text-xs font-medium cursor-pointer"
          >
            Mark All as Read
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Invite User Modal
interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (name: string, email: string, role: 'ADMIN' | 'DEVELOPER' | 'VIEWER') => void;
}

export const InviteUserModal: React.FC<InviteUserModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'DEVELOPER' | 'VIEWER'>('DEVELOPER');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    onAddUser(name, email, role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-[#181b25] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb3b6] text-[20px]">person_add</span>
            <h3 className="text-sm font-semibold text-[#dfe2ef]">Provision Matrix Identity</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#e5bdbe]/60 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-[#e5bdbe]/80 font-medium block mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Maya Lin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 bg-[#262a34]/60 border border-white/5 rounded-lg text-xs text-[#dfe2ef] focus:outline-none focus:ring-2 focus:ring-[#e11d48]/40"
            />
          </div>

          <div>
            <label className="text-xs text-[#e5bdbe]/80 font-medium block mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="maya@redsalt.internal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 bg-[#262a34]/60 border border-white/5 rounded-lg text-xs text-[#dfe2ef] focus:outline-none focus:ring-2 focus:ring-[#e11d48]/40"
            />
          </div>

          <div>
            <label className="text-xs text-[#e5bdbe]/80 font-medium block mb-1">Mesh Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full h-10 px-3 bg-[#262a34] border border-white/5 rounded-lg text-xs text-[#dfe2ef] focus:outline-none focus:ring-2 focus:ring-[#e11d48]/40 cursor-pointer"
            >
              <option value="DEVELOPER">DEVELOPER (Node deployment &amp; code access)</option>
              <option value="ADMIN">ADMIN (Cluster root &amp; treasury controls)</option>
              <option value="VIEWER">VIEWER (Read-only operational telemetry)</option>
            </select>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-lg bg-[#262a34] hover:bg-[#31353f] text-[#dfe2ef] text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-10 rounded-lg bg-[#e11d48] hover:bg-[#be0037] text-white text-xs font-semibold cursor-pointer"
            >
              Provision Identity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
