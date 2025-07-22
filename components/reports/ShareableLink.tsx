'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Copy, Check, Calendar, Link } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import type { Report } from '@/types';

interface ShareableLinkProps {
  report: Report;
  onClose: () => void;
}

export const ShareableLink: React.FC<ShareableLinkProps> = ({
  report,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [expiryDays, setExpiryDays] = useState('30');
  const [isGenerating, setIsGenerating] = useState(false);

  const shareableUrl = report.shareableToken 
    ? `/shared/reports/${report.shareableToken}`
    : null;

  const handleCopyLink = async () => {
    if (shareableUrl) {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGenerateLink = async () => {
    setIsGenerating(true);
    try {
      // Simulate link generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would call the API to generate a new shareable link
      console.log('Generating shareable link for', report.id, 'with expiry', expiryDays, 'days');
      
      alert('Shareable link generated successfully!');
    } catch (error) {
      console.error('Link generation error:', error);
      alert('Failed to generate link. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const expiryOptions = [
    { value: '1', label: '1 Day' },
    { value: '7', label: '7 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' },
    { value: '365', label: '1 Year' }
  ];

  return (
    <div className="space-y-6">
      {/* Report Info */}
      <Card className="p-4 bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-2">{report.name}</h4>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Generated: {formatDateTime(report.generatedAt)}</span>
          <Badge variant="info">{report.format.toUpperCase()}</Badge>
        </div>
      </Card>

      {/* Current Link */}
      {shareableUrl ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shareable Link
          </label>
          <div className="flex items-center space-x-2">
            <Input
              value={shareableUrl}
              readOnly
              className="flex-1 bg-gray-50"
            />
            <Button
              variant="outline"
              onClick={handleCopyLink}
              icon={copied ? Check : Copy}
              className={copied ? 'text-green-600' : ''}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          
          {report.expiresAt && (
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                Expires: {formatDateTime(report.expiresAt)}
                {new Date(report.expiresAt) < new Date() && (
                  <Badge variant="error" size="sm" className="ml-2">Expired</Badge>
                )}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <Link className="mx-auto h-8 w-8 mb-2" />
          <p>No shareable link exists for this report</p>
        </div>
      )}

      {/* Generate New Link */}
      <Card className="p-4">
        <h4 className="font-medium text-gray-900 mb-4">
          {shareableUrl ? 'Generate New Link' : 'Create Shareable Link'}
        </h4>
        
        <div className="space-y-4">
          <Select
            label="Link Expiry"
            options={expiryOptions}
            value={expiryDays}
            onChange={(e) => setExpiryDays(e.target.value)}
          />
          
          <Button
            onClick={handleGenerateLink}
            isLoading={isGenerating}
            className="w-full"
          >
            {shareableUrl ? 'Generate New Link' : 'Create Shareable Link'}
          </Button>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <p>• Links allow external access without login</p>
          <p>• Old links will be invalidated when generating new ones</p>
          <p>• Links can be revoked at any time</p>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {shareableUrl && (
          <Button variant="primary" onClick={handleCopyLink}>
            Copy Link & Close
          </Button>
        )}
      </div>
    </div>
  );
};
