'use client';
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/Tabs';
import {
  Settings as SettingsIcon,
  Users,
  Bell,
  Shield,
  Database,
  Download,
  Upload,
  Save
} from 'lucide-react';
import { SystemSettingsComponent } from '@/components/settings/SystemSettings';
import { UserManagement } from '@/components/settings/UserManagement';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { DataManagement } from '@/components/settings/DataManagement';
import type { SystemSettings as SystemSettingsType, User } from '@/types';

// Mock data - replace with actual API calls
const mockSettings: SystemSettingsType = {
  studentDashboardEnabled: true,
  autoDisableStudentLogins: false,
  placementDeadline: new Date('2024-12-31'),
  readinessThreshold: 80,
  complianceThreshold: 85,
  allowBulkUpload: true,
  enableNotifications: true,
  universityName: 'University of Excellence',
  universityLogo: '/logo.png'
};

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@university.edu',
    name: 'Dr. Rajesh Kumar',
    role: 'super_admin',
    department: 'Administration',
    lastLogin: new Date('2024-11-15T10:30:00')
  },
  {
    id: '2',
    email: 'cs.admin@university.edu',
    name: 'Prof. Sarah Johnson',
    role: 'dept_admin',
    department: 'Computer Science',
    lastLogin: new Date('2024-11-14T14:20:00')
  },
  {
    id: '3',
    email: 'placement@university.edu',
    name: 'Ms. Priya Sharma',
    role: 'view_only',
    department: 'Placement Cell',
    lastLogin: new Date('2024-11-13T09:15:00')
  }
];

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettingsType>(mockSettings);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [activeTab, setActiveTab] = useState('system');
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const user = {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@university.edu',
    role: 'super_admin',
  };

  const handleSettingsChange = (newSettings: Partial<SystemSettingsType>) => {
    setSettings({ ...settings, ...newSettings });
    setHasChanges(true);
  };

  const handleUserChange = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Saving settings:', settings);
      console.log('Saving users:', users);
      
      setHasChanges(false);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportSettings = () => {
    const exportData = {
      settings,
      users: users.map(user => ({
        ...user,
        // Remove sensitive data
        lastLogin: undefined
      })),
      exportedAt: new Date().toISOString(),
      exportedBy: user.name
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `university_settings_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const tabs = [
    {
      id: 'system',
      label: 'System',
      icon: SettingsIcon,
      component: (
        <SystemSettingsComponent
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      )
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      component: (
        <UserManagement
          users={users}
          onUsersChange={handleUserChange}
        />
      )
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      component: (
        <NotificationSettings
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      )
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      component: (
        <SecuritySettings
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      )
    },
    {
      id: 'data',
      label: 'Data',
      icon: Database,
      component: (
        <DataManagement />
      )
    }
  ];

  const pageActions = [
    {
      label: 'Export Config',
      onClick: handleExportSettings,
      icon: Download,
      variant: 'outline' as const
    },
    {
      label: 'Save Changes',
      onClick: handleSaveSettings,
      icon: Save,
      variant: 'primary' as const
    }
  ];

  return (
    <MainLayout user={user}>
      <PageHeader
        title="Settings"
        subtitle="Manage system configuration and user access"
        actions={pageActions}
      />

      <div className="space-y-6">
        {/* Save Status */}
        {hasChanges && (
          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-sm font-medium text-yellow-800">
                  You have unsaved changes
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveSettings}
                isLoading={isLoading}
                icon={Save}
              >
                Save Now
              </Button>
            </div>
          </Card>
        )}

        {/* Settings Tabs */}
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="border-b border-gray-200 p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg data-[state=active]:bg-primary-50 data-[state=active]:text-primary-700"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="p-6">
                {tab.component}
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
