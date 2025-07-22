import React from 'react';
import { Card } from '@/components/ui/Card';
import { TrendingUp, Target, Users, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { Job } from '@/types';

interface JobStatsProps {
  jobs: Job[];
}

export const JobStats: React.FC<JobStatsProps> = ({ jobs }) => {
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const totalApplications = jobs.reduce((total, job) => 
    total + job.rounds.reduce((roundTotal, round) => roundTotal + round.students.length, 0), 0
  );
  
  const avgCTC = jobs.length > 0 
    ? jobs.reduce((total, job) => total + job.ctc, 0) / jobs.length
    : 0;

  const upcomingDeadlines = jobs.filter(job => {
    const today = new Date();
    const deadline = new Date(job.deadline);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0 && job.status === 'active';
  }).length;

  const stats = [
    {
      title: 'Total Jobs',
      value: totalJobs,
      icon: Target,
      color: 'blue',
      change: { value: 8, type: 'increase' as const }
    },
    {
      title: 'Active Jobs',
      value: activeJobs,
      icon: TrendingUp,
      color: 'green',
      change: { value: 12, type: 'increase' as const }
    },
    {
      title: 'Total Applications',
      value: totalApplications,
      icon: Users,
      color: 'purple',
      change: { value: 15, type: 'increase' as const }
    },
    {
      title: 'Avg Package',
      value: formatCurrency(avgCTC),
      icon: TrendingUp,
      color: 'yellow',
      change: { value: 5, type: 'increase' as const }
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700',
      green: 'bg-green-50 text-green-700',
      purple: 'bg-purple-50 text-purple-700',
      yellow: 'bg-yellow-50 text-yellow-700'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Card key={index} className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.title}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
            
            {stat.change && (
              <div className="mt-4">
                <div className={`flex items-baseline text-sm ${
                  stat.change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="sr-only">
                    {stat.change.type === 'increase' ? 'Increased' : 'Decreased'} by
                  </span>
                  <span className="font-medium">
                    {stat.change.type === 'increase' ? '+' : '-'}{stat.change.value}%
                  </span>
                  <span className="ml-2 text-gray-500">from last month</span>
                </div>
              </div>
            )}
          </Card>
        );
      })}

      {upcomingDeadlines > 0 && (
        <Card className="p-6 col-span-full bg-yellow-50 border-yellow-200">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-yellow-600" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Urgent: {upcomingDeadlines} job{upcomingDeadlines > 1 ? 's' : ''} closing soon
              </h3>
              <p className="text-sm text-yellow-700">
                Application deadlines within 7 days
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
