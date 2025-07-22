'use client';
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import {
  Plus,
  Download,
  Filter,
  FileText,
  Calendar,
  Share2,
  Clock,
  Eye,
  Trash2
} from 'lucide-react';
import { ReportGenerator } from '@/components/reports/ReportGenerator';
import { ReportScheduler } from '@/components/reports/ReportScheduler';
import { ReportsTable } from '@/components/reports/ReportsTable';
import { ShareableLink } from '@/components/reports/ShareableLink';
import type { Report } from '@/types';
import { formatDate, formatDateTime } from '@/lib/utils';

// Mock data - replace with actual API calls
const mockReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Placement Summary - November 2024',
    type: 'placement_summary',
    generatedAt: new Date('2024-11-15T10:30:00'),
    generatedBy: 'Dr. Rajesh Kumar',
    format: 'pdf',
    url: '/reports/placement_summary_nov_2024.pdf',
    shareableToken: 'abc123def456',
    expiresAt: new Date('2024-12-15T10:30:00'),
    filters: {
      month: 'November 2024',
      departments: ['All'],
      includeCharts: true
    }
  },
  {
    id: '2',
    name: 'NAAC Compliance Report',
    type: 'compliance',
    generatedAt: new Date('2024-11-10T14:15:00'),
    generatedBy: 'Admin System',
    format: 'xlsx',
    url: '/reports/naac_compliance_2024.xlsx',
    shareableToken: 'xyz789abc123',
    expiresAt: new Date('2025-01-10T14:15:00'),
    filters: {
      academicYear: '2023-2024',
      reportType: 'NAAC',
      includeStudentDetails: true
    }
  },
  {
    id: '3',
    name: 'Company Engagement Report',
    type: 'company_report',
    generatedAt: new Date('2024-11-08T09:45:00'),
    generatedBy: 'Placement Officer',
    format: 'pdf',
    url: '/reports/company_engagement_2024.pdf',
    filters: {
      quarter: 'Q3 2024',
      includeContactDetails: true
    }
  },
  {
    id: '4',
    name: 'Student Progress Report - CS Department',
    type: 'student_report',
    generatedAt: new Date('2024-11-05T16:20:00'),
    generatedBy: 'Dept Admin',
    format: 'xlsx',
    url: '/reports/cs_student_progress.xlsx',
    filters: {
      department: 'Computer Science',
      batch: '2020-2024',
      includeScores: true
    }
  }
];

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [filteredReports, setFilteredReports] = useState<Report[]>(mockReports);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterFormat, setFilterFormat] = useState<string>('');
  const [showGenerator, setShowGenerator] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const user = {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@university.edu',
    role: 'super_admin',
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterType, filterFormat, reports]);

  const applyFilters = () => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter(report => report.type === filterType);
    }

    if (filterFormat) {
      filtered = filtered.filter(report => report.format === filterFormat);
    }

    // Sort by generation date (newest first)
    filtered.sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime());

    setFilteredReports(filtered);
  };

  const handleGenerateReport = async (reportData: any) => {
    setIsLoading(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newReport: Report = {
        id: Date.now().toString(),
        name: reportData.name,
        type: reportData.type,
        generatedAt: new Date(),
        generatedBy: user.name,
        format: reportData.format,
        url: `/reports/${reportData.name.toLowerCase().replace(/\s+/g, '_')}.${reportData.format}`,
        filters: reportData.filters
      };

      setReports([newReport, ...reports]);
      setShowGenerator(false);
      alert('Report generated successfully!');
    } catch (error) {
      console.error('Report generation error:', error);
      alert('Report generation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleReport = async (scheduleData: any) => {
    setIsLoading(true);
    try {
      // Simulate scheduling
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Report scheduled:', scheduleData);
      setShowScheduler(false);
      alert('Report scheduled successfully!');
    } catch (error) {
      console.error('Scheduling error:', error);
      alert('Scheduling failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = (report: Report) => {
    if (report.url) {
      // In a real app, this would download the actual file
      window.open(report.url, '_blank');
    } else {
      alert('Report file not available');
    }
  };

  const handleShareReport = (report: Report) => {
    setSelectedReport(report);
    setShowShareModal(true);
  };

  const handleDeleteReport = async (reportId: string) => {
    if (confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(report => report.id !== reportId));
    }
  };

  const pageActions = [
    {
      label: 'Generate Report',
      onClick: () => setShowGenerator(true),
      icon: Plus,
      variant: 'primary' as const
    },
    {
      label: 'Schedule Report',
      onClick: () => setShowScheduler(true),
      icon: Calendar,
      variant: 'outline' as const
    }
  ];

  const reportTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'compliance', label: 'Compliance Report' },
    { value: 'placement_summary', label: 'Placement Summary' },
    { value: 'company_report', label: 'Company Report' },
    { value: 'student_report', label: 'Student Report' }
  ];

  const formatOptions = [
    { value: '', label: 'All Formats' },
    { value: 'pdf', label: 'PDF' },
    { value: 'xlsx', label: 'Excel' }
  ];

  return (
    <MainLayout user={user}>
      <PageHeader
        title="Reports"
        subtitle={`${filteredReports.length} reports available`}
        actions={pageActions}
      >
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search reports by name or creator..."
              value={searchTerm}
              onChange={setSearchTerm}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Select
              options={reportTypeOptions}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-48"
            />
            <Select
              options={formatOptions}
              value={filterFormat}
              onChange={(e) => setFilterFormat(e.target.value)}
              className="w-32"
            />
          </div>
        </div>
      </PageHeader>

      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">{reports.length}</div>
                <div className="text-sm text-gray-500">Total Reports</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => {
                    const today = new Date();
                    const reportDate = new Date(r.generatedAt);
                    return reportDate.toDateString() === today.toDateString();
                  }).length}
                </div>
                <div className="text-sm text-gray-500">Today</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Share2 className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.shareableToken).length}
                </div>
                <div className="text-sm text-gray-500">Shared</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.expiresAt && new Date(r.expiresAt) > new Date()).length}
                </div>
                <div className="text-sm text-gray-500">Active Links</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Reports Table */}
        <Card>
          <ReportsTable
            reports={filteredReports}
            onDownload={handleDownloadReport}
            onShare={handleShareReport}
            onDelete={handleDeleteReport}
            isLoading={isLoading}
          />
        </Card>

        {filteredReports.length === 0 && !isLoading && (
          <Card className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterType || filterFormat
                ? 'Try adjusting your search or filters'
                : 'Get started by generating your first report'}
            </p>
            <Button onClick={() => setShowGenerator(true)} icon={Plus}>
              Generate Report
            </Button>
          </Card>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={showGenerator}
        onClose={() => setShowGenerator(false)}
        title="Generate New Report"
        size="xl"
      >
        <ReportGenerator
          onGenerate={handleGenerateReport}
          onCancel={() => setShowGenerator(false)}
          isLoading={isLoading}
        />
      </Modal>

      <Modal
        isOpen={showScheduler}
        onClose={() => setShowScheduler(false)}
        title="Schedule Report"
        size="lg"
      >
        <ReportScheduler
          onSchedule={handleScheduleReport}
          onCancel={() => setShowScheduler(false)}
          isLoading={isLoading}
        />
      </Modal>

      <Modal
        isOpen={showShareModal}
        onClose={() => {
          setShowShareModal(false);
          setSelectedReport(null);
        }}
        title="Share Report"
        size="md"
      >
        {selectedReport && (
          <ShareableLink
            report={selectedReport}
            onClose={() => {
              setShowShareModal(false);
              setSelectedReport(null);
            }}
          />
        )}
      </Modal>
    </MainLayout>
  );
};

export default ReportsPage;

