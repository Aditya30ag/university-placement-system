'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Checkbox } from '@/components/ui/Checkbox';
import { DEPARTMENTS, BATCH_YEARS } from '@/types';

const reportSchema = z.object({
  name: z.string().min(5, 'Report name must be at least 5 characters'),
  type: z.enum(['compliance', 'placement_summary', 'company_report', 'student_report']),
  format: z.enum(['pdf', 'xlsx']),
  description: z.string().optional(),
  dateRange: z.object({
    from: z.string().min(1, 'Start date is required'),
    to: z.string().min(1, 'End date is required')
  }),
  departments: z.array(z.string()),
  batches: z.array(z.string()),
  includeCharts: z.boolean().default(true),
  includeStudentDetails: z.boolean().default(false),
  includeContactDetails: z.boolean().default(false)
});

type ReportFormData = z.infer<typeof reportSchema>;

interface ReportGeneratorProps {
  onGenerate: (data: ReportFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  onGenerate,
  onCancel,
  isLoading
}) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      departments: [],
      batches: [],
      includeCharts: true,
      includeStudentDetails: false,
      includeContactDetails: false
    }
  });

  const reportType = watch('type');

  const handleDepartmentToggle = (department: string) => {
    const updated = selectedDepartments.includes(department)
      ? selectedDepartments.filter(d => d !== department)
      : [...selectedDepartments, department];
    
    setSelectedDepartments(updated);
    setValue('departments', updated);
  };

  const handleBatchToggle = (batch: string) => {
    const updated = selectedBatches.includes(batch)
      ? selectedBatches.filter(b => b !== batch)
      : [...selectedBatches, batch];
    
    setSelectedBatches(updated);
    setValue('batches', updated);
  };

  const reportTypeOptions = [
    { value: 'compliance', label: 'Compliance Report (NAAC/AICTE)' },
    { value: 'placement_summary', label: 'Placement Summary Report' },
    { value: 'company_report', label: 'Company Engagement Report' },
    { value: 'student_report', label: 'Student Progress Report' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'xlsx', label: 'Excel Spreadsheet' }
  ];

  return (
    <form onSubmit={handleSubmit(onGenerate)} className="space-y-6">
      {/* Basic Information */}
      <Card className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Report Configuration</h3>
        <div className="space-y-4">
          <Input
            label="Report Name"
            tooltip="Descriptive name for this report"
            required
            {...register('name')}
            error={errors.name?.message}
            placeholder="e.g., Monthly Placement Summary - November 2024"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Report Type"
              tooltip="Type of report to generate"
              required
              options={reportTypeOptions}
              {...register('type')}
              error={errors.type?.message}
            />

            <Select
              label="Output Format"
              tooltip="File format for the generated report"
              required
              options={formatOptions}
              {...register('format')}
              error={errors.format?.message}
            />
          </div>

          <Textarea
            label="Description (Optional)"
            tooltip="Brief description of what this report contains"
            {...register('description')}
            placeholder="Describe the purpose and scope of this report..."
            rows={3}
          />
        </div>
      </Card>

      {/* Date Range */}
      <Card className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Date Range</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="From Date"
            type="date"
            required
            {...register('dateRange.from')}
            error={errors.dateRange?.from?.message}
          />

          <Input
            label="To Date"
            type="date"
            required
            {...register('dateRange.to')}
            error={errors.dateRange?.to?.message}
          />
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
        
        {/* Departments */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departments
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {DEPARTMENTS.map((department) => (
              <label
                key={department}
                className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedDepartments.includes(department)}
                  onChange={() => handleDepartmentToggle(department)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{department}</span>
              </label>
            ))}
          </div>
          {selectedDepartments.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedDepartments.map(dept => (
                <Badge key={dept} variant="info" size="sm">
                  {dept}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Batches */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Batches
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {BATCH_YEARS.map((batch) => (
              <label
                key={batch}
                className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedBatches.includes(batch)}
                  onChange={() => handleBatchToggle(batch)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{batch}</span>
              </label>
            ))}
          </div>
          {selectedBatches.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedBatches.map(batch => (
                <Badge key={batch} variant="info" size="sm">
                  {batch}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Options */}
      <Card className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Report Options</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('includeCharts')}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">Include charts and visualizations</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('includeStudentDetails')}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">Include detailed student information</span>
          </label>

          {(reportType === 'company_report' || reportType === 'compliance') && (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('includeContactDetails')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Include contact details</span>
            </label>
          )}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          Generate Report
        </Button>
      </div>
    </form>
  );
};
