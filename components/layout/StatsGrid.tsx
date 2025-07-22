import React from 'react';
import { Card } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';
import { formatCurrency, calculatePercentage } from '@/lib/utils';

interface StatItem {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: LucideIcon;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  format?: 'number' | 'currency' | 'percentage';
}

interface StatsGridProps {
  stats: StatItem[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const formatValue = (value: string | number, format?: string) => {
    if (typeof value === 'string') return value;
    
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  const getColorClasses = (color?: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700',
      green: 'bg-green-50 text-green-700',
      yellow: 'bg-yellow-50 text-yellow-700',
      red: 'bg-red-50 text-red-700',
      purple: 'bg-purple-50 text-purple-700'
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
                {Icon && (
                  <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.title}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatValue(stat.value, stat.format)}
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
    </div>
  );
};
