export interface LandingContent {
  NAV: {
    logoName: string;
    links: Array<{ label: string; href: string }>;
    loginText: string;
    signUpText: string;
  };
  HERO: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    verticalsStrip: string;
  };
  PROBLEM: {
    badge: string;
    title: string;
    subtitle: string;
    painPoints: Array<{
      question: string;
      description: string;
      icon: string;
    }>;
  };
  MODULES: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      featureCount: string;
      description: string;
      iconName: string;
    }>;
  };
  HOW_IT_WORKS: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{
      stepNumber: string;
      title: string;
      description: string;
    }>;
  };
  WHO_ITS_FOR: {
    badge: string;
    title: string;
    subtitle: string;
    verticals: Array<{
      id: string;
      title: string;
      painPoint: string;
      iconName: string;
    }>;
  };
  FINAL_CTA: {
    headline: string;
    subheadline: string;
    buttonText: string;
  };
  FOOTER: {
    logoName: string;
    tagline: string;
    links: Array<{ label: string; href: string }>;
    copyright: string;
  };
}

export const LANDING_CONTENT: LandingContent = {
  NAV: {
    logoName: 'RentallQ',
    links: [
      { label: 'Modules', href: '#modules' },
      { label: 'How it Works', href: '#how-it-works' },
      { label: 'Who it\'s for', href: '#who-its-for' },
    ],
    loginText: 'Login',
    signUpText: 'Sign Up',
  },
  HERO: {
    headline: 'Smart Operations & Decision Support for Modern Rental Businesses.',
    subheadline:
      'RentallQ streamlines bookings, unit inventory, invoicing, and customer records for self-storage, warehouses, hostels, parking, and equipment rental businesses — with weekly AI decision intelligence.',
    ctaPrimary: 'Get Started',
    ctaSecondary: 'Sign In',
    verticalsStrip: 'Built for Self-Storage • Warehouses • Hostels • Parking Providers • Equipment Rental',
  },
  PROBLEM: {
    badge: 'Operational Challenges',
    title: 'Stop Managing Rentals in Scattered Spreadsheets',
    subtitle:
      'Manual tracking leads to missed renewals, delayed payments, and unoptimized pricing. RentallQ centralizes operations and highlights priorities.',
    painPoints: [
      {
        question: 'Which customers might churn?',
        description:
          'Track lease end dates and customer payment signals early so you can secure renewals before vacancies occur.',
        icon: 'Users',
      },
      {
        question: 'Is it time to reprice units?',
        description:
          'Monitor your current occupancy rate and market demand to adjust pricing with confidence.',
        icon: 'TrendingUp',
      },
      {
        question: 'Which units will go vacant?',
        description:
          'Predict turnover dates weeks in advance to schedule prep work and list units without revenue downtime.',
        icon: 'Building2',
      },
      {
        question: 'Are payments falling behind?',
        description:
          'Spot overdue balances immediately and automate payment follow-ups before receivables stack up.',
        icon: 'CreditCard',
      },
    ],
  },
  MODULES: {
    badge: 'Core Modules',
    title: 'Everything Required to Run Your Rental Portfolio',
    subtitle:
      'Concrete operational tools designed for day-to-day business management.',
    items: [
      {
        id: 'dashboard-overview',
        title: 'Dashboard & Overview',
        featureCount: '5 features',
        description:
          'See revenue, occupancy, and pending payments at a glance, every morning.',
        iconName: 'LayoutDashboard',
      },
      {
        id: 'booking-availability',
        title: 'Booking & Availability',
        featureCount: '6 features',
        description:
          'Real-time unit availability and booking management — no double bookings.',
        iconName: 'Calendar',
      },
      {
        id: 'billing-payments',
        title: 'Billing & Payments',
        featureCount: '5 features',
        description:
          'Invoicing, due tracking, late fees, and payment history in one place.',
        iconName: 'CreditCard',
      },
      {
        id: 'customer-management',
        title: 'Customer Management',
        featureCount: '4 features',
        description:
          'Unified customer records, rental history, and documents.',
        iconName: 'Users',
      },
      {
        id: 'reports',
        title: 'Reports & Export',
        featureCount: '4 features',
        description:
          'Occupancy, revenue, and churn reports — exportable for your records.',
        iconName: 'BarChart3',
      },
      {
        id: 'ai-advisor',
        title: 'AI Business Advisor',
        featureCount: '3 features',
        description:
          'Weekly plain-English recommendations: which units to reprice, which customers need a follow-up call.',
        iconName: 'BrainCircuit',
      },
    ],
  },
  HOW_IT_WORKS: {
    badge: 'Simple Onboarding',
    title: 'How RentallQ Works',
    subtitle:
      'Get your rental portfolio onboarded and running smoothly in four straightforward steps.',
    steps: [
      {
        stepNumber: '01',
        title: 'Add Your Units',
        description: 'Input your rental spaces, specifications, rates, and unit statuses.',
      },
      {
        stepNumber: '02',
        title: 'Add Customers',
        description: 'Import client contact profiles, rental agreements, and lease terms.',
      },
      {
        stepNumber: '03',
        title: 'Track Bookings & Payments',
        description: 'Log new reservations, send invoices, and track incoming payments.',
      },
      {
        stepNumber: '04',
        title: 'Get AI Recommendations Weekly',
        description: 'Receive prioritized repricing, renewal, and risk advice every week.',
      },
    ],
  },
  WHO_ITS_FOR: {
    badge: 'Industry Verticals',
    title: 'Who RentallQ Is Built For',
    subtitle:
      'Tailored management capabilities for operators across five key rental industries.',
    verticals: [
      {
        id: 'self-storage',
        title: 'Self-Storage',
        painPoint: 'Track unit sizes, locker availability, and automated past-due payment reminders.',
        iconName: 'Box',
      },
      {
        id: 'warehouse',
        title: 'Warehouses',
        painPoint: 'Manage multi-zone bay allocations, commercial square-footage leasing, and long-term contracts.',
        iconName: 'Building2',
      },
      {
        id: 'hostel',
        title: 'Hostels & Co-Living',
        painPoint: 'Streamline bed and room bookings, deposit tracking, and rapid tenant turnover.',
        iconName: 'Home',
      },
      {
        id: 'parking',
        title: 'Parking Providers',
        painPoint: 'Manage reserved spot assignments, monthly permit renewals, and peak-hour pricing.',
        iconName: 'Car',
      },
      {
        id: 'equipment',
        title: 'Equipment Rental',
        painPoint: 'Monitor equipment availability, return schedules, maintenance windows, and late fees.',
        iconName: 'Wrench',
      },
    ],
  },
  FINAL_CTA: {
    headline: 'Ready to Streamline Your Rental Business with RentallQ?',
    subheadline:
      'Get started in minutes. Replace spreadsheets with purpose-built software and decision support.',
    buttonText: 'Get Started',
  },
  FOOTER: {
    logoName: 'RentallQ',
    tagline: 'Smart operations & decision support for modern rental businesses.',
    links: [
      { label: 'Client Sign In', href: '/login' },
      { label: 'Business Register', href: '/business/register' },
      { label: 'Business Sign In', href: '/business/login' },
    ],
    copyright: '© 2026 RentallQ. All rights reserved.',
  },
};
