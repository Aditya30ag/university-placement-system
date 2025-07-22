'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, HelpCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  tooltip?: string;
  icon?: LucideIcon;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  tooltip,
  icon: Icon,
  className,
  required,
  ...props
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <div className="flex items-center space-x-1">
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
          {tooltip && (
            <div className="relative group">
              <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mb-1">
                {tooltip}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base',
            Icon && 'pl-10',
            error && 'border-error-300 focus:ring-error-500',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
