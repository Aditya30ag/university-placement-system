import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { UpcomingDeadline } from '@/types';

interface UpcomingDeadlinesProps {
  deadlines: UpcomingDeadline[];
}

export const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({
  deadlines
}) => {
  const sortedDeadlines = deadlines
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  const getDaysUntilDeadline = (deadline: Date) => {
    const now = new Date();
    const diffTime = new Date(deadline).getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineVariant = (days: number) => {
    if (days <= 1) return 'error';
    if (days <= 3) return 'warning';
    return 'info';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-medium text-gray-900">Upcoming Deadlines</h3>
      </div>
      
      <div className="space-y-4">
        {sortedDeadlines.map((deadline, index) => {
          const daysLeft = getDaysUntilDeadline(deadline.deadline);
          
          return (
            <div key={index} className="border-l-4 border-blue-400 pl-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {deadline.jobTitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    {deadline.companyName} • {deadline.appliedCount} applied
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(deadline.deadline)}
                  </p>
                </div>
                <Badge variant={getDeadlineVariant(daysLeft)}>
                  {daysLeft > 0 ? `${daysLeft} days` : 'Overdue'}
                </Badge>
              </div>
            </div>
          );
        })}
        
        <Link
          href="/job-tracker"
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
        >
          View all jobs
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
};
