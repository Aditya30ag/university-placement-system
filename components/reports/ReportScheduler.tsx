'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';

const scheduleSchema = z.object({
  reportName: z.string().min(5, 'Report name is required'),
  reportType: z.enum(['compliance', 'placement_summary', 'company_report', 'student_report']),
  frequency: z.enum(['daily', 'weekly', 'monthly', 'quarterly']),
  startDate: z.string().min(1, 'Start date is required'),
  emailRecipients: z.string().min(5, 'At least one email is required'),
  format: z.enum(['pdf', 'xlsx'])
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

interface ReportSchedulerProps {
  onSchedule: (data: ScheduleFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const ReportScheduler: React.FC<ReportSchedulerProps> = ({
  onSchedule,
  onCancel,
  isLoading
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema)
  });

  const reportTypeOptions = [
    { value: 'compliance', label: 'Compliance Report' },
    { value: 'placement_summary', label: 'Placement Summary' },
    { value: 'company_report', label: 'Company Report' },
    { value: 'student_report', label: 'Student Report' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'xlsx', label: 'Excel' }
  ];

  return (
    <form onSubmit={handleSubmit(onSchedule)} className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Configuration</h3>
        <div className="space-y-4">
          <Input
            label="Report Name"
            required
            {...register('reportName')}
            error={errors.reportName?.message}
            placeholder="Weekly Placement Update"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Report Type"
              required
              options={reportTypeOptions}
              {...register('reportType')}
              error={errors.reportType?.message}
            />

            <Select
              label="Frequency"
              required
              options={frequencyOptions}
              {...register('frequency')}
              error={errors.frequency?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              required
              {...register('startDate')}
              error={errors.startDate?.message}
            />

            <Select
              label="Format"
              required
              options={formatOptions}
              {...register('format')}
              error={errors.format?.message}
            />
          </div>

          <Input
            label="Email Recipients"
            tooltip="Comma-separated email addresses"
            required
            {...register('emailRecipients')}
            error={errors.emailRecipients?.message}
            placeholder="admin@university.edu, dean@university.edu"
          />
        </div>
      </Card>

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
          Schedule Report
        </Button>
      </div>
    </form>
  );
};

