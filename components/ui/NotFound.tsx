import React from 'react';
import { FileX, Home, ArrowLeft } from 'lucide-react';
import { Button } from './Button';

interface NotFoundProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
}

export const NotFound: React.FC<NotFoundProps> = ({
  title = 'Page Not Found',
  message = 'The page you are looking for does not exist or has been moved.',
  showBackButton = true
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-4">
          <FileX className="mx-auto h-16 w-16 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="space-y-3">
          <Button
            onClick={() => window.location.href = '/dashboard'}
            icon={Home}
            className="w-full"
          >
            Go to Dashboard
          </Button>
          {showBackButton && (
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              icon={ArrowLeft}
              className="w-full"
            >
              Go Back
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

