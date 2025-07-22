import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingPageProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ 
  message = 'Loading...', 
  size = 'lg' 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size={size} className="mx-auto mb-4" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

