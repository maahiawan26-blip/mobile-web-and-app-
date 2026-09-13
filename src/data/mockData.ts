import { ActivityItem, UserMatrixItem, SystemNotification, FaqItem } from '../types';

export const ASSETS = {
  logo: "https://lh3.googleusercontent.com/aida/AEtjO1UxyTfWJOZ7wKtOBnoOfwNReyGcmANOAxJXdx3piXnUkUMKjQBYPxs55mBIN5Vn302A_5wLue53xCtjwqmr4AMnhIwK6TaKZF57Dcrswz4jX0ZaR0NJi9EXObyQBu0vM_lRfZsC-vMmSPF0K3enPIH9a4DPFob7QoQlVlkSLW5Npa6lJJMrbbFutYt9OGWWvFQv2J6cLz7rusSn-bAGi2sp3HcdhEWmsXqaItWdfrfpC8r44euQI8pWmzE",
  profileAlex: "https://lh3.googleusercontent.com/aida-public/AB6AXuDc8EpzSXqia6zx1CzApqz9sU_2vFhq1ouSAP9jwJN-k-Q4tgi-ohlYlndQL2GvKFWcvXEFdBx0MPvRA6vdOLDRrvipiRE40bsiX2IPvGTxoq_PDoiDISW94coei26G6JROixWnSc4lE_OR3O18j0c86rZjyfwB9X60-HytooexxWaw447Rh04G8aSQj2XTweeTKtZfbOXnfHD1UOB7qHy44LjQX-bsBZnlKCeQUvlJ_INgVp3fjdyRHw",
  meshRender: "https://lh3.googleusercontent.com/aida-public/AB6AXuApHcIeDqDsPfrFGZKg2Q6Q-drCAjfwR4xXn7i4EqOzWlKY8qbaQSPfnvcGBdZqgyAAYVWSzqRyjqH5GBck73IaM4KLZtid-xx-iPcIdfoCs6wPm4ofCxpoIm0toMSJ5c2zsqT5Ul4BQLDUVT1XfFPTfZTX3R-YFBPbRuqxOgi0rikMPWPsUgOYiAeLR6BavaHHBMp7xXdYS900cQ637HNakds1nLjGEp2s7PQLDuz_7yg-VTl_jM9kXQ",
  serverCenter: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP6D-UwbSOACEatYI_TvKt1m02o4MQyyy0Hlq9ENj8lrvPzAvA1Kuykhw1OmXCxzewgo4a8uyxtHG7KGr2mHxr-xkcGZDotWijgld71z2aBz0-PaT0h8_NvMxbjLkrZgSjF2KCu6ic6_UjHWivxMRKPzzXplxjCyIlNoG1d49QHR6r_3MsNv2GBVSa-D7f8gApw32x-JOlWWPkORr5uP4zt9IRi-CqHjwnthRMY3a1mQkN8kKgQfc4lw",
  marcusVance: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ0HVinuMgG6SKKDLmqLphRUg-vVWde89_4yegL2toRKIvmoogy5RMUAgyVXLdmTXVxgHMw8nt0kjNyOtZRH8yfoFOEQ1PDWY1U5v2RfRA1AgmTnyrcXsE2G50QK3_NU_7sJHy0EtJu5do_9WhbDsnBlU1VIFf0iaCbjv9VLZqAX8JeB83AirTLD-f4HrcHXIE65EA4chU93VqMxAQc2mXBGcFtHFg7Tey9aZLl4CczI7ZtYqeA3CVLg",
  alinaVance: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKYITUCzv0aUI_CSjgqsCJOVkaJLiTiNI9UKDf14IyWeQjta2ZjoQZXQdA2qgdZVW53Sw_j7M8x_n3943SRROwwfgHLB63j4nK-qM42g5ToDBhHYl_k4bifPjGdEsr7NSz3X6JlZCzXXuyBuUqFO2OIM6XynKN2w5LMviW_qRO0R-mZp6YLKyhAHC3NBGjUVQ673zdCvGkCFtelTZJnh5TIjkN03n41oQ2DBIumJUsPF7cAwudJNHEow",
  tarekThorne: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGStQ1tEgVuuaRce2XVmR4Sgy8uVdTZKRC9-rsRewEin-cf--fp97YNKiEk0SEYfMnRdu5CfhLButifTzATAwT3M01AepoXAUTUrlAw-oThpMjavr1oNTWFeHXL9bNNuCURUnFu0C0lUaJSpnDePBtCGIlT-HvYbA_YrALz8NQLBL3wvq7FDPV-E37vx4xjBOWrUq9NbZgMo-HTFlOG-8GE6Mi2E45PFZAJMxAh9nsDVNDvzbBf5NVbQ",
  elenaRostova: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5VKICfuxXhEx4jSbLvQqrHvVzpSkORbXH9xX9wZKBIt6UWR2yrXNRZ5uKSyCqQIPGodwFbbVu2_d5I4wVisCmosGHzMMu7o-gOXFxzqgaqF3prHYMgaabR6-9n428ZTioF7DURtF4M8W8_Ar-WjMH5o2PvOB4XzjBcUeih7cS3nkH8iJsiv8f33SlGfrD4iA0JBBP8yE30GS5oMAAU4EEeSLD4i9Dl05y9O9yONYTRaDSbomLEUxNCA"
};

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Treasury Inflow',
    subtitle: 'From Stripe Billing • 14m ago',
    amount: '+$3,450.00',
    type: 'inflow',
    status: 'Completed',
    time: '14m ago',
    icon: 'call_received'
  },
  {
    id: 'act-2',
    title: 'Liquidity Rebalance',
    subtitle: 'Automated hedge trigger • 2h ago',
    amount: '-$1,200.00',
    type: 'outflow',
    status: 'Completed',
    time: '2h ago',
    icon: 'sync_alt'
  },
  {
    id: 'act-3',
    title: 'Consensus Validation',
    subtitle: 'Block #18,944,201 • 5h ago',
    amount: '0.084 RS',
    type: 'crypto',
    status: 'Processing',
    time: '5h ago',
    icon: 'security_update_good'
  },
  {
    id: 'act-4',
    title: 'Cluster Node Payout',
    subtitle: 'US-East edge compute pool • 9h ago',
    amount: '+$890.20',
    type: 'inflow',
    status: 'Completed',
    time: '9h ago',
    icon: 'call_received'
  }
];

