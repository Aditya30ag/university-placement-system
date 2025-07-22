'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { MapPin, Calendar, DollarSign, Briefcase, Search } from 'lucide-react'

interface JobPosting {
  id: string
  title: string
  companyId: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  salary: {
    min: number
    max: number
    currency: string
  }
  postedDate: string
  deadline: string
  description: string
  requirements: string[]
  benefits: string[]
  status: 'active' | 'closed' | 'draft'
}

interface CompanyJobPostingsProps {
  companyId: string
}

export function CompanyJobPostings({ companyId }: CompanyJobPostingsProps) {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [jobTypeFilter, setJobTypeFilter] = useState<string>('all')

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        setLoading(true)
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/companies/${companyId}/jobs`)
        // const data = await response.json()
        
        // Mock data for now
        const mockJobPostings: JobPosting[] = [
          {
            id: '1',
            title: 'Senior Software Engineer',
            companyId: companyId,
            location: 'San Francisco, CA',
            type: 'full-time',
            salary: { min: 120000, max: 180000, currency: 'USD' },
            postedDate: '2024-01-15',
            deadline: '2024-03-15',
            description: 'We are looking for a Senior Software Engineer to join our team...',
            requirements: ['5+ years experience', 'React/Node.js', 'AWS', 'Agile'],
            benefits: ['Health insurance', '401k', 'Remote work', 'Stock options'],
            status: 'active'
          },
          {
            id: '2',
            title: 'Frontend Developer Intern',
            companyId: companyId,
            location: 'Remote',
            type: 'internship',
            salary: { min: 25, max: 35, currency: 'USD' },
            postedDate: '2024-01-20',
            deadline: '2024-02-20',
            description: 'Join our frontend team as an intern and learn modern web development...',
            requirements: ['JavaScript', 'React basics', 'CSS/HTML', 'Student status'],
            benefits: ['Mentorship', 'Flexible hours', 'Potential full-time offer'],
            status: 'active'
          },
          {
            id: '3',
            title: 'DevOps Engineer',
            companyId: companyId,
            location: 'New York, NY',
            type: 'full-time',
            salary: { min: 130000, max: 160000, currency: 'USD' },
            postedDate: '2024-01-10',
            deadline: '2024-03-10',
            description: 'Help us build and maintain our cloud infrastructure...',
            requirements: ['Docker', 'Kubernetes', 'AWS/GCP', 'CI/CD'],
            benefits: ['Competitive salary', 'Health benefits', 'Professional development'],
            status: 'active'
          }
        ]
        
        setJobPostings(mockJobPostings)
        setFilteredJobs(mockJobPostings)
      } catch (err) {
        setError('Failed to load job postings')
        console.error('Error fetching job postings:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchJobPostings()
  }, [companyId])

  useEffect(() => {
    const filtered = jobPostings.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesType = jobTypeFilter === 'all' || job.type === jobTypeFilter
      
      return matchesSearch && matchesType
    })
    
    setFilteredJobs(filtered)
  }, [jobPostings, searchTerm, jobTypeFilter])

  const formatSalary = (salary: JobPosting['salary']) => {
    return `${salary.currency}${salary.min.toLocaleString()} - ${salary.currency}${salary.max.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getJobTypeColor = (type: JobPosting['type']) => {
    switch (type) {
      case 'full-time': return 'bg-blue-100 text-blue-800'
      case 'part-time': return 'bg-green-100 text-green-800'
      case 'contract': return 'bg-purple-100 text-purple-800'
      case 'internship': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <Card>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Job Postings</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Job Postings</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Postings</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select 
            value={jobTypeFilter} 
            onChange={(e) => setJobTypeFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'full-time', label: 'Full Time' },
              { value: 'part-time', label: 'Part Time' },
              { value: 'contract', label: 'Contract' },
              { value: 'internship', label: 'Internship' }
            ]}
            className="w-full sm:w-48"
          />
        </div>
      </div>
      <div>
        {filteredJobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No job postings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.type.replace('-', ' ')}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {formatSalary(job.salary)}
                      </div>
                    </div>
                  </div>
                  <Badge variant="default" className={getJobTypeColor(job.type)}>
                    {job.type.replace('-', ' ')}
                  </Badge>
                </div>
                
                <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                  {job.requirements.length > 3 && (
                    <Badge variant="default" className="text-xs">
                      +{job.requirements.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Posted {formatDate(job.postedDate)}
                  </div>
                  <div>
                    Deadline: {formatDate(job.deadline)}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="flex-1">
                    Apply Now
                  </Button>
                                    <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
} 