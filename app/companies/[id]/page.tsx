import { Card } from '@/components/ui/Card'
import { CompanyProfile } from '@/components/companies/CompanyProfile'
import { CompanyJobPostings } from '@/components/companies/CompanyJobPostings'

interface CompanyDetailPageProps {
  params: {
    id: string
  }
}

// Generate static params for known company IDs
export async function generateStaticParams() {
  // These IDs are based on the mock data in the companies page
  const companyIds = ['1', '2']
  
  return companyIds.map((id) => ({
    id: id,
  }))
}

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Company Details</h1>
        <p className="text-gray-600 mt-2">Company ID: {params.id}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CompanyProfile companyId={params.id} />
        </Card>
        <Card>
          <CompanyJobPostings companyId={params.id} />
        </Card>
      </div>
    </div>
  )
} 