'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  FileText,
  ExternalLink,
  Edit,
  Download,
  TrendingUp,
  Clock
} from 'lucide-react';
import { StudentTimeline } from '@/components/students/StudentTimeline';
import { StudentForm } from '@/components/students/StudentForm';
import { formatDate, formatCurrency } from '@/lib/utils';
import type { Student, JobApplication } from '@/types';

// Mock data - replace with actual API call
const mockStudent: Student = {
  id: '1',
  rollNumber: 'CS2020001',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@student.edu',
  phone: '9876543210',
  department: 'Computer Science',
  batch: '2020-2024',
  year: 2024,
  cgpa: 8.5,
  placementStatus: 'placed',
  resumeUrl: '/resumes/arjun_sharma.pdf',
  linkedinUrl: 'https://linkedin.com/in/arjun-sharma',
  githubUrl: 'https://github.com/arjunsharma',
  prepCVScore: 92,
  prepCVCompleted: true,
  testCompleted: true,
  lastUpdated: new Date('2024-11-15'),
  updatedBy: 'admin',
  jobApplications: [
    {
      id: '1',
      studentId: '1',
      jobId: '1',
      appliedAt: new Date('2024-10-01'),
      currentRound: 'hr',
      status: 'selected',
      roundResults: [
        { roundId: '1', status: 'selected', score: 85, date: new Date('2024-10-05') },
        { roundId: '2', status: 'selected', score: 90, date: new Date('2024-10-12') },
        { roundId: '3', status: 'selected', date: new Date('2024-10-20') }
      ],
      finalResult: 'selected',
      offerDetails: {
        ctc: 1200000,
        joinDate: new Date('2024-07-01'),
        location: 'Bangalore'
      }
    }
  ]
};

const StudentDetailPage: React.FC = () => {
  const params = useParams();
  const studentId = params.id as string;
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);

  const user = {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@university.edu',
    role: 'super_admin',
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudent(mockStudent);
      setIsLoading(false);
    }, 1000);
  }, [studentId]);

  const handleEditStudent = (studentData: any) => {
    if (!student) return;
    
    const updatedStudent = {
      ...student,
      ...studentData,
      lastUpdated: new Date(),
      updatedBy: user.name
    };
    setStudent(updatedStudent);
    setShowEditForm(false);
  };

  const handleDownloadResume = () => {
    if (student?.resumeUrl) {
      window.open(student.resumeUrl, '_blank');
    }
  };

  if (isLoading) {
    return (
      <MainLayout user={user}>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-6">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!student) {
    return (
      <MainLayout user={user}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Student Not Found</h2>
          <p className="text-gray-500 mt-2">The requested student could not be found.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout user={user}>
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: 'Students', href: '/students' },
            { label: student.name }
          ]}
        />

        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                <p className="text-gray-500">{student.rollNumber}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <StatusBadge status={student.placementStatus} />
                  <Badge variant={student.prepCVCompleted ? 'success' : 'warning'}>
                    PrepCV: {student.prepCVScore}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {student.resumeUrl && (
                <Button
                  variant="outline"
                  onClick={handleDownloadResume}
                  icon={Download}
                >
                  Resume
                </Button>
              )}
              <Button
                variant="primary"
                onClick={() => setShowEditForm(true)}
                icon={Edit}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm font-medium">{student.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-sm font-medium">{student.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="text-sm font-medium">{student.department}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Batch</p>
                      <p className="text-sm font-medium">{student.batch}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">CGPA</p>
                      <p className="text-sm font-medium">{student.cgpa.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">PrepCV Score</p>
                      <p className="text-sm font-medium">{student.prepCVScore}/100</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              {(student.linkedinUrl || student.githubUrl) && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Social Links</h3>
                  <div className="flex space-x-4">
                    {student.linkedinUrl && (
                      <a
                        href={student.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        LinkedIn
                      </a>
                    )}
                    {student.githubUrl && (
                      <a
                        href={student.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-gray-700 hover:text-gray-900"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}
            </Card>

            {/* Job Application Timeline */}
            <Card className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Placement Timeline</h2>
              <StudentTimeline applications={student.jobApplications} />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Applications</span>
                  <span className="text-sm font-medium">{student.jobApplications.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Offers</span>
                  <span className="text-sm font-medium">
                    {student.jobApplications.filter(app => app.finalResult === 'selected').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Test Status</span>
                  <Badge variant={student.testCompleted ? 'success' : 'error'}>
                    {student.testCompleted ? 'Completed' : 'Pending'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Resume</span>
                  <Badge variant={student.resumeUrl ? 'success' : 'error'}>
                    {student.resumeUrl ? 'Uploaded' : 'Missing'}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Placement Details */}
            {student.placementStatus === 'placed' && student.jobApplications[0]?.offerDetails && (
              <Card className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Placement Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Package</p>
                    <p className="text-lg font-medium text-green-600">
                      {formatCurrency(student.jobApplications[0].offerDetails.ctc)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p className="text-sm font-medium">
                      {formatDate(student.jobApplications[0].offerDetails.joinDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-sm font-medium">
                      {student.jobApplications[0].offerDetails.location}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Last Updated */}
            <Card className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-sm font-medium">{formatDate(student.lastUpdated)}</p>
                  <p className="text-xs text-gray-400">by {student.updatedBy}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        title="Edit Student Profile"
        size="lg"
      >
        <StudentForm
          student={student}
          onSubmit={handleEditStudent}
          onCancel={() => setShowEditForm(false)}
        />
      </Modal>
    </MainLayout>
  );
};

export default StudentDetailPage;
