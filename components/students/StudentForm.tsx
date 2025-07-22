'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { DEPARTMENTS, BATCH_YEARS } from '@/types';
import type { Student } from '@/types';

const studentSchema = z.object({
  rollNumber: z.string()
    .min(6, 'Roll number must be at least 6 characters')
    .max(12, 'Roll number must be at most 12 characters')
    .regex(/^[A-Z0-9]+$/, 'Roll number must contain only uppercase letters and numbers'),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .endsWith('@student.edu', 'Email must end with @student.edu'),
  phone: z.string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'),
  department: z.string().min(1, 'Please select a department'),
  batch: z.string().min(1, 'Please select a batch'),
  year: z.number()
    .min(2020, 'Year must be at least 2020')
    .max(2030, 'Year must be at most 2030'),
  cgpa: z.number()
    .min(0, 'CGPA must be at least 0')
    .max(10, 'CGPA must be at most 10'),
  linkedinUrl: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Please enter a valid GitHub URL').optional().or(z.literal(''))
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormProps {
  student?: Student;
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  student,
  onSubmit,
  onCancel
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      rollNumber: student?.rollNumber || '',
      name: student?.name || '',
      email: student?.email || '',
      phone: student?.phone || '',
      department: student?.department || '',
      batch: student?.batch || '',
      year: student?.year || new Date().getFullYear(),
      cgpa: student?.cgpa || 0,
      linkedinUrl: student?.linkedinUrl || '',
      githubUrl: student?.githubUrl || ''
    }
  });

  const departmentOptions = DEPARTMENTS.map(dept => ({
    value: dept,
    label: dept
  }));

  const batchOptions = BATCH_YEARS.map(batch => ({
    value: batch,
    label: batch
  }));

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => ({
    value: (currentYear - 5 + i).toString(),
    label: (currentYear - 5 + i).toString()
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          <div className="space-y-4">
            <Input
              label="Roll Number"
              tooltip="University-issued unique student ID"
              required
              {...register('rollNumber')}
              error={errors.rollNumber?.message}
              placeholder="e.g., CS2020001"
            />

            <Input
              label="Full Name"
              tooltip="Student's full name as per university records"
              required
              {...register('name')}
              error={errors.name?.message}
              placeholder="Enter full name"
            />

            <Input
              label="Email Address"
              tooltip="Student's official university email"
              type="email"
              required
              {...register('email')}
              error={errors.email?.message}
              placeholder="student@student.edu"
            />

            <Input
              label="Phone Number"
              tooltip="10-digit mobile number"
              type="tel"
              required
              {...register('phone')}
              error={errors.phone?.message}
              placeholder="9876543210"
            />
          </div>
        </Card>

        {/* Academic Information */}
        <Card className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h3>
          <div className="space-y-4">
            <Select
              label="Department"
              tooltip="Student's academic department"
              required
              options={departmentOptions}
              {...register('department')}
              error={errors.department?.message}
            />

            <Select
              label="Batch"
              tooltip="Academic batch/cohort"
              required
              options={batchOptions}
              {...register('batch')}
              error={errors.batch?.message}
            />

            <Select
              label="Graduation Year"
              tooltip="Expected graduation year"
              required
              options={yearOptions}
              {...register('year', { valueAsNumber: true })}
              error={errors.year?.message}
            />

            <Input
              label="CGPA"
              tooltip="Current Cumulative Grade Point Average (0-10 scale)"
              type="number"
              step="0.01"
              min="0"
              max="10"
              required
              {...register('cgpa', { valueAsNumber: true })}
              error={errors.cgpa?.message}
              placeholder="8.50"
            />
          </div>
        </Card>
      </div>

      {/* Social Links */}
      <Card className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="LinkedIn Profile"
            tooltip="Professional LinkedIn profile URL"
            type="url"
            {...register('linkedinUrl')}
            error={errors.linkedinUrl?.message}
            placeholder="https://linkedin.com/in/yourprofile"
          />

          <Input
            label="GitHub Profile"
            tooltip="GitHub profile URL for technical projects"
            type="url"
            {...register('githubUrl')}
            error={errors.githubUrl?.message}
            placeholder="https://github.com/yourusername"
          />
        </div>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          {student ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
};
