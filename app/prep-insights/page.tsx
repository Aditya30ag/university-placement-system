'use client';
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatsGrid } from '@/components/layout/StatsGrid';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import {
  TrendingUp,
  Users,
  FileText,
  Award,
  Download,
  Filter,
  Calendar
} from 'lucide-react';
import { PrepCVCharts } from '@/components/prep-insights/PrepCVCharts';
import { DepartmentCompletion } from '@/components/prep-insights/DepartmentCompletion';
import { EngagementTrends } from '@/components/prep-insights/EngagementTrends';
import { ComplianceReport } from '@/components/prep-insights/ComplianceReport';
import type { PrepCVInsight } from '@/types';
import { DEPARTMENTS, BATCH_YEARS } from '@/types';

// Mock data - replace with actual API calls
const mockPrepCVData: PrepCVInsight = {
  totalStudents: 1250,
  testsCompleted: 987,
  testsCompletedPercentage: 78.9,
  resumesUploaded: 1156,
  resumesUploadedPercentage: 92.5,
  avgScore: 82.4,
  departmentWiseCompletion: [
    {
      department: 'Computer Science',
      testsCompleted: 145,
      resumesUploaded: 172,
      totalStudents: 180,
      completionPercentage: 95.6
    },
    {
      department: 'Information Technology', 
      testsCompleted: 128,
      resumesUploaded: 155,
      totalStudents: 160,
      completionPercentage: 93.1
    },
    {
      department: 'Electronics & Communication',
      testsCompleted: 98,
      resumesUploaded: 125,
      totalStudents: 140,
      completionPercentage: 89.3
    },
    {
      department: 'Mechanical Engineering',
      testsCompleted: 89,
      resumesUploaded: 132,
      totalStudents: 150,
      completionPercentage: 88.0
    },
    {
      department: 'Civil Engineering',
      testsCompleted: 67,
      resumesUploaded: 89,
      totalStudents: 120,
      completionPercentage: 74.2
    }
  ],
  dailyEngagement: [
    { date: '2024-11-01', testsCompleted: 23, resumesUploaded: 34, uniqueUsers: 45 },
    { date: '2024-11-02', testsCompleted: 31, resumesUploaded: 28, uniqueUsers: 52 },
    { date: '2024-11-03', testsCompleted: 18, resumesUploaded: 41, uniqueUsers: 38 },
    { date: '2024-11-04', testsCompleted: 45, resumesUploaded: 33, uniqueUsers: 67 },
    { date: '2024-11-05', testsCompleted: 28, resumesUploaded: 39, uniqueUsers: 51 },
    { date: '2024-11-06', testsCompleted: 37, resumesUploaded: 25, uniqueUsers: 49 },
    { date: '2024-11-07', testsCompleted: 42, resumesUploaded: 47, uniqueUsers: 71 }
  ],
  weeklyEngagement: [
    { week: 'Week 1', testsCompleted: 156, resumesUploaded: 234, uniqueUsers: 289 },
    { week: 'Week 2', testsCompleted: 198, resumesUploaded: 267, uniqueUsers: 324 },
    { week: 'Week 3', testsCompleted: 234, resumesUploaded: 198, uniqueUsers: 356 },
    { week: 'Week 4', testsCompleted: 287, resumesUploaded: 312, uniqueUsers: 398 }
  ]
};

const PrepInsightsPage: React.FC = () => {
  const [insightData, setInsightData] = useState<PrepCVInsight>(mockPrepCVData);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  const user = {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@university.edu',
    role: 'super_admin',
  };

  const handleExport = async () => {
    setIsLoading(true);
    try {
      // Implement export logic for PrepCV compliance report
      console.log('Exporting PrepCV insights...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('PrepCV insights exported successfully!');
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
      value: insightData.totalStudents,
      icon: Users,
      color: 'blue' as const,
      change: { value: 2.1, type: 'increase' as const }
    },
    {
      title: 'Tests Completed',
      value: insightData.testsCompletedPercentage,
      format: 'percentage' as const,
      icon: Award,
      color: 'green' as const,
      change: { value: 5.4, type: 'increase' as const }
    },
    {
      title: 'Resumes Uploaded',
      value: insightData.resumesUploadedPercentage,
      format: 'percentage' as const,
      icon: FileText,
      color: 'purple' as const,
      change: { value: 3.2, type: 'increase' as const }
    },
    {
      title: 'Average Score',
      value: insightData.avgScore.toFixed(1),
      icon: TrendingUp,
      color: 'yellow' as const,
      change: { value: 1.8, type: 'increase' as const }
    }
  ];

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    ...DEPARTMENTS.map(dept => ({ value: dept, label: dept }))
  ];

  const batchOptions = [
    { value: '', label: 'All Batches' },
    ...BATCH_YEARS.map(batch => ({ value: batch, label: batch }))
  ];

  const pageActions = [
    {
      label: 'Export Report',
      onClick: handleExport,
      icon: Download,
      variant: 'primary' as const
    }
  ];

  return (
    <MainLayout user={user} onExport={handleExport}>
      <PageHeader
        title="PrepCV Insights"
        subtitle="Track student engagement and readiness metrics"
        actions={pageActions}
      >
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
            <Select
              label="Department"
              options={departmentOptions}
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            />
            
            <Select
              label="Batch"
              options={batchOptions}
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            />
            
            <Select
              label="Time Period"
              options={[
                { value: '7d', label: 'Last 7 days' },
                { value: '30d', label: 'Last 30 days' },
                { value: '90d', label: 'Last 90 days' }
              ]}
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
            />
          </div>
        </div>
      </PageHeader>

      <div className="space-y-6">
        {/* Stats Grid */}
        <StatsGrid stats={statsData} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PrepCVCharts
            testsCompleted={insightData.testsCompleted}
            resumesUploaded={insightData.resumesUploaded}
            totalStudents={insightData.totalStudents}
            avgScore={insightData.avgScore}
          />
          
          <EngagementTrends
            dailyEngagement={insightData.dailyEngagement}
            weeklyEngagement={insightData.weeklyEngagement}
            timeRange={dateRange}
          />
        </div>

        {/* Department Completion & Compliance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DepartmentCompletion
            departmentData={insightData.departmentWiseCompletion}
            selectedDepartment={selectedDepartment}
          />
          
          <ComplianceReport
            departmentData={insightData.departmentWiseCompletion}
            complianceThreshold={80}
          />
        </div>

        {/* Detailed Insights */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">✅ Strong Performance</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Computer Science: 95.6% completion rate</li>
                  <li>• Information Technology: 93.1% completion rate</li>
                  <li>• Overall resume upload rate: 92.5%</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">📈 Positive Trends</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Test completion up 5.4% this month</li>
                  <li>• Average score improved to 82.4</li>
                  <li>• Daily engagement consistently strong</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">⚠️ Needs Attention</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Civil Engineering: Only 74.2% completion</li>
                  <li>• Test completion rate: 78.9% (target: 85%)</li>
                  <li>• Weekend engagement is low</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">💡 Recommendations</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Focus on Civil Engineering outreach</li>
                  <li>• Implement peer mentoring programs</li>
                  <li>• Schedule weekend study sessions</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PrepInsightsPage;
