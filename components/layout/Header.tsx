'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, User, Settings, LogOut, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { APP_CONFIG } from '@/constants';

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onMenuClick?: () => void;
  onExport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  onMenuClick,
  onExport 
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    const titles: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/students': 'Students',
      '/companies': 'Companies',
      '/job-tracker': 'Job Tracker',
      '/prep-insights': 'PrepCV Insights',
      '/reports': 'Reports',
      '/settings': 'Settings'
    };
    return titles[path] || 'Dashboard';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            icon={Menu}
            className="lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
          </Button>
          
          <div className="flex items-center space-x-3">
            <img
              src={APP_CONFIG.university.logo}
              alt={APP_CONFIG.university.name}
              className="h-8 w-8"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-gray-900">
                {getPageTitle(pathname)}
              </h1>
              <p className="text-sm text-gray-500">
                {APP_CONFIG.university.name}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              icon={Download}
            >
              Export
            </Button>
          )}

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 text-sm rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                ) : (
                  user?.name.split(' ').map(n => n[0]).join('').toUpperCase()
                )}
              </div>
              <div className="hidden lg:block text-left">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="mr-3 h-4 w-4" />
                  Your Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </Link>
                <hr className="my-1" />
                <button className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
