import React from 'react';
import { NotFound } from '@/components/ui/NotFound';

export default function NotFoundPage() {
  return (
    <NotFound
      title="404 - Page Not Found"
      message="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
    />
  );
}

