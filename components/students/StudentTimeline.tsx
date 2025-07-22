import React from 'react';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDate } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, MapPin } from 'lucide-react';
import type { JobApplication } from '@/types';

interface StudentTimelineProps {
  applications: JobApplication[];
}

export const StudentTimeline: React.FC<StudentTimelineProps> = ({
  applications
}) => {
  if (applications.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No job applications yet</p>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'selected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {applications.map((application) => (
        <div key={application.id} className="relative">
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              {getStatusIcon(application.status)}
            </div>
            <div className="flex-1">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    Job Application
                  </h4>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={application.status} />
                    <span className="text-xs text-gray-500">
                      Applied {formatDate(application.appliedAt)}
                    </span>
                  </div>
                </div>
                
                {/* Round Results */}
                {application.roundResults.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                      Round Progress
                    </h5>
                    {application.roundResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-l-2 border-gray-200 pl-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(result.status)}
                          <span className="text-sm">Round {index + 1}</span>
                          {result.score && (
                            <span className="text-xs text-gray-500">
                              Score: {result.score}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(result.date)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Offer Details */}
                {application.offerDetails && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                    <h5 className="text-sm font-medium text-green-900 mb-2">Offer Details</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-green-700">Package:</span>
                        <div className="font-medium">₹{(application.offerDetails.ctc / 100000).toFixed(1)}L</div>
                      </div>
                      <div>
                        <span className="text-green-700">Join Date:</span>
                        <div className="font-medium">{formatDate(application.offerDetails.joinDate)}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-green-600" />
                        <span className="font-medium">{application.offerDetails.location}</span>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
