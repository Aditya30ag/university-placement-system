import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { APP_CONFIG } from '@/constants';
import type { Student, Company, Job, Report } from '@/types';

interface ExportOptions {
  filename: string;
  title?: string;
  subtitle?: string;
  includeHeader?: boolean;
  includeLogo?: boolean;
  pageOrientation?: 'portrait' | 'landscape';
}

// PDF Export Utilities
export class PDFExporter {
  private doc: jsPDF;
  
  constructor(orientation: 'portrait' | 'landscape' = 'portrait') {
    this.doc = new jsPDF(orientation, 'mm', 'a4');
  }

  addHeader(title: string, subtitle?: string) {
    // Add university logo if available
    if (APP_CONFIG.university.logo) {
      try {
        this.doc.addImage(APP_CONFIG.university.logo, 'PNG', 20, 15, 30, 15);
      } catch (error) {
        console.warn('Could not add logo to PDF:', error);
      }
    }

    // Add title
    this.doc.setFontSize(18);
    this.doc.setFont(undefined, 'bold');
    this.doc.text(title, APP_CONFIG.university.logo ? 60 : 20, 25);

    // Add subtitle if provided
    if (subtitle) {
      this.doc.setFontSize(12);
      this.doc.setFont(undefined, 'normal');
      this.doc.text(subtitle, APP_CONFIG.university.logo ? 60 : 20, 32);
    }

    // Add university name and generation date
    this.doc.setFontSize(10);
    this.doc.text(APP_CONFIG.university.name, 20, 45);
    this.doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 50);

    return this;
  }

  addTable(headers: string[], data: any[][], startY: number = 60) {
    (this.doc as any).autoTable({
      head: [headers],
      body: data,
      startY: startY,
      theme: 'striped',
      headStyles: {
        fillColor: [14, 165, 233], // Primary blue
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252] // Light gray
      },
      margin: { left: 20, right: 20 },
      didDrawPage: (data: any) => {
        // Add footer
        const pageCount = this.doc.getNumberOfPages();
        this.doc.setFontSize(8);
        this.doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          data.settings.margin.left,
          this.doc.internal.pageSize.height - 10
        );
      }
    });

    return this;
  }

  save(filename: string) {
    this.doc.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
  }

  getBlob(): Blob {
    return this.doc.output('blob');
  }
}

// Excel Export Utilities
export class ExcelExporter {
  private workbook: XLSX.WorkBook;

  constructor() {
    this.workbook = XLSX.utils.book_new();
  }

