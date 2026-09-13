export type ScreenType = 'home' | 'dashboard' | 'analytics' | 'account-profile';

export type TimePeriod = '24h' | '7d' | '30d' | 'all';

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  type: 'inflow' | 'outflow' | 'crypto';
  status: 'Completed' | 'Processing' | 'Pending';
  time: string;
  icon: string;
}

export interface UserMatrixItem {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'DEVELOPER' | 'VIEWER';
  avatarUrl: string;
  active: boolean;
}

export interface SystemNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'security' | 'treasury' | 'system';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
