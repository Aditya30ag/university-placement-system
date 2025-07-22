'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Users, 
  Edit, 
  Eye,
  ChevronRight,
  Target,
  TrendingUp
} from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import type { Job } from '@/types';

interface JobPipelineProps {
  job: Job;
  onEdit: () => void;
  onViewDetails: () => void;
}

export const JobPipeline: React.FC<JobPipelineProps> = ({
  job,
  onEdit,
  onViewDetails
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalApplications = job.rounds.reduce(
    (total, round) => total + round.students.length, 0
  );

  const getJobTypeColor = (type: string) => {
    const colors = {
      full_time: 'success',
      internship: 'info',
      contract: 'warning'
    };
    return colors[type as keyof typeof colors] || 'default';
  };

  const getRoundProgress = () => {
    if (job.rounds.length === 0) return [];
    
    return job.rounds.map((round, index) => ({
      ...round,
      applicants: round.students.length,
      selected: round.students.filter(s => s.status === 'selected').length,
      rejected: round.students.filter(s => s.status === 'rejected').length,
      pending: round.students.filter(s => s.status === 'waiting').length
    }));
  };

  const roundProgress = getRoundProgress();

  return (
    <Card className="overflow-hidden">
      {/* Job Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                <div className="flex items-center space-x-1">
                  <Building2 className="w-4 h-4" />
                  <span>Company Name</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline: {formatDate(job.deadline)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                {formatCurrency(job.ctc)}
              </div>
              <div className="text-sm text-gray-500">Package</div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <StatusBadge status={job.status} />
                <Badge variant={getJobTypeColor(job.jobType) as any} size="sm">
                  {job.jobType.replace('_', ' ')}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onViewDetails}
                  icon={Eye}
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onEdit}
                  icon={Edit}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Job Summary */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900">{totalApplications}</div>
            <div className="text-sm text-gray-500">Total Applications</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-semibold text-blue-600">{job.rounds.length}</div>
            <div className="text-sm text-gray-500">Rounds</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-semibold text-green-600">
              {job.eligibilityDepartments.length}
            </div>
            <div className="text-sm text-gray-500">Eligible Depts</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-lg font-semibold text-yellow-600">{job.minCGPA}</div>
            <div className="text-sm text-gray-500">Min CGPA</div>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="mt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            icon={ChevronRight}
            className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          >
            {isExpanded ? 'Hide Pipeline' : 'Show Pipeline'}
          </Button>
        </div>
      </div>

      {/* Pipeline Visualization */}
      {isExpanded && (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-md font-medium text-gray-900">Recruitment Pipeline</h4>
            <div className="text-sm text-gray-500">
              Click on any round to view student details
            </div>
          </div>

          {roundProgress.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No rounds configured for this job
            </div>
          ) : (
            <div className="space-y-4">
              {/* Pipeline Flow */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {roundProgress.map((round, index) => (
                  <React.Fragment key={round.id}>
                    <div className="flex-shrink-0">
                      <div className="w-48 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="text-sm font-medium text-gray-900 mb-2">
                          {round.name}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Applied:</span>
                            <span className="font-medium">{round.applicants}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-green-600">Selected:</span>
                            <span className="font-medium text-green-600">{round.selected}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-red-600">Rejected:</span>
                            <span className="font-medium text-red-600">{round.rejected}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-yellow-600">Pending:</span>
                            <span className="font-medium text-yellow-600">{round.pending}</span>
                          </div>
                        </div>
                        {round.date && (
                          <div className="mt-2 text-xs text-gray-500">
                            {formatDate(round.date)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {index < roundProgress.length - 1 && (
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Funnel Visualization */}
              <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-900 mb-3">Funnel Analysis</h5>
                <div className="space-y-2">
                  {roundProgress.map((round, index) => {
                    const conversionRate = index === 0 ? 100 : 
                      roundProgress[index - 1].applicants > 0 ? 
                      (round.applicants / roundProgress[index - 1].applicants) * 100 : 0;
                    
                    return (
                      <div key={round.id} className="flex items-center space-x-4">
                        <div className="w-32 text-sm text-gray-700">{round.name}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div
                            className="bg-blue-500 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                            style={{ width: `${Math.max((round.applicants / totalApplications) * 100, 10)}%` }}
                          >
                            {round.applicants}
                          </div>
                        </div>
                        <div className="w-16 text-sm text-gray-500 text-right">
                          {conversionRate.toFixed(1)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

