'use client';
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Switch } from '@/components/ui/Switch';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Shield, Key, Clock, AlertTriangle } from 'lucide-react';
import type { SystemSettings } from '@/types';

interface SecuritySettingsProps {
  settings: SystemSettings;
  onSettingsChange: (settings: Partial<SystemSettings>) => void;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  settings,
  onSettingsChange
}) => {
  return (
    <div className="space-y-6">
      {/* Authentication */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Key className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">Authentication</h3>
        </div>
        <div className="space-y-4">
          <Switch
            label="Two-Factor Authentication"
            description="Require 2FA for all admin accounts"
          />
          <Switch
            label="Strong Password Policy"
            description="Enforce complex password requirements"
            defaultChecked
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Session Timeout (minutes)"
              type="number"
              defaultValue="120"
              min="15"
              max="480"
            />
            <Select
              label="Password Expiry"
              options={[
                { value: '0', label: 'Never' },
                { value: '30', label: '30 days' },
                { value: '90', label: '90 days' },
                { value: '180', label: '180 days' }
              ]}
              defaultValue="90"
            />
          </div>
        </div>
      </Card>

      {/* Access Control */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-medium text-gray-900">Access Control</h3>
        </div>
        <div className="space-y-4">
          <Switch
            label="IP Restriction"
            description="Limit access to specific IP addresses or ranges"
          />
          <Input
            label="Allowed IP Ranges"
            placeholder="192.168.1.0/24, 10.0.0.0/8"
            disabled
          />
          <Switch
            label="API Rate Limiting"
            description="Prevent abuse by limiting API requests per user"
            defaultChecked
          />
          <Input
            label="Max Requests per Hour"
            type="number"
            defaultValue="1000"
            min="100"
            max="10000"
          />
        </div>
      </Card>

      {/* Audit & Logging */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-medium text-gray-900">Audit & Logging</h3>
        </div>
        <div className="space-y-4">
          <Switch
            label="Audit Logging"
            description="Log all user actions and system changes"
            defaultChecked
          />
          <Switch
            label="Failed Login Alerts"
            description="Alert admins about repeated failed login attempts"
            defaultChecked
          />
          <Select
            label="Log Retention Period"
            options={[
              { value: '30', label: '30 days' },
              { value: '90', label: '90 days' },
              { value: '180', label: '180 days' },
              { value: '365', label: '1 year' }
            ]}
            defaultValue="90"
          />
        </div>
      </Card>

      {/* Data Protection */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-medium text-gray-900">Data Protection</h3>
        </div>
        <div className="space-y-4">
          <Switch
            label="Data Encryption at Rest"
            description="Encrypt sensitive data stored in the database"
            defaultChecked
            disabled
          />
          <Switch
            label="Automatic Backups"
            description="Create daily encrypted backups of all data"
            defaultChecked
          />
          <Switch
            label="GDPR Compliance Mode"
            description="Enable additional privacy controls and data handling"
          />
          <Input
            label="Data Retention Period (days)"
            type="number"
            defaultValue="2555" // ~7 years
            min="365"
            max="3650"
          />
        </div>
      </Card>
    </div>
  );
};

