'use client';
import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onExport?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  user,
  onExport 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole={user?.role}
      />
      
      <div className="lg:pl-64">
        <Header
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
          onExport={onExport}
        />
        
        <main className="px-4 lg:px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

