'use client';
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import {
  Plus,
  Download,
  Filter,
  Building2,
  Users,
  MapPin,
  Calendar,
  Edit,
  Eye
} from 'lucide-react';
import { CompanyCard } from '@/components/companies/CompanyCard';
import { CompanyForm } from '@/components/companies/CompanyForm';
import type { Company, CompanyFilters } from '@/types';

// Mock data
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Microsoft',
    logo: '/logos/microsoft.png',
    website: 'https://microsoft.com',
    industry: 'Technology',
    type: 'dream',
    tier: 'tier1',
    lastContactDate: new Date('2024-11-10'),
    isActive: true,
    createdAt: new Date('2024-01-15'),
    pocs: [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@microsoft.com',
        designation: 'Senior Recruiter',
        isPrimary: true,
        companyId: '1'
      }
    ],
    jobs: []
  },
  {
    id: '2',
    name: 'TCS',
    website: 'https://tcs.com',
    industry: 'IT Services',
    type: 'mass_recruiter',
    tier: 'tier2',
    lastContactDate: new Date('2024-11-05'),
    isActive: true,
    createdAt: new Date('2024-01-20'),
    pocs: [
      {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya.sharma@tcs.com',
        designation: 'HR Manager',
        isPrimary: true,
        companyId: '2'
      }
    ],
    jobs: []
  }
];

const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(mockCompanies);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<CompanyFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const user = {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@university.edu',
    role: 'super_admin',
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, companies]);

  const applyFilters = () => {
    let filtered = companies;

    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(company => company.type === filters.type);
    }

    if (filters.tier) {
      filtered = filtered.filter(company => company.tier === filters.tier);
    }

    if (filters.industry) {
      filtered = filtered.filter(company => company.industry === filters.industry);
    }

    if (filters.isActive !== undefined) {
      filtered = filtered.filter(company => company.isActive === filters.isActive);
    }

    setFilteredCompanies(filtered);
  };

  const handleAddCompany = (companyData: any) => {
    const newCompany: Company = {
      id: Date.now().toString(),
      ...companyData,
      isActive: true,
      createdAt: new Date(),
      pocs: [],
      jobs: []
    };
    setCompanies([...companies, newCompany]);
    setShowCompanyForm(false);
  };

  const handleEditCompany = (companyData: any) => {
    if (!selectedCompany) return;
    
    const updatedCompanies = companies.map(company =>
      company.id === selectedCompany.id
        ? { ...company, ...companyData }
        : company
    );
    setCompanies(updatedCompanies);
    setShowCompanyForm(false);
    setSelectedCompany(undefined);
  };

  const pageActions = [
    {
      label: 'Add Company',
      onClick: () => {
        setSelectedCompany(undefined);
        setShowCompanyForm(true);
      },
      icon: Plus,
      variant: 'primary' as const
    },
    {
      label: 'Export',
      onClick: () => {
        // Implement export logic
        console.log('Exporting companies...');
      },
      icon: Download,
      variant: 'outline' as const
    }
  ];

  return (
    <MainLayout user={user}>
      <PageHeader
        title="Companies"
        subtitle={`${filteredCompanies.length} companies • ${filteredCompanies.filter(c => c.isActive).length} active`}
        actions={pageActions}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search companies by name or industry..."
              value={searchTerm}
              onChange={setSearchTerm}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              icon={Filter}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4">
            <Card className="p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select
                  label="Type"
                  options={[
                    { value: 'dream', label: 'Dream Company' },
                    { value: 'mass_recruiter', label: 'Mass Recruiter' },
                    { value: 'core', label: 'Core Company' },
                    { value: 'startup', label: 'Startup' }
                  ]}
                  value={filters.type || ''}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
                />
                
                <Select
                  label="Tier"
                  options={[
                    { value: 'tier1', label: 'Tier 1' },
                    { value: 'tier2', label: 'Tier 2' },
                    { value: 'tier3', label: 'Tier 3' }
                  ]}
                  value={filters.tier || ''}
                  onChange={(e) => setFilters({ ...filters, tier: e.target.value as any })}
                />
                
                <Select
                  label="Status"
                  options={[
                    { value: 'true', label: 'Active' },
                    { value: 'false', label: 'Inactive' }
                  ]}
                  value={filters.isActive?.toString() || ''}
                  onChange={(e) => setFilters({ ...filters, isActive: e.target.value === 'true' })}
                />

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => setFilters({})}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </PageHeader>

      <div className="space-y-6">
        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onEdit={() => {
                setSelectedCompany(company);
                setShowCompanyForm(true);
              }}
              onView={() => {
                window.location.href = `/companies/${company.id}`;
              }}
            />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <Card className="p-12 text-center">
            <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || Object.keys(filters).length > 0
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first company'}
            </p>
            <Button onClick={() => setShowCompanyForm(true)} icon={Plus}>
              Add Company
            </Button>
          </Card>
        )}
      </div>

      {/* Company Form Modal */}
      <Modal
        isOpen={showCompanyForm}
        onClose={() => {
          setShowCompanyForm(false);
          setSelectedCompany(undefined);
        }}
        title={selectedCompany ? 'Edit Company' : 'Add Company'}
        size="lg"
      >
        <CompanyForm
          company={selectedCompany}
          onSubmit={selectedCompany ? handleEditCompany : handleAddCompany}
          onCancel={() => {
            setShowCompanyForm(false);
            setSelectedCompany(undefined);
          }}
        />
      </Modal>
    </MainLayout>
  );
};

export default CompaniesPage;
