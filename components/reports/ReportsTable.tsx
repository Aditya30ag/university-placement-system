import React from 'react';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Download, Share2, Trash2, FileText, Sheet } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import type { Report } from '@/types';

interface ReportsTableProps {
  reports: Report[];
  onDownload: (report: Report) => void;
  onShare: (report: Report) => void;
  onDelete: (reportId: string) => void;
  isLoading: boolean;
}

export const ReportsTable: React.FC<ReportsTableProps> = ({
  reports,
  onDownload,
  onShare,
  onDelete,
  isLoading
}) => {
  const getTypeLabel = (type: string) => {
    const labels = {
      compliance: 'Compliance',
      placement_summary: 'Placement Summary',
      company_report: 'Company Report',
      student_report: 'Student Report'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      compliance: 'success',
      placement_summary: 'info',
      company_report: 'warning',
      student_report: 'default'
    };
    return colors[type as keyof typeof colors] || 'default';
  };

  const getFormatIcon = (format: string) => {
    return format === 'pdf' ? FileText : Sheet;
  };

  const columns = [
    {
      key: 'name',
      header: 'Report Name',
      width: 'w-64',
      render: (value: string, report: Report) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">
            by {report.generatedBy}
          </div>
        </div>
      )
    },
    {
      key: 'type',
      header: 'Type',
      width: 'w-40',
      render: (value: string) => (
        <Badge variant={getTypeColor(value) as any}>
          {getTypeLabel(value)}
        </Badge>
      )
    },
    {
      key: 'format',
      header: 'Format',
      width: 'w-24',
      render: (value: string) => {
        const Icon = getFormatIcon(value);
        return (
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4 text-gray-500" />
            <span className="text-sm uppercase font-medium">{value}</span>
          </div>
        );
      }
    },
    {
      key: 'generatedAt',
      header: 'Generated',
      width: 'w-36',
      render: (value: Date) => (
        <div className="text-sm">
          {formatDateTime(value)}
        </div>
      )
    },
    {
      key: 'shareableToken',
      header: 'Status',
      width: 'w-24',
      render: (value: string | undefined, report: Report) => (
        <div className="space-y-1">
          {report.url && (
            <Badge variant="success" size="sm">Available</Badge>
          )}
          {value && (
            <Badge variant="info" size="sm">Shared</Badge>
          )}
          {report.expiresAt && new Date(report.expiresAt) < new Date() && (
            <Badge variant="error" size="sm">Expired</Badge>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      width: 'w-40',
      render: (value: any, report: Report) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDownload(report)}
            icon={Download}
            className="!p-1"
            disabled={!report.url}
          >
            <span className="sr-only">Download</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(report)}
            icon={Share2}
            className="!p-1"
          >
            <span className="sr-only">Share</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(report.id)}
            icon={Trash2}
            className="!p-1 text-red-600 hover:text-red-700"
          >
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      )
    }
  ];

  return (
    <Table
      data={reports}
      columns={columns}
      isLoading={isLoading}
      emptyMessage="No reports found"
    />
  );
};
