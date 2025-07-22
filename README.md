export const README_CONTENT = `
# University Placement System

A modern, comprehensive placement management system built with Next.js, TypeScript, and Tailwind CSS.

## Features

### For Placement Administrators (40-60 yrs, not tech-savvy)
- **Intuitive Dashboard**: Visual overview of placement statistics and key metrics
- **Student Management**: Excel-style interface for managing student data with bulk upload/edit capabilities
- **Company Directory**: Manage company relationships, POCs, and job postings
- **Job Tracking**: Round-wise job pipeline with funnel visualization
- **Reports & Compliance**: Automated report generation for NAAC/AICTE compliance
- **Export Functionality**: All data exportable to PDF/Excel with university branding

### For Students (View-only Dashboard)
- **Personal Dashboard**: Track placement progress and PrepCV scores
- **Application Status**: Real-time updates on job application progress
- **Profile Management**: Update LinkedIn, GitHub, and contact information
- **Resume Management**: Upload and download resume

### For External Auditors (NAAC/AICTE)
- **Compliance Reports**: Downloadable reports with proper formatting
- **Shareable Links**: Tokenized links for secure external access
- **Statistical Overview**: Department-wise placement statistics

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **PDF Export**: html2pdf.js, jsPDF
- **Excel Export**: SheetJS (XLSX)
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages (Static Export)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd university-placement-system
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Copy environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Start development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

\`\`\`bash
npm run build
\`\`\`

## Project Structure

\`\`\`
/app/                   # Next.js app router pages
  /dashboard/          # Main dashboard
  /students/           # Student management
  /companies/          # Company management  
  /job-tracker/        # Job tracking system
  /prep-insights/      # PrepCV analytics
  /reports/            # Report generation
  /settings/           # System settings
  /student-dashboard/  # Student-facing dashboard
/components/           # Reusable components
  /ui/                 # Basic UI components
  /layout/             # Layout components
  /dashboard/          # Dashboard-specific components
  /students/           # Student-specific components
  /companies/          # Company-specific components
  /job-tracker/        # Job tracking components
  /prep-insights/      # Analytics components
  /reports/            # Report components
  /settings/           # Settings components
/lib/                  # Utility functions
/types/                # TypeScript type definitions
/constants/            # Application constants
\`\`\`

## Key Features

### Dashboard
- Real-time placement statistics
- Department-wise performance metrics
- Upcoming deadlines and alerts
- Quick action buttons

### Student Management
- Excel-style bulk editing
- Import/export functionality
- Advanced filtering and search
- Individual student profiles with placement timeline
- PrepCV score tracking

### Company Management
- Company directory with POC management
- Job posting management
- Engagement tracking
- Company-wise placement reports

### Job Tracking
- Visual job pipeline
- Round-wise student progression
- Funnel analysis
- Bulk job upload from Excel

### PrepCV Insights
- Student engagement analytics
- Department-wise completion rates
- Compliance monitoring
- Trend analysis

### Reports
- Automated report generation
- Multiple export formats (PDF/Excel)
- Shareable links with expiration
- Custom report scheduling
- NAAC/AICTE compliance reports

### Settings
- User management and roles
- System configuration
- Security settings
- Data backup and restore
- Notification preferences

## User Roles

1. **Super Admin**: Full system access and configuration
2. **Department Admin**: Department-specific management
3. **View Only**: Read-only access to reports and data
4. **Student**: Personal dashboard access
5. **Auditor**: Compliance report access

## Data Export

All modules support export functionality:
- **PDF**: Formatted reports with university branding
- **Excel**: Detailed data with multiple sheets
- **CSV**: Raw data for external processing

## Responsive Design

- **Desktop-first**: Optimized for admin workflows
- **Mobile-friendly**: Accessible on all devices
- **Print-friendly**: Clean printing layouts
- **Accessibility**: WCAG compliant with keyboard navigation

## Security Features

- Role-based access control
- Secure shareable links with expiration
- Data validation and sanitization
- Error boundary protection
- Audit logging capabilities

## Performance

- Static site generation for fast loading
- Optimized images and assets
- Efficient data structures
- Lazy loading for large datasets
- CDN-ready deployment

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## Support

For support and questions:
- Create an issue in the repository
- Contact the university IT team
- Check the documentation in \`/docs\` folder

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- University IT Team
- Placement Cell Staff
- Student Feedback
- Open Source Community
`;
