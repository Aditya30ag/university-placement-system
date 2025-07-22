import React from 'react';
import { Badge } from './Badge';
import { getStatusColor } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'placed':
      case 'selected':
      case 'active':
        return 'success';
      case 'rejected':
      case 'closed':
        return 'error';
      case 'waiting':
      case 'pending':
        return 'warning';
      case 'intern':
      case 'shortlisted':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <Badge variant={getVariant(status)} className={className}>
      {formatStatus(status)}
    </Badge>
  );
};
