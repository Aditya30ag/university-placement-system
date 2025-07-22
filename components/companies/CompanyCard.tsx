import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Building2, 
  Users, 
  MapPin, 
  Calendar, 
  Edit, 
  Eye,
  ExternalLink,
  Phone,
  Mail
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Company } from '@/types';

interface CompanyCardProps {
  company: Company;
  onEdit: () => void;
  onView: () => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onEdit,
  onView
}) => {
  const getTypeColor = (type: string) => {
    const colors = {
      dream: 'success',
      mass_recruiter: 'info',
      core: 'warning',
      startup: 'default'
    };
    return colors[type as keyof typeof colors] || 'default';
  };

  const getTierColor = (tier: string) => {
    const colors = {
      tier1: 'success',
      tier2: 'warning', 
      tier3: 'default'
    };
    return colors[tier as keyof typeof colors] || 'default';
  };

  const primaryPOC = company.pocs.find(poc => poc.isPrimary);

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{company.name}</h3>
            <p className="text-sm text-gray-500">{company.industry}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onView}
            icon={Eye}
            className="!p-1"
          >
            <span className="sr-only">View</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            icon={Edit}
            className="!p-1"
          >
            <span className="sr-only">Edit</span>
          </Button>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant={getTypeColor(company.type)} size="sm">
          {company.type.replace('_', ' ')}
        </Badge>
        <Badge variant={getTierColor(company.tier)} size="sm">
          {company.tier.toUpperCase()}
        </Badge>
        <Badge variant={company.isActive ? 'success' : 'error'} size="sm">
          {company.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {company.pocs.length}
          </div>
          <div className="text-xs text-gray-500">POCs</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {company.jobs?.length || 0}
          </div>
          <div className="text-xs text-gray-500">Jobs</div>
        </div>
      </div>

      {/* Primary POC */}
      {primaryPOC && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="text-sm font-medium text-gray-900 mb-1">
            Primary Contact
          </div>
          <div className="text-sm text-gray-600">
            <div>{primaryPOC.name}</div>
            <div className="text-xs">{primaryPOC.designation}</div>
          </div>
          <div className="flex items-center space-x-3 mt-2">
            <a
              href={`mailto:${primaryPOC.email}`}
              className="text-xs text-blue-600 hover:text-blue-700 flex items-center"
            >
              <Mail className="w-3 h-3 mr-1" />
              Email
            </a>
            {primaryPOC.phone && (
              <a
                href={`tel:${primaryPOC.phone}`}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center"
              >
                <Phone className="w-3 h-3 mr-1" />
                Call
              </a>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>
            {company.lastContactDate 
              ? `Last contact: ${formatDate(company.lastContactDate)}`
              : 'No recent contact'
            }
          </span>
        </div>
        
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Website</span>
          </a>
        )}
      </div>
    </Card>
  );
};

