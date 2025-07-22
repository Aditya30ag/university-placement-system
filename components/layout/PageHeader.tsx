import React from 'react';
import { Button } from '@/components/ui/Button';
import { LucideIcon } from 'lucide-react';

interface PageAction {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'outline';
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: PageAction[];
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions = [],
  children
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        
        {actions.length > 0 && (
          <div className="flex items-center space-x-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'primary'}
                onClick={action.onClick}
                icon={action.icon}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
      
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

