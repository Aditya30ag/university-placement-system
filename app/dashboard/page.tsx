'use client';
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatsGrid } from '@/components/layout/StatsGrid';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Users, 
  Building2, 
  Target, 
  AlertTriangle,
  Download,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { NeedsAttentionSection } from '@/components/dashboard/NeedsAttentionSection';
import { UpcomingDeadlines } from '@/components/dashboard/UpcomingDeadlines';
import { TopRecruiters } from '@/components/dashboard/TopRecruiters';
import type { DashboardStats } from '@/types';

// Mock data - replace with actual API calls
const mockDashboardData: DashboardStats = {
  totalStudents: 1250,
  placedStudents: 892,
  placedPercentage: 71.4,
  activeJobs: 45,
  activeCompanies: 28,
  departmentWiseStats: [
    { department: 'Computer Science', totalStudents: 180, placedStudents: 145, placedPercentage: 80.6, avgCTC: 850000, prepCVCompletion: 95 },
    { department: 'Information Technology', totalStudents: 160, placedStudents: 128, placedPercentage: 80.0, avgCTC: 780000, prepCVCompletion: 92 },
    { department: 'Electronics & Communication', totalStudents: 140, placedStudents: 98, placedPercentage: 70.0, avgCTC: 720000, prepCVCompletion: 88 },
    { department: 'Mechanical Engineering', totalStudents: 150, placedStudents: 105, placedPercentage: 70.0, avgCTC: 650000, prepCVCompletion: 82 },
    { department: 'Civil Engineering', totalStudents: 120, placedStudents: 72, placedPercentage: 60.0, avgCTC: 580000, prepCVCompletion: 75 }
  ],
  monthlyPlacementTrend: [
    { month: 'Jan', placed: 45, intern: 12, unplaced: 143 },
    { month: 'Feb', placed: 89, intern: 25, unplaced: 186 },
    { month: 'Mar', placed: 156, intern: 38, unplaced: 206 },
    { month: 'Apr', placed: 234, intern: 45, unplaced: 221 },
    { month: 'May', placed: 342, intern: 62, unplaced: 246 },
    { month: 'Jun', placed: 456, intern: 78, unplaced: 216 },
    { month: 'Jul', placed: 589, intern: 95, unplaced: 166 },
    { month: 'Aug', placed: 698, intern: 108, unplaced: 144 },
    { month: 'Sep', placed: 785, intern: 119, unplaced: 146 },
    { month: 'Oct', placed: 832, intern: 125, unplaced: 193 },
    { month: 'Nov', placed: 867, intern: 131, unplaced: 252 },
    { month: 'Dec', placed: 892, intern: 138, unplaced: 220 }
  ],
  topRecruiters: [
    { companyName: 'TCS', studentsHired: 85, avgCTC: 450000 },
    { companyName: 'Infosys', studentsHired: 67, avgCTC: 520000 },
    { companyName: 'Microsoft', studentsHired: 12, avgCTC: 1800000 },
    { companyName: 'Amazon', studentsHired: 18, avgCTC: 1650000 },
    { companyName: 'Wipro', studentsHired: 45, avgCTC: 480000 }
  ],
  upcomingDeadlines: [
    { jobTitle: 'Software Engineer', companyName: 'Google', deadline: new Date('2024-12-15'), appliedCount: 156 },
    { jobTitle: 'Data Analyst', companyName: 'Flipkart', deadline: new Date('2024-12-18'), appliedCount: 89 },
    { jobTitle: 'Product Manager', companyName: 'Zomato', deadline: new Date('2024-12-20'), appliedCount: 67 },
    { jobTitle: 'DevOps Engineer', companyName: 'PayTM', deadline: new Date('2024-12-22'), appliedCount: 34 }
  ]
};

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardStats>(mockDashboardData);
  const [isLoading, setIsLoading] = useState(false);

  const user = {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@university.edu',
    role: 'super_admin',
  };

  const handleExport = async () => {
    setIsLoading(true);
    try {
      // Implement PDF/Excel export logic
      console.log('Exporting dashboard data...');
      
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Dashboard exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const statsData = [
    {
      title: 'Total Students',
      value: dashboardData.totalStudents,
      icon: Users,
      color: 'blue' as const,
      change: { value: 3.2, type: 'increase' as const }
    },
    {
      title: 'Students Placed',
      value: dashboardData.placedStudents,
      icon: Target,
      color: 'green' as const,
      change: { value: 8.1, type: 'increase' as const }
    },
    {
      title: 'Placement Rate',
      value: dashboardData.placedPercentage,
      format: 'percentage' as const,
      icon: TrendingUp,
      color: 'green' as const,
      change: { value: 5.4, type: 'increase' as const }
    },
    {
      title: 'Active Companies',
      value: dashboardData.activeCompanies,
      icon: Building2,
      color: 'purple' as const,
      change: { value: 12.3, type: 'increase' as const }
    }
  ];

  return (
    <MainLayout user={user} onExport={handleExport}>
      <div className="space-y-6">
        {/* Stats Grid */}
        <StatsGrid stats={statsData} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCharts
            monthlyTrend={dashboardData.monthlyPlacementTrend}
            departmentStats={dashboardData.departmentWiseStats}
          />
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <NeedsAttentionSection
            departmentStats={dashboardData.departmentWiseStats}
          />
          
          <UpcomingDeadlines
            deadlines={dashboardData.upcomingDeadlines}
          />
          
          <TopRecruiters
            recruiters={dashboardData.topRecruiters}
          />
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="justify-start"
              icon={Download}
              isLoading={isLoading}
            >
              Export All Data
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              icon={Users}
            >
              Add Students
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              icon={Building2}
            >
              Add Company
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              icon={Calendar}
            >
              Schedule Report
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

