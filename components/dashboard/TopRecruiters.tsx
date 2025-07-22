import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Award } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { TopRecruiter } from '@/types';

interface TopRecruitersProps {
  recruiters: TopRecruiter[];
}

export const TopRecruiters: React.FC<TopRecruitersProps> = ({
  recruiters
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Award className="h-5 w-5 text-purple-500" />
        <h3 className="text-lg font-medium text-gray-900">Top Recruiters</h3>
      </div>
      
      <div className="space-y-4">
        {recruiters.slice(0, 5).map((recruiter, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {recruiter.companyName}
              </p>
              <p className="text-xs text-gray-500">
                {recruiter.studentsHired} students hired
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(recruiter.avgCTC)}
              </p>
              <p className="text-xs text-gray-500">Avg CTC</p>
            </div>
          </div>
        ))}
        
        <Link
          href="/companies"
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
        >
          View all companies
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
};

