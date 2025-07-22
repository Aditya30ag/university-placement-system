import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  tooltip?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  hint,
  tooltip,
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
      <textarea
        ref={ref}
        className={cn(
          'w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base resize-none',
          error && 'border-error-300 focus:ring-error-500',
          className
        )}
        rows={4}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

