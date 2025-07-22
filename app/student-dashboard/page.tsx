'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  User,
  FileText,
  Target,
  Calendar,
  Award,
  ExternalLink,
  Download,
  Edit,
  TrendingUp
} from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import type { Student } from '@/types';

// This would be replaced with actual authentication
const mockStudent: Student = {
  id: 'student_001',
  rollNumber: 'CS2020001',
  name: 'John Doe',
  email: 'john.doe@student.edu',
  phone: '9876543210',
  department: 'Computer Science',
  batch: '2020-2024',
  year: 2024,
  cgpa: 8.5,
  placementStatus: 'placed',
  resumeUrl: '/resumes/john_doe.pdf',
  linkedinUrl: 'https://linkedin.com/in/johndoe',
  githubUrl: 'https://github.com/johndoe',
  prepCVScore: 92,
  prepCVCompleted: true,
  testCompleted: true,
  lastUpdated: new Date('2024-11-15'),
  updatedBy: 'student',
  jobApplications: [
    {
      id: '1',
      studentId: 'student_001',
      jobId: 'job_001',
      appliedAt: new Date('2024-10-15'),
      status: 'selected',
      currentRound: 'final',
      roundResults: [
        { roundId: 'r1', status: 'selected', score: 85, date: new Date('2024-10-20') },
        { roundId: 'r2', status: 'selected', score: 90, date: new Date('2024-10-25') },
        { roundId: 'r3', status: 'selected', date: new Date('2024-11-01') }
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

const StudentDashboard: React.FC = () => {
  const [student, setStudent] = useState<Student>(mockStudent);
  const [isLoading, setIsLoading] = useState(false);

  // Simple layout for students (no complex navigation)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img
                src="/logo.png"
                alt="University Logo"
                className="h-8 w-8"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Student Placement Dashboard
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {student.name}
                </div>
                <div className="text-xs text-gray-500">
                  {student.rollNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Welcome Section */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {student.name.split(' ')[0]}!
                </h2>
                <p className="text-gray-600">
                  Track your placement journey and stay updated with your progress.
                </p>
              </div>
              <div className="text-right">
                <StatusBadge status={student.placementStatus} className="text-lg" />
                {student.placementStatus === 'placed' && student.jobApplications[0]?.offerDetails && (
                  <div className="mt-2 text-lg font-semibold text-green-600">
                    {formatCurrency(student.jobApplications[0].offerDetails.ctc)}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {student.prepCVScore}
              </div>
              <div className="text-sm text-gray-500">PrepCV Score</div>
            </Card>

            <Card className="p-6 text-center">
              <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {student.jobApplications.length}
              </div>
              <div className="text-sm text-gray-500">Job Applications</div>
            </Card>

            <Card className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {student.cgpa.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">CGPA</div>
            </Card>

            <Card className="p-6 text-center">
              <FileText className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {student.resumeUrl ? 'Yes' : 'No'}
              </div>
              <div className="text-sm text-gray-500">Resume Uploaded</div>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Section */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                <Button variant="ghost" size="sm" icon={Edit}>
                  Edit
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department</label>
                    <p className="text-sm text-gray-900">{student.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Batch</label>
                    <p className="text-sm text-gray-900">{student.batch}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm text-gray-900">{student.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-sm text-gray-900">{student.phone}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <label className="text-sm font-medium text-gray-500">Social Links</label>
                  <div className="flex space-x-4 mt-2">
                    {student.linkedinUrl && (
                      <a
                        href={student.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        LinkedIn
                      </a>
                    )}
                    {student.githubUrl && (
                      <a
                        href={student.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-gray-900"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* PrepCV Status */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">PrepCV Readiness</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Score</span>
                    <span className="text-lg font-bold text-blue-600">
                      {student.prepCVScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-500 h-3 rounded-full"
                      style={{ width: `${student.prepCVScore}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant={student.testCompleted ? 'success' : 'error'}>
                      {student.testCompleted ? '✓' : '✗'}
                    </Badge>
                    <span className="text-sm">Test Completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={student.resumeUrl ? 'success' : 'error'}>
                      {student.resumeUrl ? '✓' : '✗'}
                    </Badge>
                    <span className="text-sm">Resume Uploaded</span>
                  </div>
                </div>

                {student.resumeUrl && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(student.resumeUrl, '_blank')}
                    icon={Download}
                  >
                    Download Resume
                  </Button>
                )}
              </div>
            </Card>

            {/* Job Applications */}
            <Card className="p-6 lg:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Job Applications</h3>
              
              {student.jobApplications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No job applications yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {student.jobApplications.map((application) => (
                    <div
                      key={application.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Software Engineer Position
                          </h4>
                          <p className="text-sm text-gray-500">
                            Applied on {formatDate(application.appliedAt)}
                          </p>
                        </div>
                        <StatusBadge status={application.status} />
                      </div>

                      {application.roundResults.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Progress:</p>
                          <div className="flex space-x-4">
                            {application.roundResults.map((result, index) => (
                              <div key={index} className="flex items-center space-x-1">
                                <Badge
                                  variant={
                                    result.status === 'selected' ? 'success' :
                                    result.status === 'rejected' ? 'error' : 'warning'
                                  }
                                  size="sm"
                                >
                                  Round {index + 1}
                                </Badge>
                                {result.score && (
                                  <span className="text-xs text-gray-500">
                                    ({result.score})
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {application.offerDetails && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                          <p className="text-sm font-medium text-green-900 mb-2">
                            🎉 Congratulations! You've been selected!
                          </p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-green-700">Package:</span>
                              <div className="font-medium">
                                {formatCurrency(application.offerDetails.ctc)}
                              </div>
                            </div>
                            <div>
                              <span className="text-green-700">Join Date:</span>
                              <div className="font-medium">
                                {formatDate(application.offerDetails.joinDate)}
                              </div>
                            </div>
                            <div>
                              <span className="text-green-700">Location:</span>
                              <div className="font-medium">
                                {application.offerDetails.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
