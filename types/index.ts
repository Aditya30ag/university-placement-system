export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'dept_admin' | 'view_only' | 'student' | 'auditor';
  department?: string;
  lastLogin?: Date;
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  batch: string;
  year: number;
  cgpa: number;
  placementStatus: 'placed' | 'unplaced' | 'intern';
  resumeUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  prepCVScore: number;
  prepCVCompleted: boolean;
  testCompleted: boolean;
  lastUpdated: Date;
  updatedBy: string;
  jobApplications: JobApplication[];
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  industry: string;
  type: 'dream' | 'mass_recruiter' | 'core' | 'startup';
  tier: 'tier1' | 'tier2' | 'tier3';
  lastContactDate?: Date;
  pocs: CompanyPOC[];
  jobs: Job[];
  isActive: boolean;
  createdAt: Date;
}

export interface CompanyPOC {
  id: string;
  name: string;
  email: string;
  phone?: string;
  designation: string;
  isPrimary: boolean;
  companyId: string;
}

export interface Job {
  id: string;
  companyId: string;
  title: string;
  description: string;
  requirements: string[];
  ctc: number;
  location: string;
  jobType: 'full_time' | 'internship' | 'contract';
  eligibilityDepartments: string[];
  minCGPA: number;
  deadline: Date;
  status: 'active' | 'closed' | 'cancelled';
  rounds: JobRound[];
  createdAt: Date;
}

export interface JobRound {
  id: string;
  jobId: string;
  name: string;
  type: 'aptitude' | 'technical' | 'hr' | 'group_discussion' | 'final';
  date?: Date;
  location?: string;
  description?: string;
  students: JobApplication[];
  order: number;
}

export interface JobApplication {
  id: string;
  studentId: string;
  jobId: string;
  appliedAt: Date;
  currentRound?: string;
  status: 'applied' | 'shortlisted' | 'selected' | 'rejected' | 'waiting';
  roundResults: RoundResult[];
  finalResult?: 'selected' | 'rejected' | 'waiting';
  offerDetails?: {
    ctc: number;
    joinDate: Date;
    location: string;
  };
}

export interface RoundResult {
  roundId: string;
  status: 'selected' | 'rejected' | 'waiting';
  feedback?: string;
  score?: number;
  date: Date;
}

export interface DashboardStats {
  totalStudents: number;
  placedStudents: number;
  placedPercentage: number;
  activeJobs: number;
  activeCompanies: number;
  departmentWiseStats: DepartmentStats[];
  monthlyPlacementTrend: MonthlyTrend[];
  topRecruiters: TopRecruiter[];
  upcomingDeadlines: UpcomingDeadline[];
}

export interface DepartmentStats {
  department: string;
  totalStudents: number;
  placedStudents: number;
  placedPercentage: number;
  avgCTC: number;
  prepCVCompletion: number;
}

export interface MonthlyTrend {
  month: string;
  placed: number;
  intern: number;
  unplaced: number;
}

export interface TopRecruiter {
  companyName: string;
  studentsHired: number;
  avgCTC: number;
}

export interface UpcomingDeadline {
  jobTitle: string;
  companyName: string;
  deadline: Date;
  appliedCount: number;
}

export interface Report {
  id: string;
  name: string;
  type: 'compliance' | 'placement_summary' | 'company_report' | 'student_report';
  generatedAt: Date;
  generatedBy: string;
  format: 'pdf' | 'xlsx';
  url?: string;
  shareableToken?: string;
  expiresAt?: Date;
  filters: Record<string, any>;
}

export interface SystemSettings {
  studentDashboardEnabled: boolean;
  autoDisableStudentLogins: boolean;
  placementDeadline: Date;
  readinessThreshold: number;
  complianceThreshold: number;
  allowBulkUpload: boolean;
  enableNotifications: boolean;
  universityName: string;
  universityLogo?: string;
}

export interface PrepCVInsight {
  totalStudents: number;
  testsCompleted: number;
  testsCompletedPercentage: number;
  resumesUploaded: number;
  resumesUploadedPercentage: number;
  avgScore: number;
  departmentWiseCompletion: DepartmentCompletion[];
  dailyEngagement: DailyEngagement[];
  weeklyEngagement: WeeklyEngagement[];
}

export interface DepartmentCompletion {
  department: string;
  testsCompleted: number;
  resumesUploaded: number;
  totalStudents: number;
  completionPercentage: number;
}

export interface DailyEngagement {
  date: string;
  testsCompleted: number;
  resumesUploaded: number;
  uniqueUsers: number;
}

export interface WeeklyEngagement {
  week: string;
  testsCompleted: number;
  resumesUploaded: number;
  uniqueUsers: number;
}

// Form Types
export interface StudentFormData {
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  batch: string;
  year: number;
  cgpa: number;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface CompanyFormData {
  name: string;
  website?: string;
  industry: string;
  type: 'dream' | 'mass_recruiter' | 'core' | 'startup';
  tier: 'tier1' | 'tier2' | 'tier3';
}

export interface JobFormData {
  title: string;
  description: string;
  requirements: string[];
  ctc: number;
  location: string;
  jobType: 'full_time' | 'internship' | 'contract';
  eligibilityDepartments: string[];
  minCGPA: number;
  deadline: Date;
}

// Filter Types
export interface StudentFilters {
  department?: string;
  batch?: string;
  year?: number;
  placementStatus?: 'placed' | 'unplaced' | 'intern';
  prepCVStatus?: 'completed' | 'pending';
  cgpaRange?: [number, number];
}

export interface CompanyFilters {
  type?: 'dream' | 'mass_recruiter' | 'core' | 'startup';
  tier?: 'tier1' | 'tier2' | 'tier3';
  industry?: string;
  isActive?: boolean;
}

export interface JobFilters {
  companyId?: string;
  status?: 'active' | 'closed' | 'cancelled';
  jobType?: 'full_time' | 'internship' | 'contract';
  department?: string;
  ctcRange?: [number, number];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Constants
export const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'MBA',
  'MCA'
] as const;

export const BATCH_YEARS = [
  '2020-2024',
  '2021-2025',
  '2022-2026',
  '2023-2027',
  '2024-2028'
] as const;

export const JOB_TYPES = [
  { value: 'full_time', label: 'Full Time' },
  { value: 'internship', label: 'Internship' },
  { value: 'contract', label: 'Contract' }
] as const;

export const COMPANY_TYPES = [
  { value: 'dream', label: 'Dream Company' },
  { value: 'mass_recruiter', label: 'Mass Recruiter' },
  { value: 'core', label: 'Core Company' },
  { value: 'startup', label: 'Startup' }
] as const;

export const COMPANY_TIERS = [
  { value: 'tier1', label: 'Tier 1' },
  { value: 'tier2', label: 'Tier 2' },
  { value: 'tier3', label: 'Tier 3' }
] as const;
