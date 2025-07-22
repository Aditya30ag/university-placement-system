'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Database,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  HardDrive
} from 'lucide-react';

export const DataManagement: React.FC = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const handleBackup = async () => {
    setIsBackingUp(true);
    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Backup completed successfully!');
    } catch (error) {
      alert('Backup failed. Please try again.');
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleRestore = async () => {
    if (!confirm('Are you sure? This will restore the database to a previous state.')) {
      return;
    }
    
    setIsRestoring(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      alert('Database restored successfully!');
    } catch (error) {
      alert('Restore failed. Please contact support.');
    } finally {
      setIsRestoring(false);
    }
  };

  const backups = [
    {
      id: '1',
      name: 'Auto Backup - 2024-11-15',
      date: new Date('2024-11-15T02:00:00'),
      size: '145 MB',
      type: 'automatic'
    },
    {
      id: '2', 
      name: 'Manual Backup - 2024-11-14',
      date: new Date('2024-11-14T16:30:00'),
      size: '142 MB',
      type: 'manual'
    },
    {
      id: '3',
      name: 'Pre-Update Backup - 2024-11-10',
      date: new Date('2024-11-10T10:15:00'),
      size: '138 MB',
      type: 'system'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Database Status */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">Database Status</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-semibold text-green-900">Healthy</div>
            <div className="text-sm text-green-700">Database Status</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <HardDrive className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-semibold text-blue-900">2.4 GB</div>
            <div className="text-sm text-blue-700">Database Size</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <RefreshCw className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-semibold text-purple-900">2 hours ago</div>
            <div className="text-sm text-purple-700">Last Backup</div>
          </div>
        </div>
      </Card>

      {/* Backup Management */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Backup Management</h3>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={handleBackup}
              isLoading={isBackingUp}
              icon={Download}
            >
              Create Backup
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          {backups.map((backup) => (
            <div key={backup.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{backup.name}</div>
                <div className="text-sm text-gray-500">
                  {backup.date.toLocaleString()} • {backup.size}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant={backup.type === 'automatic' ? 'success' : backup.type === 'manual' ? 'info' : 'warning'}>
                  {backup.type}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`/backups/${backup.id}`, '_blank')}
                  icon={Download}
                  className="!p-1"
                >
                  <span className="sr-only">Download</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRestore}
                  isLoading={isRestoring}
                  icon={RefreshCw}
                  className="!p-1"
                >
                  <span className="sr-only">Restore</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Data Import/Export */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Import/Export</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Export Data</h4>
            <p className="text-sm text-gray-500">
              Export your data in various formats for external use or migration.
            </p>
            <div className="space-y-2">
              <Button variant="outline" icon={Download} className="w-full justify-start">
                Export All Student Data
              </Button>
              <Button variant="outline" icon={Download} className="w-full justify-start">
                Export Company Records
              </Button>
              <Button variant="outline" icon={Download} className="w-full justify-start">
                Export Placement Reports
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Import Data</h4>
            <p className="text-sm text-gray-500">
              Import data from external systems or previous backups.
            </p>
            <div className="space-y-2">
              <Button variant="outline" icon={Upload} className="w-full justify-start">
                Import Student Data
              </Button>
              <Button variant="outline" icon={Upload} className="w-full justify-start">
                Import Company Records
              </Button>
              <Button variant="outline" icon={Upload} className="w-full justify-start">
                Import Job Postings
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-medium text-red-900">Danger Zone</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-900">Reset All Data</h4>
                <p className="text-sm text-red-700">
                  This will permanently delete all data and reset the system to its initial state.
                </p>
              </div>
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
                onClick={() => {
                  if (confirm('This action cannot be undone. Type "RESET" to confirm.')) {
                    const input = prompt('Type "RESET" to confirm:');
                    if (input === 'RESET') {
                      alert('This is a demo. Reset functionality disabled.');
                    }
                  }
                }}
              >
                Reset System
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

