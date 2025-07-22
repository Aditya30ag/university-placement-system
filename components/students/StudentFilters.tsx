import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { X } from 'lucide-react';
import type { StudentFilters as StudentFiltersType } from '@/types';
import { DEPARTMENTS, BATCH_YEARS } from '@/types';

interface StudentFiltersProps {
  filters: StudentFiltersType;
  onFiltersChange: (filters: StudentFiltersType) => void;
  onClearFilters: () => void;
}

export const StudentFilters: React.FC<StudentFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const updateFilter = (key: keyof StudentFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined
    });
  };

  const departmentOptions = DEPARTMENTS.map(dept => ({
    value: dept,
    label: dept
  }));

  const batchOptions = BATCH_YEARS.map(batch => ({
    value: batch,
    label: batch
  }));

  const statusOptions = [
    { value: 'placed', label: 'Placed' },
    { value: 'unplaced', label: 'Unplaced' },
    { value: 'intern', label: 'Intern' }
  ];

  const prepCVOptions = [
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' }
  ];

  return (
    <Card className="p-4 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Select
          label="Department"
          options={departmentOptions}
          value={filters.department || ''}
          onChange={(e) => updateFilter('department', e.target.value)}
        />

        <Select
          label="Batch"
          options={batchOptions}
          value={filters.batch || ''}
          onChange={(e) => updateFilter('batch', e.target.value)}
        />

        <Select
          label="Placement Status"
          options={statusOptions}
          value={filters.placementStatus || ''}
          onChange={(e) => updateFilter('placementStatus', e.target.value)}
        />

        <Select
          label="PrepCV Status"
          options={prepCVOptions}
          value={filters.prepCVStatus || ''}
          onChange={(e) => updateFilter('prepCVStatus', e.target.value)}
        />

        <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min CGPA
          </label>
          <Input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={filters.cgpaRange?.[0] || ''}
            onChange={(e) => {
              const min = parseFloat(e.target.value) || 0;
              const max = filters.cgpaRange?.[1] || 10;
              updateFilter('cgpaRange', [min, max]);
            }}
          />
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={onClearFilters}
            icon={X}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Active filters display */}
      {Object.keys(filters).length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            
            let displayValue = value;
            if (key === 'cgpaRange') {
              displayValue = `CGPA: ${(value as number[])[0]}-${(value as number[])[1]}`;
            }
            
            return (
              <span
                key={key}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {key}: {displayValue.toString()}
                <button
                  onClick={() => updateFilter(key as keyof StudentFiltersType, undefined)}
                  className="ml-1 inline-flex items-center justify-center w-4 h-4 text-primary-400 hover:text-primary-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </Card>
  );
};