  addWorksheet(name: string, data: any[], headers?: string[]) {
    let worksheet: XLSX.WorkSheet;

    if (headers) {
      // Create worksheet with custom headers
      worksheet = XLSX.utils.aoa_to_sheet([headers, ...data.map(Object.values)]);
    } else {
      // Create worksheet from JSON data
      worksheet = XLSX.utils.json_to_sheet(data);
    }

    // Auto-fit column widths
    const columnWidths = this.calculateColumnWidths(data, headers);
    worksheet['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(this.workbook, worksheet, name);

    return this;
  }

  private calculateColumnWidths(data: any[], headers?: string[]) {
    const columns = headers || (data.length > 0 ? Object.keys(data[0]) : []);
    
    return columns.map(col => {
      const values = headers 
        ? data.map(row => String(row[columns.indexOf(col)] || ''))
        : data.map(row => String(row[col] || ''));
      
      const maxLength = Math.max(
        col.length,
        ...values.map(val => val.length)
      );
      
      return { width: Math.min(maxLength + 2, 50) };
    });
  }

  save(filename: string) {
    XLSX.writeFile(
      this.workbook, 
      filename.endsWith('.xlsx') ? filename : `${filename}.xlsx`
    );
  }

  getBuffer(): ArrayBuffer {
    return XLSX.write(this.workbook, { bookType: 'xlsx', type: 'array' });
  }
}

// Specific Export Functions
export const exportStudentsToPDF = (students: Student[], options: ExportOptions) => {
  const pdf = new PDFExporter();
  
  pdf.addHeader(
    options.title || 'Student Records',
    options.subtitle || `Generated on ${new Date().toLocaleDateString()}`
  );

  const headers = [
    'Roll Number',
    'Name',
    'Department',
    'Batch',
    'CGPA',
    'Status',
    'PrepCV Score'
  ];

  const data = students.map(student => [
    student.rollNumber,
    student.name,
    student.department,
    student.batch,
    student.cgpa.toFixed(2),
    student.placementStatus.toUpperCase(),
    student.prepCVScore.toString()
  ]);

  pdf.addTable(headers, data);
  pdf.save(options.filename);
};

export const exportStudentsToExcel = (students: Student[], options: ExportOptions) => {
  const excel = new ExcelExporter();
  
  const exportData = students.map(student => ({
    'Roll Number': student.rollNumber,
    'Name': student.name,
    'Email': student.email,
    'Phone': student.phone,
    'Department': student.department,
    'Batch': student.batch,
    'Year': student.year,
    'CGPA': student.cgpa,
    'Placement Status': student.placementStatus,
    'PrepCV Score': student.prepCVScore,
    'PrepCV Completed': student.prepCVCompleted ? 'Yes' : 'No',
    'Test Completed': student.testCompleted ? 'Yes' : 'No',
    'LinkedIn URL': student.linkedinUrl || '',
    'GitHub URL': student.githubUrl || '',
    'Last Updated': student.lastUpdated.toLocaleDateString(),
    'Updated By': student.updatedBy
  }));

  excel.addWorksheet('Student Records', exportData);
  excel.save(options.filename);
};

export const exportCompaniesToPDF = (companies: Company[], options: ExportOptions) => {
  const pdf = new PDFExporter();
  
  pdf.addHeader(
    options.title || 'Company Directory',
    options.subtitle || `Generated on ${new Date().toLocaleDateString()}`
  );

  const headers = [
    'Company Name',
    'Industry',
    'Type',
    'Tier',
    'POCs',
    'Active Jobs',
    'Status'
  ];

  const data = companies.map(company => [
    company.name,
    company.industry,
    company.type.replace('_', ' ').toUpperCase(),
    company.tier.toUpperCase(),
    company.pocs.length.toString(),
    (company.jobs?.filter(j => j.status === 'active').length || 0).toString(),
    company.isActive ? 'ACTIVE' : 'INACTIVE'
  ]);

  pdf.addTable(headers, data);
  pdf.save(options.filename);
};

export const exportJobsToPDF = (jobs: Job[], options: ExportOptions) => {
  const pdf = new PDFExporter();
  
  pdf.addHeader(
    options.title || 'Job Postings',
    options.subtitle || `Generated on ${new Date().toLocaleDateString()}`
  );

  const headers = [
    'Job Title',
    'Location',
    'CTC (₹)',
    'Type',
    'Deadline',
    'Departments',
    'Min CGPA',
    'Status'
  ];

  const data = jobs.map(job => [
    job.title,
    job.location,
    (job.ctc / 100000).toFixed(1) + 'L',
    job.jobType.replace('_', ' ').toUpperCase(),
    job.deadline.toLocaleDateString(),
    job.eligibilityDepartments.join(', '),
    job.minCGPA.toString(),
    job.status.toUpperCase()
  ]);

  pdf.addTable(headers, data);
  pdf.save(options.filename);
};

// HTML to PDF export (for complex layouts)
export const exportHTMLToPDF = async (
  elementId: string, 
  filename: string, 
  options: any = {}
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID '${elementId}' not found`);
  }

  const defaultOptions = {
    margin: 1,
    filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  const pdfOptions = { ...defaultOptions, ...options };

  try {
    await html2pdf().set(pdfOptions).from(element).save();
  } catch (error) {
    console.error('PDF export failed:', error);
    throw new Error('Failed to generate PDF');
  }
};

// Compliance report export
export const exportComplianceReport = (
  departmentData: any[],
  settings: any,
  options: ExportOptions
) => {
  const pdf = new PDFExporter();
  
  pdf.addHeader(
    'NAAC/AICTE Compliance Report',
    `Academic Year: ${new Date().getFullYear()-1}-${new Date().getFullYear()}`
  );

  // Summary section
  const totalStudents = departmentData.reduce((sum, dept) => sum + dept.totalStudents, 0);
  const totalPlaced = departmentData.reduce((sum, dept) => sum + dept.placedStudents, 0);
  const overallPercentage = totalStudents > 0 ? (totalPlaced / totalStudents * 100).toFixed(1) : '0';

  // Add summary
  let currentY = 70;
  pdf.doc.setFontSize(14);
  pdf.doc.setFont(undefined, 'bold');
  pdf.doc.text('Executive Summary', 20, currentY);
  
  currentY += 10;
  pdf.doc.setFontSize(11);
  pdf.doc.setFont(undefined, 'normal');
  pdf.doc.text(`Total Students: ${totalStudents}`, 20, currentY);
  pdf.doc.text(`Students Placed: ${totalPlaced}`, 20, currentY + 7);
  pdf.doc.text(`Overall Placement Rate: ${overallPercentage}%`, 20, currentY + 14);

  // Department-wise table
  const headers = [
    'Department',
    'Total Students',
    'Placed',
    'Placement %',
    'Avg CTC (₹L)',
    'Compliance Status'
  ];

  const data = departmentData.map(dept => [
    dept.department,
    dept.totalStudents.toString(),
    dept.placedStudents.toString(),
    dept.placedPercentage.toFixed(1) + '%',
    (dept.avgCTC / 100000).toFixed(1),
    dept.placedPercentage >= settings.complianceThreshold ? 'COMPLIANT' : 'NON-COMPLIANT'
  ]);

  pdf.addTable(headers, data, currentY + 25);
  pdf.save(options.filename);
};
