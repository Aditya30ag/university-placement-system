import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import type { DepartmentStats } from '@/types';

interface NeedsAttentionSectionProps {
  departmentStats: DepartmentStats[];
}

export const NeedsAttentionSection: React.FC<NeedsAttentionSectionProps> = ({
  departmentStats
}) => {
  const lowPerformingDepts = departmentStats
    .filter(dept => dept.placedPercentage < 70 || dept.prepCVCompletion < 80)
    .sort((a, b) => a.placedPercentage - b.placedPercentage);

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-medium text-gray-900">Needs Attention</h3>
      </div>
      
      <div className="space-y-4">
        {lowPerformingDepts.length === 0 ? (
          <p className="text-sm text-gray-500">All departments are performing well!</p>
        ) : (
          <>
            {lowPerformingDepts.slice(0, 3).map((dept) => (
              <div key={dept.department} className="border-l-4 border-yellow-400 pl-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {dept.department}
                    </p>
                    <p className="text-xs text-gray-500">
                      {dept.placedStudents}/{dept.totalStudents} students placed
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="warning">
                      {dept.placedPercentage.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            
            <Link
              href="/students?filter=needs_attention"
              className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
            >
              View all departments
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </>
        )}
      </div>
    </Card>
  );
};