export const INITIAL_USERS: UserMatrixItem[] = [
  {
    id: 'usr-1',
    name: 'Alina Vance',
    email: 'alina@redsalt.internal',
    role: 'ADMIN',
    avatarUrl: ASSETS.alinaVance,
    active: true
  },
  {
    id: 'usr-2',
    name: 'Tarek Thorne',
    email: 'tarek@edge.dev',
    role: 'DEVELOPER',
    avatarUrl: ASSETS.tarekThorne,
    active: true
  },
  {
    id: 'usr-3',
    name: 'Elena Rostova',
    email: 'elena@partner.net',
    role: 'VIEWER',
    avatarUrl: ASSETS.elenaRostova,
    active: false
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How does Red Salt guarantee <15ms global latency?',
    answer: 'We operate edge micro-nodes coupled directly to primary transatlantic fiber lines with intelligent Himalayan salt shard routing, cutting protocol roundtrips to zero.'
  },
  {
    id: 'faq-2',
    question: 'Can I integrate Red Salt into an existing stack?',
    answer: 'Yes. We provide zero-config SDKs for Node.js, Go, Rust, and Python, alongside standard drop-in gRPC and GraphQL connectors with instant schema sync.'
  },
  {
    id: 'faq-3',
    question: 'Is there a free tier for individual builders?',
    answer: 'Our Hobby tier offers up to 50,000 requests per month, full real-time sync capabilities, and complete analytics telemetry forever free.'
  }
];

export const NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    title: 'Security Audit Passed',
    description: 'Zero vulnerabilities detected on Salt V3 smart contracts.',
    time: '12m ago',
    read: false,
    type: 'security'
  },
  {
    id: 'notif-2',
    title: 'Inflow Confirmed',
    description: 'Received +$3,450.00 from Stripe automated recurring billing.',
    time: '18m ago',
    read: false,
    type: 'treasury'
  },
  {
    id: 'notif-3',
    title: 'Shard Re-indexed',
    description: 'Cluster US-East optimized with 14ms average peer roundtrip.',
    time: '1h ago',
    read: true,
    type: 'system'
  }
];
