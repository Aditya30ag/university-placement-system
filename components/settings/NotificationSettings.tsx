'use client';
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Switch } from '@/components/ui/Switch';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Bell, Mail, MessageSquare, Phone } from 'lucide-react';
import type { SystemSettings } from '@/types';

interface NotificationSettingsProps {
  settings: SystemSettings;
  onSettingsChange: (settings: Partial<SystemSettings>) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onSettingsChange
}) => {
  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Mail className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
        </div>
        <div className="space-y-4">
          <Switch
            label="Application Deadlines"
            description="Send email reminders for upcoming job application deadlines"
            defaultChecked
          />
          <Switch
            label="Placement Updates"
            description="Notify admins about new placements and status changes"
            defaultChecked
          />
          <Switch
            label="Weekly Reports"
            description="Send weekly placement summary to administrators"
            defaultChecked
          />
          <Switch
            label="Compliance Alerts"
            description="Alert when departments fall below compliance thresholds"
            defaultChecked
          />
        </div>
      </Card>

      {/* SMS Notifications */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MessageSquare className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
        </div>
        <div className="space-y-4">
          <Switch
            label="Enable SMS"
            description="Send SMS notifications for critical updates"
          />
          <Input
            label="SMS Provider API Key"
            type="password"
            placeholder="Enter your SMS provider API key"
            disabled
          />
          <Select
            label="SMS Provider"
            options={[
              { value: 'twilio', label: 'Twilio' },
              { value: 'aws-sns', label: 'AWS SNS' },
              { value: 'msg91', label: 'MSG91' }
            ]}
            disabled
          />
        </div>
      </Card>

      {/* Push Notifications */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
        </div>
        <div className="space-y-4">
          <Switch
            label="Browser Notifications"
            description="Show desktop notifications for important updates"
            defaultChecked
          />
          <Switch
            label="Real-time Updates"
            description="Push live updates for job applications and results"
            defaultChecked
          />
        </div>
      </Card>

      {/* Notification Schedule */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Daily Digest Time"
            options={[
              { value: '08:00', label: '8:00 AM' },
              { value: '09:00', label: '9:00 AM' },
              { value: '10:00', label: '10:00 AM' },
              { value: '17:00', label: '5:00 PM' },
              { value: '18:00', label: '6:00 PM' }
            ]}
            defaultValue="09:00"
          />
          <Select
            label="Weekly Report Day"
            options={[
              { value: 'monday', label: 'Monday' },
              { value: 'tuesday', label: 'Tuesday' },
              { value: 'friday', label: 'Friday' },
              { value: 'sunday', label: 'Sunday' }
            ]}
            defaultValue="monday"
          />
        </div>
      </Card>
    </div>
  );
};

