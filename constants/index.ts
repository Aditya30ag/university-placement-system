export const APP_CONFIG = {
  name: 'University Placement System',
  version: '1.0.0',
  description: 'Modern placement management system for universities',
  author: 'University IT Team',
  university: {
    name: 'University Name',
    logo: '/logo.png',
    address: 'University Address',
    website: 'https://university.edu'
  }
};

export const API_ENDPOINTS = {
  students: '/api/students',
  companies: '/api/companies',
  jobs: '/api/jobs',
  reports: '/api/reports',
  dashboard: '/api/dashboard',
  prepInsights: '/api/prep-insights',
  settings: '/api/settings',
  auth: '/api/auth'
};

export const LOCAL_STORAGE_KEYS = {
  user: 'placement_user',
  settings: 'placement_settings',
  filters: 'placement_filters',
  theme: 'placement_theme'
};

export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
  pageSizeOptions: [10, 20, 50, 100]
};

export const FILE_UPLOAD = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: {
    resume: ['.pdf', '.doc', '.docx'],
    excel: ['.xlsx', '.xls'],
    image: ['.jpg', '.jpeg', '.png', '.gif']
  }
};

export const VALIDATION_RULES = {
  name: {
    min: 2,
    max: 50
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    pattern: /^[6-9]\d{9}$/
  },
  rollNumber: {
    pattern: /^[A-Z0-9]{6,12}$/
  },
  cgpa: {
    min: 0,
    max: 10
  },
  ctc: {
    min: 0,
    max: 100000000
  }
};

export const CHART_COLORS = [
  '#0ea5e9', // blue-500
  '#22c55e', // green-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#06b6d4', // cyan-500
  '#f97316', // orange-500
  '#84cc16', // lime-500
  '#ec4899', // pink-500
  '#6366f1'  // indigo-500
];

export const EXPORT_FORMATS = [
  { value: 'pdf', label: 'PDF', icon: 'FileText' },
  { value: 'xlsx', label: 'Excel', icon: 'Sheet' },
  { value: 'csv', label: 'CSV', icon: 'Download' }
];

export const DATE_FORMATS = {
  display: 'dd MMM yyyy',
  input: 'yyyy-MM-dd',
  dateTime: 'dd MMM yyyy, hh:mm a',
  month: 'MMM yyyy',
  year: 'yyyy'
};

export const NOTIFICATION_TYPES = {
  success: {
    color: 'green',
    icon: 'CheckCircle'
  },
  error: {
    color: 'red',
    icon: 'XCircle'
  },
  warning: {
    color: 'yellow',
    icon: 'AlertTriangle'
  },
  info: {
    color: 'blue',
    icon: 'Info'
  }
};

export const ROLE_PERMISSIONS = {
  super_admin: [
    'read_all',
    'write_all',
    'delete_all',
    'manage_users',
    'manage_settings',
    'export_data'
  ],
  dept_admin: [
    'read_dept',
    'write_dept',
    'export_dept_data'
  ],
  view_only: [
    'read_all'
  ],
  student: [
    'read_own',
    'update_profile'
  ],
  auditor: [
    'read_all',
    'export_compliance'
  ]
};

export const MENU_ITEMS = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'BarChart3',
    roles: ['super_admin', 'dept_admin', 'view_only']
  },
  {
    title: 'Students',
    href: '/students',
    icon: 'Users',
    roles: ['super_admin', 'dept_admin', 'view_only']
  },
  {
    title: 'Companies',
    href: '/companies',
    icon: 'Building2',
    roles: ['super_admin', 'dept_admin', 'view_only']
  },
  {
    title: 'Job Tracker',
    href: '/job-tracker',
    icon: 'Target',
    roles: ['super_admin', 'dept_admin']
  },
  {
    title: 'PrepCV Insights',
    href: '/prep-insights',
    icon: 'TrendingUp',
    roles: ['super_admin', 'dept_admin', 'view_only']
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: 'FileText',
    roles: ['super_admin', 'dept_admin', 'view_only', 'auditor']
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'Settings',
    roles: ['super_admin']
  }
];

