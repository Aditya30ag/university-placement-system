'use client';
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import {
  Plus,
  Upload,
  Download,
  Filter,
  Target,
  Users,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { JobPipeline } from '@/components/job-tracker/JobPipeline';
import { JobForm } from '@/components/job-tracker/JobForm';
import { BulkJobUpload } from '@/components/job-tracker/BulkJobUpload';
import { JobStats } from '@/components/job-tracker/JobStats';
import type { Job, JobFilters } from '@/types';

// Mock data
const mockJobs: Job[] = [
  {
    id: '1',
    companyId: '1',
    title: 'Software Engineer',
    description: 'Full-stack development role',
    requirements: ['React', 'Node.js', 'MongoDB'],
    ctc: 1200000,
    location: 'Bangalore',
    jobType: 'full_time',
    eligibilityDepartments: ['Computer Science', 'Information Technology'],
    minCGPA: 7.0,
    deadline: new Date('2024-12-31'),
    status: 'active',
    rounds: [
      {
        id: '1',
        jobId: '1',
        name: 'Aptitude Test',
        type: 'aptitude',
        date: new Date('2024-12-01'),
        order: 1,
        students: []
      },
      {
        id: '2',
        jobId: '1',
        name: 'Technical Interview',
        type: 'technical',
        date: new Date('2024-12-10'),
        order: 2,
        students: []
      },
      {
        id: '3',
        jobId: '1',
        name: 'HR Interview',
        type: 'hr',
        date: new Date('2024-12-15'),
        order: 3,
        students: []
      }
    ],
    createdAt: new Date('2024-11-01')
  }
];

const JobTrackerPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<JobFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | undefined>();

  const user = {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@university.edu',
    role: 'super_admin',
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, jobs]);

  const applyFilters = () => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(job => job.status === filters.status);
    }

    if (filters.jobType) {
      filtered = filtered.filter(job => job.jobType === filters.jobType);
    }

    if (filters.department) {
      filtered = filtered.filter(job => 
        job.eligibilityDepartments.includes(filters.department!)
      );
    }

    if (filters.ctcRange) {
      const [min, max] = filters.ctcRange;
      filtered = filtered.filter(job => job.ctc >= min && job.ctc <= max);
    }

    setFilteredJobs(filtered);
  };

  const handleAddJob = (jobData: any) => {
    const newJob: Job = {
      id: Date.now().toString(),
      ...jobData,
      status: 'active',
      rounds: [],
      createdAt: new Date()
    };
    setJobs([...jobs, newJob]);
    setShowJobForm(false);
  };

  const handleEditJob = (jobData: any) => {
    if (!selectedJob) return;
    
    const updatedJobs = jobs.map(job =>
      job.id === selectedJob.id
        ? { ...job, ...jobData }
        : job
    );
    setJobs(updatedJobs);
    setShowJobForm(false);
    setSelectedJob(undefined);
  };

  const handleBulkUpload = (uploadedJobs: Job[]) => {
    setJobs([...jobs, ...uploadedJobs]);
    setShowBulkUpload(false);
  };

  const pageActions = [
    {
      label: 'Add Job',
      onClick: () => {
        setSelectedJob(undefined);
        setShowJobForm(true);
      },
      icon: Plus,
      variant: 'primary' as const
    },
    {
      label: 'Bulk Upload',
      onClick: () => setShowBulkUpload(true),
      icon: Upload,
      variant: 'outline' as const
    },
    {
      label: 'Export',
      onClick: () => {
        console.log('Exporting job data...');
      },
      icon: Download,
      variant: 'outline' as const
    }
  ];

  return (
    <MainLayout user={user}>
      <PageHeader
        title="Job Tracker"
        subtitle={`${filteredJobs.length} jobs • ${filteredJobs.filter(j => j.status === 'active').length} active`}
        actions={pageActions}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search jobs by title or location..."
              value={searchTerm}
              onChange={setSearchTerm}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              icon={Filter}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4">
            <Card className="p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select
                  label="Status"
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'closed', label: 'Closed' },
                    { value: 'cancelled', label: 'Cancelled' }
                  ]}
                  value={filters.status || ''}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
                />
                
                <Select
                  label="Job Type"
                  options={[
                    { value: 'full_time', label: 'Full Time' },
                    { value: 'internship', label: 'Internship' },
                    { value: 'contract', label: 'Contract' }
                  ]}
                  value={filters.jobType || ''}
                  onChange={(e) => setFilters({ ...filters, jobType: e.target.value as any })}
                />
                
                <Select
                  label="Department"
                  options={[
                    { value: 'Computer Science', label: 'Computer Science' },
                    { value: 'Information Technology', label: 'Information Technology' },
                    { value: 'Electronics & Communication', label: 'Electronics & Communication' },
                    { value: 'Mechanical Engineering', label: 'Mechanical Engineering' }
                  ]}
                  value={filters.department || ''}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                />

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => setFilters({})}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </PageHeader>

      <div className="space-y-6">
        {/* Job Stats */}
        <JobStats jobs={filteredJobs} />

        {/* Job Pipeline */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <JobPipeline
              key={job.id}
              job={job}
              onEdit={() => {
                setSelectedJob(job);
                setShowJobForm(true);
              }}
              onViewDetails={() => {
                window.location.href = `/job-tracker/${job.id}`;
              }}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="p-12 text-center">
            <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || Object.keys(filters).length > 0
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first job posting'}
            </p>
            <Button onClick={() => setShowJobForm(true)} icon={Plus}>
              Add Job
            </Button>
          </Card>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={showJobForm}
        onClose={() => {
          setShowJobForm(false);
          setSelectedJob(undefined);
        }}
        title={selectedJob ? 'Edit Job' : 'Add Job'}
        size="xl"
      >
        <JobForm
          job={selectedJob}
          onSubmit={selectedJob ? handleEditJob : handleAddJob}
          onCancel={() => {
            setShowJobForm(false);
            setSelectedJob(undefined);
          }}
        />
      </Modal>

      <Modal
        isOpen={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
        title="Bulk Upload Jobs"
        size="lg"
      >
        <BulkJobUpload
          onUpload={handleBulkUpload}
          onCancel={() => setShowBulkUpload(false)}
        />
      </Modal>
    </MainLayout>
  );
};

export default JobTrackerPage;

