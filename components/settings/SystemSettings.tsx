'use client';
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { Slider } from '@/components/ui/Slider';
import { Upload, Image } from 'lucide-react';
import type { SystemSettings } from '@/types';

interface SystemSettingsProps {
  settings: SystemSettings;
  onSettingsChange: (settings: Partial<SystemSettings>) => void;
}

export const SystemSettings: React.FC<SystemSettingsProps> = ({
  settings,
  onSettingsChange
}) => {
  const handleInputChange = (field: keyof SystemSettings, value: any) => {
    onSettingsChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* University Information */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">University Information</h3>
        <div className="space-y-4">
          <Input
            label="University Name"
            value={settings.universityName}
            onChange={(e) => handleInputChange('universityName', e.target.value)}
            placeholder="Enter university name"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              University Logo
            </label>
            <div className="flex items-center space-x-4">
              {settings.universityLogo && (
                <img 
                  src={settings.universityLogo} 
                  alt="University Logo" 
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Upload className="w-4 h-4" />
                <span>Upload Logo</span>
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Student Dashboard Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Student Access</h3>
        <div className="space-y-6">
          <Switch
            label="Enable Student Dashboard"
            description="Allow students to access their placement dashboard"
            checked={settings.studentDashboardEnabled}
            onChange={(e) => handleInputChange('studentDashboardEnabled', e.target.checked)}
          />
          
          <Switch
            label="Auto-disable Student Logins"
            description="Automatically disable student access after placement deadline"
            checked={settings.autoDisableStudentLogins}
            onChange={(e) => handleInputChange('autoDisableStudentLogins', e.target.checked)}
          />
          
          <Input
            label="Placement Deadline"
            type="date"
            value={settings.placementDeadline.toISOString().split('T')[0]}
            onChange={(e) => handleInputChange('placementDeadline', new Date(e.target.value))}
          />
        </div>
      </Card>

      {/* Thresholds */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Thresholds & Compliance</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PrepCV Readiness Threshold: {settings.readinessThreshold}%
            </label>
            <Slider
              value={[settings.readinessThreshold]}
              onValueChange={(value) => handleInputChange('readinessThreshold', value[0])}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              Minimum score required for students to be considered placement-ready
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compliance Threshold: {settings.complianceThreshold}%
            </label>
            <Slider
              value={[settings.complianceThreshold]}
              onValueChange={(value) => handleInputChange('complianceThreshold', value[0])}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-1">
              Minimum completion rate required for department compliance
            </p>
          </div>
        </div>
      </Card>

      {/* System Features */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Features</h3>
        <div className="space-y-6">
          <Switch
            label="Allow Bulk Upload"
            description="Enable bulk upload functionality for administrators"
            checked={settings.allowBulkUpload}
            onChange={(e) => handleInputChange('allowBulkUpload', e.target.checked)}
          />
          
          <Switch
            label="Enable Notifications"
            description="Send system notifications and reminders"
            checked={settings.enableNotifications}
            onChange={(e) => handleInputChange('enableNotifications', e.target.checked)}
          />
        </div>
      </Card>
    </div>
  );
};

