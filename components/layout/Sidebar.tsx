'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MENU_ITEMS } from '@/constants';
import * as Icons from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  userRole?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen = true, 
  onClose,
  userRole = 'super_admin'
}) => {
  const pathname = usePathname();

  const filteredMenuItems = MENU_ITEMS.filter(item => 
    item.roles.includes(userRole as any)
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UPS</span>
              </div>
              <span className="font-semibold text-gray-900">Placement System</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-2">
              {filteredMenuItems.map((item) => {
                const Icon = Icons[item.icon as keyof typeof Icons] as any;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary-50 text-primary-700 border-r-2 border-primary-500"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <p>Version {process.env.NEXT_PUBLIC_VERSION || '1.0.0'}</p>
              <p>&copy; 2024 University</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
