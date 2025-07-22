'use client';
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { Table } from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import { Modal } from '@/components/ui/Modal';
import { 
  Plus, 
  Upload, 
  Download, 
  Filter,
  Edit,
  Eye,
  AlertCircle
} from 'lucide-react';
import { StudentsTable } from '@/components/students/StudentsTable';
import { StudentForm } from '@/components/students/StudentForm';
import { StudentFilters } from '@/components/students/StudentFilters';
import { BulkUpload } from '@/components/students/BulkUpload';
import type { Student, StudentFilters as StudentFiltersType } from '@/types';
import { DEPARTMENTS, BATCH_YEARS } from '@/types';

// Mock data - replace with actual API calls
const mockStudents: Student[] = [
  {
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
    jobApplications: []
  },
  {
    id: '2',
    rollNumber: 'IT2020002',
    name: 'Priya Patel',
    email: 'priya.patel@student.edu',
    phone: '9876543211',
    department: 'Information Technology',
    batch: '2020-2024',
    year: 2024,
    cgpa: 9.1,
    placementStatus: 'placed',
    resumeUrl: '/resumes/priya_patel.pdf',
    linkedinUrl: 'https://linkedin.com/in/priya-patel',
    prepCVScore: 95,
    prepCVCompleted: true,
    testCompleted: true,
    lastUpdated: new Date('2024-11-14'),
    updatedBy: 'admin',
    jobApplications: []
  },
  {
    id: '3',
    rollNumber: 'ME2020003',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@student.edu',
    phone: '9876543212',
    department: 'Mechanical Engineering',
    batch: '2020-2024',
    year: 2024,
    cgpa: 7.8,
    placementStatus: 'unplaced',
    prepCVScore: 68,
    prepCVCompleted: false,
    testCompleted: false,
    lastUpdated: new Date('2024-11-10'),
    updatedBy: 'system',
    jobApplications: []
  }
];

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<StudentFiltersType>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const user = {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@university.edu',
    role: 'super_admin',
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, students]);

  const applyFilters = () => {
    let filtered = students;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Department filter
    if (filters.department) {
      filtered = filtered.filter(student => student.department === filters.department);
    }

    // Batch filter
    if (filters.batch) {
      filtered = filtered.filter(student => student.batch === filters.batch);
    }

    // Placement status filter
    if (filters.placementStatus) {
      filtered = filtered.filter(student => student.placementStatus === filters.placementStatus);
    }

    // PrepCV status filter
    if (filters.prepCVStatus) {
      const completed = filters.prepCVStatus === 'completed';
      filtered = filtered.filter(student => student.prepCVCompleted === completed);
    }

    // CGPA range filter
    if (filters.cgpaRange) {
      const [min, max] = filters.cgpaRange;
      filtered = filtered.filter(student => student.cgpa >= min && student.cgpa <= max);
    }

    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleExport = async () => {
    setIsLoading(true);
    try {
      // Implement export logic
      const dataToExport = filteredStudents.map(student => ({
        'Roll Number': student.rollNumber,
        'Name': student.name,
        'Email': student.email,
        'Phone': student.phone,
        'Department': student.department,
        'Batch': student.batch,
        'CGPA': student.cgpa,
        'Placement Status': student.placementStatus,
        'PrepCV Score': student.prepCVScore,
        'PrepCV Completed': student.prepCVCompleted ? 'Yes' : 'No',
        'Test Completed': student.testCompleted ? 'Yes' : 'No'
      }));

      // Create CSV and download
      const csvContent = [
        Object.keys(dataToExport[0]).join(','),
        ...dataToExport.map(row => Object.values(row).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `students_export_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStudent = (studentData: any) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      ...studentData,
      prepCVScore: 0,
      prepCVCompleted: false,
      testCompleted: false,
      lastUpdated: new Date(),
      updatedBy: user.name,
      jobApplications: []
    };
    setStudents([...students, newStudent]);
    setShowStudentForm(false);
  };

  const handleEditStudent = (studentData: any) => {
    if (!selectedStudent) return;
    
    const updatedStudents = students.map(student =>
      student.id === selectedStudent.id
        ? { ...student, ...studentData, lastUpdated: new Date(), updatedBy: user.name }
        : student
    );
    setStudents(updatedStudents);
    setShowStudentForm(false);
    setSelectedStudent(undefined);
  };

  const handleBulkUpload = (uploadedStudents: Student[]) => {
    setStudents([...students, ...uploadedStudents]);
    setShowBulkUpload(false);
  };

  // Pagination
  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  const pageActions = [
    {
      label: 'Add Student',
      onClick: () => {
        setSelectedStudent(undefined);
        setShowStudentForm(true);
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
      onClick: handleExport,
      icon: Download,
      variant: 'outline' as const
    }
  ];

  return (
    <MainLayout user={user} onExport={handleExport}>
      <PageHeader
        title="Students"
        subtitle={`${totalItems} students • ${filteredStudents.filter(s => s.placementStatus === 'placed').length} placed`}
        actions={pageActions}
      >
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search students by name, roll number, or email..."
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
              Filters {Object.keys(filters).length > 0 && `(${Object.keys(filters).length})`}
            </Button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4">
            <StudentFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={() => setFilters({})}
            />
          </div>
        )}
      </PageHeader>

      <div className="space-y-6">
        {/* Students Table */}
        <Card>
          <StudentsTable
            students={paginatedStudents}
            isLoading={isLoading}
            onEditStudent={(student) => {
              setSelectedStudent(student);
              setShowStudentForm(true);
            }}
            onViewStudent={(student) => {
              // Navigate to student detail page
              window.location.href = `/students/${student.id}`;
            }}
          />
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalItems}</div>
              <div className="text-sm text-gray-500">Total Students</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredStudents.filter(s => s.placementStatus === 'placed').length}
              </div>
              <div className="text-sm text-gray-500">Placed</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredStudents.filter(s => s.placementStatus === 'intern').length}
              </div>
              <div className="text-sm text-gray-500">Interns</div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {filteredStudents.filter(s => s.placementStatus === 'unplaced').length}
              </div>
              <div className="text-sm text-gray-500">Unplaced</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showStudentForm}
        onClose={() => {
          setShowStudentForm(false);
          setSelectedStudent(undefined);
        }}
        title={selectedStudent ? 'Edit Student' : 'Add Student'}
        size="lg"
      >
        <StudentForm
          student={selectedStudent}
          onSubmit={selectedStudent ? handleEditStudent : handleAddStudent}
          onCancel={() => {
            setShowStudentForm(false);
            setSelectedStudent(undefined);
          }}
        />
      </Modal>

      <Modal
        isOpen={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
        title="Bulk Upload Students"
        size="lg"
      >
        <BulkUpload
          onUpload={handleBulkUpload}
          onCancel={() => setShowBulkUpload(false)}
        />
      </Modal>
    </MainLayout>
  );
};

export default StudentsPage;
