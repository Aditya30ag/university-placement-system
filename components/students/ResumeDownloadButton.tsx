'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

interface ResumeDownloadButtonProps {
  resumeUrl: string;
}

export const ResumeDownloadButton: React.FC<ResumeDownloadButtonProps> = ({ resumeUrl }) => {
  const handleDownload = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <Button
      variant="outline"
      onClick={handleDownload}
      icon={Download}
    >
      Resume
    </Button>
  );
}; 