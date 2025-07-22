'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import type { Company } from '@/types';

const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  industry: z.string().min(1, 'Please select an industry'),
  type: z.enum(['dream', 'mass_recruiter', 'core', 'startup']),
  tier: z.enum(['tier1', 'tier2', 'tier3'])
});

type CompanyFormData = z.infer<typeof companySchema>;

interface CompanyFormProps {
  company?: Company;
  onSubmit: (data: CompanyFormData) => void;
  onCancel: () => void;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({
  company,
  onSubmit,
  onCancel
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: company?.name || '',
      website: company?.website || '',
      industry: company?.industry || '',
      type: company?.type || 'mass_recruiter',
      tier: company?.tier || 'tier2'
    }
  });

  const industryOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'IT Services', label: 'IT Services' },
    { value: 'Consulting', label: 'Consulting' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Education', label: 'Education' },
    { value: 'Government', label: 'Government' },
    { value: 'Other', label: 'Other' }
  ];

  const typeOptions = [
    { value: 'dream', label: 'Dream Company' },
    { value: 'mass_recruiter', label: 'Mass Recruiter' },
    { value: 'core', label: 'Core Company' },
    { value: 'startup', label: 'Startup' }
  ];

  const tierOptions = [
    { value: 'tier1', label: 'Tier 1' },
    { value: 'tier2', label: 'Tier 2' },
    { value: 'tier3', label: 'Tier 3' }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
        <div className="space-y-4">
          <Input
            label="Company Name"
            tooltip="Full legal name of the company"
            required
            {...register('name')}
            error={errors.name?.message}
            placeholder="e.g., Microsoft Corporation"
          />

          <Input
            label="Website"
            tooltip="Official company website URL"
            type="url"
            {...register('website')}
            error={errors.website?.message}
            placeholder="https://company.com"
          />

          <Select
            label="Industry"
            tooltip="Primary business sector of the company"
            required
            options={industryOptions}
            {...register('industry')}
            error={errors.industry?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Company Type"
              tooltip="Classification based on recruitment pattern"
              required
              options={typeOptions}
              {...register('type')}
              error={errors.type?.message}
            />

            <Select
              label="Company Tier"
              tooltip="Classification based on package and reputation"
              required
              options={tierOptions}
              {...register('tier')}
              error={errors.tier?.message}
            />
          </div>
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
          {company ? 'Update Company' : 'Add Company'}
        </Button>
      </div>
    </form>
  );
};
