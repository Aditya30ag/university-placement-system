'use client';
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { 
  Upload, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  FileText,
  Users
} from 'lucide-react';
import * as XLSX from 'xlsx';
import type { Student } from '@/types';
import { DEPARTMENTS, BATCH_YEARS } from '@/types';

interface BulkUploadProps {
  onUpload: (students: Student[]) => void;
  onCancel: () => void;
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

interface ParsedRow {
  [key: string]: any;
}

export const BulkUpload: React.FC<BulkUploadProps> = ({
  onUpload,
  onCancel
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedRow[]>([]);
  const [validStudents, setValidStudents] = useState<Student[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [step, setStep] = useState<'upload' | 'validate' | 'confirm'>('upload');

  const expectedColumns = [
    'rollNumber',
    'name', 
    'email',
    'phone',
    'department',
    'batch',
    'year',
    'cgpa',
    'linkedinUrl',
    'githubUrl'
  ];

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStep('upload');
      setParsedData([]);
      setValidStudents([]);
      setErrors([]);
    }
  }, []);

  const downloadTemplate = () => {
    const template = [
      {
        rollNumber: 'CS2020001',
        name: 'John Doe',
        email: 'john.doe@student.edu',
        phone: '9876543210',
        department: 'Computer Science',
        batch: '2020-2024',
        year: 2024,
        cgpa: 8.5,
        linkedinUrl: 'https://linkedin.com/in/johndoe',
        githubUrl: 'https://github.com/johndoe'
      },
      {
        rollNumber: 'IT2020002',
        name: 'Jane Smith',
        email: 'jane.smith@student.edu',
        phone: '9876543211',
        department: 'Information Technology',
        batch: '2020-2024',
        year: 2024,
        cgpa: 9.0,
        linkedinUrl: '',
        githubUrl: ''
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'student_upload_template.xlsx');
  };

  const validateRow = (row: ParsedRow, index: number): ValidationError[] => {
    const rowErrors: ValidationError[] = [];
    const rowNum = index + 2; // +2 for header row and 0-based index

    // Required fields validation
    if (!row.rollNumber?.trim()) {
      rowErrors.push({ row: rowNum, field: 'rollNumber', message: 'Roll number is required' });
    } else if (!/^[A-Z0-9]{6,12}$/.test(row.rollNumber.trim())) {
      rowErrors.push({ row: rowNum, field: 'rollNumber', message: 'Invalid roll number format' });
    }

    if (!row.name?.trim()) {
      rowErrors.push({ row: rowNum, field: 'name', message: 'Name is required' });
    }

    if (!row.email?.trim()) {
      rowErrors.push({ row: rowNum, field: 'email', message: 'Email is required' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email.trim())) {
      rowErrors.push({ row: rowNum, field: 'email', message: 'Invalid email format' });
    }

    if (!row.phone?.toString().trim()) {
      rowErrors.push({ row: rowNum, field: 'phone', message: 'Phone is required' });
    } else if (!/^[6-9]\d{9}$/.test(row.phone.toString().trim())) {
      rowErrors.push({ row: rowNum, field: 'phone', message: 'Invalid phone format' });
    }

    if (!row.department?.trim()) {
      rowErrors.push({ row: rowNum, field: 'department', message: 'Department is required' });
    } else if (!DEPARTMENTS.includes(row.department.trim())) {
      rowErrors.push({ row: rowNum, field: 'department', message: 'Invalid department' });
    }

    if (!row.batch?.trim()) {
      rowErrors.push({ row: rowNum, field: 'batch', message: 'Batch is required' });
    } else if (!BATCH_YEARS.includes(row.batch.trim())) {
      rowErrors.push({ row: rowNum, field: 'batch', message: 'Invalid batch' });
    }

    const year = parseInt(row.year);
    if (!year || year < 2020 || year > 2030) {
      rowErrors.push({ row: rowNum, field: 'year', message: 'Invalid year (2020-2030)' });
    }

    const cgpa = parseFloat(row.cgpa);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
      rowErrors.push({ row: rowNum, field: 'cgpa', message: 'Invalid CGPA (0-10)' });
    }

    // Optional URL validation
    if (row.linkedinUrl?.trim() && !/^https?:\/\/.+/.test(row.linkedinUrl.trim())) {
      rowErrors.push({ row: rowNum, field: 'linkedinUrl', message: 'Invalid LinkedIn URL' });
    }

    if (row.githubUrl?.trim() && !/^https?:\/\/.+/.test(row.githubUrl.trim())) {
      rowErrors.push({ row: rowNum, field: 'githubUrl', message: 'Invalid GitHub URL' });
    }

    return rowErrors;
  };

  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setParsedData(jsonData as ParsedRow[]);
      
      // Validate data
      const allErrors: ValidationError[] = [];
      const validData: Student[] = [];

      jsonData.forEach((row: any, index) => {
        const rowErrors = validateRow(row, index);
        allErrors.push(...rowErrors);

        if (rowErrors.length === 0) {
          const student: Student = {
            id: Date.now().toString() + index,
            rollNumber: row.rollNumber.trim(),
            name: row.name.trim(),
            email: row.email.trim(),
            phone: row.phone.toString().trim(),
            department: row.department.trim(),
            batch: row.batch.trim(),
            year: parseInt(row.year),
            cgpa: parseFloat(row.cgpa),
            placementStatus: 'unplaced',
            linkedinUrl: row.linkedinUrl?.trim() || undefined,
            githubUrl: row.githubUrl?.trim() || undefined,
            prepCVScore: 0,
            prepCVCompleted: false,
            testCompleted: false,
            lastUpdated: new Date(),
            updatedBy: 'bulk_upload',
            jobApplications: []
          };
          validData.push(student);
        }
      });

      setErrors(allErrors);
      setValidStudents(validData);
      setStep('validate');
    } catch (error) {
      console.error('File processing error:', error);
      alert('Error processing file. Please ensure it\'s a valid Excel file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmUpload = () => {
    onUpload(validStudents);
  };

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Student Data</h3>
        <p className="text-sm text-gray-500 mb-4">
          Upload an Excel file with student information. Download our template to get started.
        </p>
      </div>

      <div className="space-y-4">
        <Button
          variant="outline"
          onClick={downloadTemplate}
          icon={Download}
          className="w-full"
        >
          Download Template
        </Button>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer block text-center"
          >
            {file ? (
              <div className="space-y-2">
                <FileText className="mx-auto h-8 w-8 text-green-500" />
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">Click to select a different file</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="text-sm">Click to select an Excel file</p>
                <p className="text-xs text-gray-500">XLSX or XLS files only</p>
              </div>
            )}
          </label>
        </div>

        {file && (
          <Button
            onClick={processFile}
            isLoading={isProcessing}
            className="w-full"
          >
            Process File
          </Button>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Required Columns:</h4>
        <div className="grid grid-cols-2 gap-1 text-sm text-blue-800">
          {expectedColumns.map(col => (
            <div key={col}>• {col}</div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderValidationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">{validStudents.length} Valid</span>
          </div>
          <div className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium">{errors.length} Errors</span>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <Card className="p-4 bg-red-50 border-red-200">
          <h4 className="font-medium text-red-900 mb-2">Validation Errors:</h4>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {errors.slice(0, 10).map((error, index) => (
              <div key={index} className="text-sm text-red-800">
                Row {error.row}, {error.field}: {error.message}
              </div>
            ))}
            {errors.length > 10 && (
              <div className="text-sm text-red-600 font-medium">
                And {errors.length - 10} more errors...
              </div>
            )}
          </div>
        </Card>
      )}

      {validStudents.length > 0 && (
        <Card className="p-4 bg-green-50 border-green-200">
          <h4 className="font-medium text-green-900 mb-2">
            Ready to Import: {validStudents.length} students
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium">Departments:</div>
              {Object.entries(
                validStudents.reduce((acc, student) => {
                  acc[student.department] = (acc[student.department] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([dept, count]) => (
                <div key={dept} className="text-green-800">
                  {dept}: {count}
                </div>
              ))}
            </div>
            <div>
              <div className="font-medium">Batches:</div>
              {Object.entries(
                validStudents.reduce((acc, student) => {
                  acc[student.batch] = (acc[student.batch] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([batch, count]) => (
                <div key={batch} className="text-green-800">
                  {batch}: {count}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep('upload')}
        >
          Back to Upload
        </Button>
        <Button
          onClick={handleConfirmUpload}
          disabled={validStudents.length === 0}
          icon={Users}
        >
          Import {validStudents.length} Students
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {step === 'upload' && renderUploadStep()}
      {step === 'validate' && renderValidationStep()}

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

