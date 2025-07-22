'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Table } from '@/components/ui/Table';
import { Plus, Edit, Trash2, UserPlus } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import type { User } from '@/types';
import { DEPARTMENTS } from '@/types';

interface UserManagementProps {
  users: User[];
  onUsersChange: (users: User[]) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({
  users,
  onUsersChange
}) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddUser = (userData: any) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      lastLogin: undefined
    };
    onUsersChange([...users, newUser]);
    setShowUserForm(false);
  };

  const handleEditUser = (userData: any) => {
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user =>
      user.id === selectedUser.id ? { ...user, ...userData } : user
    );
    onUsersChange(updatedUsers);
    setShowUserForm(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      onUsersChange(users.filter(user => user.id !== userId));
    }
  };

  const getRoleColor = (role: string) => {
    const colors = {
      super_admin: 'error',
      dept_admin: 'warning',
      view_only: 'info'
    };
    return colors[role as keyof typeof colors] || 'default';
  };

  const columns = [
    {
      key: 'name',
      header: 'User',
      render: (value: string, user: User) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Role',
      render: (value: string) => (
        <Badge variant={getRoleColor(value) as any}>
          {value.replace('_', ' ').toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'department',
      header: 'Department',
      render: (value: string) => value || 'N/A'
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      render: (value: Date | undefined) => 
        value ? formatDateTime(value) : 'Never'
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (value: any, user: User) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedUser(user);
              setShowUserForm(true);
            }}
            icon={Edit}
            className="!p-1"
          >
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteUser(user.id)}
            icon={Trash2}
            className="!p-1 text-red-600 hover:text-red-700"
          >
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">User Management</h3>
          <p className="text-sm text-gray-500">Manage system users and their permissions</p>
        </div>
        <Button
          onClick={() => {
            setSelectedUser(null);
            setShowUserForm(true);
          }}
          icon={Plus}
        >
          Add User
        </Button>
      </div>

      <Card>
        <Table
          data={users}
          columns={columns}
          emptyMessage="No users found"
        />
      </Card>

      {/* User Form Modal */}
      <Modal
        isOpen={showUserForm}
        onClose={() => {
          setShowUserForm(false);
          setSelectedUser(null);
        }}
        title={selectedUser ? 'Edit User' : 'Add User'}
      >
        <UserForm
          user={selectedUser}
          onSubmit={selectedUser ? handleEditUser : handleAddUser}
          onCancel={() => {
            setShowUserForm(false);
            setSelectedUser(null);
          }}
        />
      </Modal>
    </div>
  );
};

// UserForm component (inline for brevity)
const UserForm: React.FC<{
    user?: User | null;
    onSubmit: (data: any) => void;
    onCancel: () => void;
  }> = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'view_only',
      department: user?.department || ''
    });
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    const roleOptions = [
      { value: 'super_admin', label: 'Super Admin' },
      { value: 'dept_admin', label: 'Department Admin' },
      { value: 'view_only', label: 'View Only' }
    ];
  
    const departmentOptions = [
      { value: '', label: 'No Department' },
      ...DEPARTMENTS.map(dept => ({ value: dept, label: dept }))
    ];
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        
        <Input
          label="Email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        
        <Select
          label="Role"
          required
          options={roleOptions}
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
        />
        
        <Select
          label="Department"
          options={departmentOptions}
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        />
  
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {user ? 'Update User' : 'Add User'}
          </Button>
        </div>
      </form>
    );
  };
  