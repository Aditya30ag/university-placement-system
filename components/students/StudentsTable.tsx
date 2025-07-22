import React from 'react';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Badge } from '@/components/ui/Badge';
import { Edit, Eye, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Student } from '@/types';

interface StudentsTableProps {
  students: Student[];
  isLoading: boolean;
  onEditStudent: (student: Student) => void;
  onViewStudent: (student: Student) => void;
}

export const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  isLoading,
  onEditStudent,
  onViewStudent
}) => {
  const columns = [
    {
      key: 'rollNumber',
      header: 'Roll Number',
      width: 'w-32',
      render: (value: string, student: Student) => (
        <div className="font-mono text-sm">{value}</div>
      )
    },
    {
      key: 'name',
      header: 'Name',
      width: 'w-48',
      render: (value: string, student: Student) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{student.email}</div>
        </div>
      )
    },
    {
      key: 'department',
      header: 'Department',
      width: 'w-40',
      render: (value: string, student: Student) => (
        <div>
          <div className="text-sm">{value}</div>
          <div className="text-xs text-gray-500">{student.batch}</div>
        </div>
      )
    },
    {
      key: 'cgpa',
      header: 'CGPA',
      width: 'w-20',
      render: (value: number) => (
        <span className="font-medium">{value.toFixed(2)}</span>
      )
    },
    {
      key: 'placementStatus',
      header: 'Status',
      width: 'w-24',
      render: (value: string) => <StatusBadge status={value} />
    },
    {
      key: 'prepCVScore',
      header: 'PrepCV',
      width: 'w-24',
      render: (value: number, student: Student) => (
        <div className="text-center">
          <div className="text-sm font-medium">{value}</div>
          <Badge 
            variant={student.prepCVCompleted ? 'success' : 'warning'}
            size="sm"
          >
            {student.prepCVCompleted ? 'Done' : 'Pending'}
          </Badge>
        </div>
      )
    },
    {
      key: 'testCompleted',
      header: 'Test',
      width: 'w-20',
      render: (value: boolean) => (
        <Badge variant={value ? 'success' : 'error'} size="sm">
          {value ? 'Done' : 'Pending'}
        </Badge>
      )
    },
    {
      key: 'lastUpdated',
      header: 'Last Updated',
      width: 'w-32',
      render: (value: Date, student: Student) => (
        <div className="text-xs">
          <div>{formatDate(value)}</div>
          <div className="text-gray-500">by {student.updatedBy}</div>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      width: 'w-32',
      render: (value: any, student: Student) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewStudent(student)}
            icon={Eye}
            className="!p-1"
          >
            <span className="sr-only">View</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEditStudent(student)}
            icon={Edit}
            className="!p-1"
          >
            <span className="sr-only">Edit</span>
          </Button>
          {student.resumeUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(student.resumeUrl, '_blank')}
              icon={ExternalLink}
              className="!p-1"
            >
              <span className="sr-only">Resume</span>
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <Table
      data={students}
      columns={columns}
      isLoading={isLoading}
      emptyMessage="No students found"
    />
  );
};
