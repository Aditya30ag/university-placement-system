import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { DepartmentCompletion as DeptCompletion } from '@/types';

interface DepartmentCompletionProps {
  departmentData: DeptCompletion[];
  selectedDepartment?: string;
}

export const DepartmentCompletion: React.FC<DepartmentCompletionProps> = ({
  departmentData,
  selectedDepartment
}) => {
  const filteredData = selectedDepartment 
    ? departmentData.filter(dept => dept.department === selectedDepartment)
    : departmentData;

  const sortedData = [...filteredData].sort((a, b) => b.completionPercentage - a.completionPercentage);

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 80) return 'info';
    if (percentage >= 70) return 'warning';
    return 'error';
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Department-wise Completion
        {selectedDepartment && ` - ${selectedDepartment}`}
      </h3>
      
      <div className="space-y-4">
        {sortedData.map((dept, index) => (
          <div key={dept.department} className="border-l-4 border-gray-200 pl-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium text-gray-900">{dept.department}</h4>
                <p className="text-sm text-gray-500">
                  {dept.totalStudents} students total
                </p>
              </div>
              <Badge variant={getCompletionColor(dept.completionPercentage)}>
                {dept.completionPercentage.toFixed(1)}%
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Tests Completed:</span>
                  <span className="font-medium">{dept.testsCompleted}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(dept.testsCompleted / dept.totalStudents) * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Resumes:</span>
                  <span className="font-medium">{dept.resumesUploaded}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(dept.resumesUploaded / dept.totalStudents) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            {index === 0 && (
              <div className="flex items-center text-xs text-green-600 mt-2">
                <TrendingUp className="w-3 h-3 mr-1" />
                Top performing department
              </div>
            )}
            
            {index === sortedData.length - 1 && sortedData.length > 1 && (
              <div className="flex items-center text-xs text-red-600 mt-2">
                <TrendingDown className="w-3 h-3 mr-1" />
                Needs attention
              </div>
            )}
          </div>
        ))}
      </div>
      
      {sortedData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data available for selected filters
        </div>
      )}
    </Card>
  );
};

