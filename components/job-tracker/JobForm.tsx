'use client';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { X, Plus } from 'lucide-react';
import { DEPARTMENTS } from '@/types';
import type { Job } from '@/types';

const jobSchema = z.object({
  title: z.string().min(2, 'Job title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  requirements: z.array(z.string().min(1, 'Requirement cannot be empty')),
  ctc: z.number().min(0, 'CTC must be positive'),
  location: z.string().min(1, 'Location is required'),
  jobType: z.enum(['full_time', 'internship', 'contract']),
  eligibilityDepartments: z.array(z.string()).min(1, 'At least one department must be selected'),
  minCGPA: z.number().min(0, 'CGPA must be at least 0').max(10, 'CGPA cannot exceed 10'),
  deadline: z.string().min(1, 'Deadline is required')
});

type JobFormData = z.infer<typeof jobSchema>;

interface JobFormProps {
  job?: Job;
  onSubmit: (data: JobFormData & { deadline: Date }) => void;
  onCancel: () => void;
}

export const JobForm: React.FC<JobFormProps> = ({
  job,
  onSubmit,
  onCancel
}) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: job?.title || '',
      description: job?.description || '',
      requirements: job?.requirements || [''],
      ctc: job?.ctc || 0,
      location: job?.location || '',
      jobType: job?.jobType || 'full_time',
      eligibilityDepartments: job?.eligibilityDepartments || [],
      minCGPA: job?.minCGPA || 6.0,
      deadline: job?.deadline ? job.deadline.toISOString().split('T')[0] : ''
    }
  });

  const { fields, append, remove } = useFieldArray({
        control,
        name: 'requirements' as never
  });

  const watchedDepartments = watch('eligibilityDepartments');

  const handleFormSubmit = (data: JobFormData) => {
    onSubmit({
      ...data,
      deadline: new Date(data.deadline) as any
    });
  };

  const jobTypeOptions = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' }
  ];

  const departmentOptions = DEPARTMENTS.map(dept => ({
    value: dept,
    label: dept
  }));

  const toggleDepartment = (department: string) => {
    const current = watchedDepartments || [];
    const updated = current.includes(department)
      ? current.filter(d => d !== department)
      : [...current, department];
    setValue('eligibilityDepartments', updated);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Basic Information */}
      <Card className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Job Details</h3>
        <div className="space-y-4">
          <Input
            label="Job Title"
            tooltip="Position title for the job opening"
            required
            {...register('title')}
            error={errors.title?.message}
            placeholder="e.g., Software Engineer"
          />

          <Textarea
            label="Job Description"
            tooltip="Detailed description of the role and responsibilities"
            required
            {...register('description')}
            error={errors.description?.message}
            placeholder="Describe the job role, responsibilities, and what the candidate will be doing..."
            rows={4}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements *
            </label>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Input
                    {...register(`requirements.${index}` as const)}
                    placeholder="e.g., React.js, Node.js"
                    className="flex-1"
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      icon={X}
                      className="!p-2"
                    >
                      <span className="sr-only">Remove</span>
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append('')}
                icon={Plus}
              >
                Add Requirement
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Package and Location */}
      <Card className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Compensation & Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="CTC (Annual)"
            tooltip="Cost to Company in INR per annum"
            type="number"
            min="0"
            required
            {...register('ctc', { valueAsNumber: true })}
            error={errors.ctc?.message}
            placeholder="1200000"
          />

          <Input
            label="Location"
            tooltip="Job location or work site"
            required
            {...register('location')}
            error={errors.location?.message}
            placeholder="Bangalore, Mumbai, Remote"
          />

          <Select
            label="Job Type"
            tooltip="Type of employment"
            required
            options={jobTypeOptions}
            {...register('jobType')}
            error={errors.jobType?.message}
          />

          <Input
            label="Application Deadline"
            tooltip="Last date for applications"
            type="date"
            required
            {...register('deadline')}
            error={errors.deadline?.message}
          />
        </div>
      </Card>

      {/* Eligibility Criteria */}
      <Card className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Eligibility Criteria</h3>
        <div className="space-y-4">
          <Input
            label="Minimum CGPA"
            tooltip="Minimum CGPA required for application"
            type="number"
            min="0"
            max="10"
            step="0.1"
            required
            {...register('minCGPA', { valueAsNumber: true })}
            error={errors.minCGPA?.message}
            placeholder="7.0"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eligible Departments *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {DEPARTMENTS.map((department) => (
                <label
                  key={department}
                  className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={watchedDepartments?.includes(department) || false}
                    onChange={() => toggleDepartment(department)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm">{department}</span>
                </label>
              ))}
            </div>
            {errors.eligibilityDepartments && (
              <p className="text-sm text-red-600 mt-1">
                {errors.eligibilityDepartments.message}
              </p>
            )}
          </div>

          {watchedDepartments && watchedDepartments.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected Departments:
              </label>
              <div className="flex flex-wrap gap-2">
                {watchedDepartments.map((dept) => (
                  <Badge key={dept} variant="info">
                    {dept}
                  </Badge>
                ))}
              </div>
            </div>
          )}
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
          {job ? 'Update Job' : 'Create Job'}
        </Button>
      </div>
    </form>
  );
};

