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
  XCircle,
  FileText,
  Target
} from 'lucide-react';
import * as XLSX from 'xlsx';
import type { Job } from '@/types';

interface BulkJobUploadProps {
  onUpload: (jobs: Job[]) => void;
  onCancel: () => void;
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export const BulkJobUpload: React.FC<BulkJobUploadProps> = ({
  onUpload,
  onCancel
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validJobs, setValidJobs] = useState<Job[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [step, setStep] = useState<'upload' | 'validate' | 'confirm'>('upload');

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStep('upload');
      setValidJobs([]);
      setErrors([]);
    }
  }, []);

  const downloadTemplate = () => {
    const template = [
      {
        title: 'Software Engineer',
        description: 'Full-stack development role with React and Node.js',
        requirements: 'React, Node.js, MongoDB',
        ctc: 1200000,
        location: 'Bangalore',
        jobType: 'full_time',
        eligibilityDepartments: 'Computer Science,Information Technology',
        minCGPA: 7.0,
        deadline: '2024-12-31'
      },
      {
        title: 'Data Analyst Intern',
        description: 'Work with data analysis and visualization',
        requirements: 'Python, SQL, Excel',
        ctc: 300000,
        location: 'Mumbai',
        jobType: 'internship',
        eligibilityDepartments: 'Computer Science,Statistics',
        minCGPA: 6.5,
        deadline: '2024-11-30'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Jobs');
    XLSX.writeFile(wb, 'job_upload_template.xlsx');
  };

  const validateRow = (row: any, index: number): ValidationError[] => {
    const rowErrors: ValidationError[] = [];
    const rowNum = index + 2;

    if (!row.title?.trim()) {
      rowErrors.push({ row: rowNum, field: 'title', message: 'Job title is required' });
    }

    if (!row.description?.trim()) {
      rowErrors.push({ row: rowNum, field: 'description', message: 'Description is required' });
    }

    if (!row.ctc || isNaN(parseFloat(row.ctc))) {
      rowErrors.push({ row: rowNum, field: 'ctc', message: 'Valid CTC is required' });
    }

    if (!row.location?.trim()) {
      rowErrors.push({ row: rowNum, field: 'location', message: 'Location is required' });
    }

    if (!['full_time', 'internship', 'contract'].includes(row.jobType)) {
      rowErrors.push({ row: rowNum, field: 'jobType', message: 'Invalid job type' });
    }

    const cgpa = parseFloat(row.minCGPA);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
      rowErrors.push({ row: rowNum, field: 'minCGPA', message: 'CGPA must be between 0-10' });
    }

    if (!row.deadline) {
      rowErrors.push({ row: rowNum, field: 'deadline', message: 'Deadline is required' });
    } else if (isNaN(Date.parse(row.deadline))) {
      rowErrors.push({ row: rowNum, field: 'deadline', message: 'Invalid deadline format' });
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

      const allErrors: ValidationError[] = [];
      const validData: Job[] = [];

      jsonData.forEach((row: any, index) => {
        const rowErrors = validateRow(row, index);
        allErrors.push(...rowErrors);

        if (rowErrors.length === 0) {
          const job: Job = {
            id: Date.now().toString() + index,
            companyId: 'bulk_upload',
            title: row.title.trim(),
            description: row.description.trim(),
            requirements: row.requirements ? row.requirements.split(',').map((r: string) => r.trim()) : [],
            ctc: parseFloat(row.ctc),
            location: row.location.trim(),
            jobType: row.jobType,
            eligibilityDepartments: row.eligibilityDepartments 
              ? row.eligibilityDepartments.split(',').map((d: string) => d.trim()) 
              : [],
            minCGPA: parseFloat(row.minCGPA),
            deadline: new Date(row.deadline),
            status: 'active',
            rounds: [],
            createdAt: new Date()
          };
          validData.push(job);
        }
      });

      setErrors(allErrors);
      setValidJobs(validData);
      setStep('validate');
    } catch (error) {
      console.error('File processing error:', error);
      alert('Error processing file. Please ensure it\'s a valid Excel file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmUpload = () => {
    onUpload(validJobs);
  };

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Job Data</h3>
        <p className="text-sm text-gray-500 mb-4">
          Upload an Excel file with job postings. Download our template to get started.
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
    </div>
  );

  const renderValidationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">{validJobs.length} Valid</span>
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

      {validJobs.length > 0 && (
        <Card className="p-4 bg-green-50 border-green-200">
          <h4 className="font-medium text-green-900 mb-2">
            Ready to Import: {validJobs.length} jobs
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium">Job Types:</div>
              {Object.entries(
                validJobs.reduce((acc, job) => {
                  acc[job.jobType] = (acc[job.jobType] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([type, count]) => (
                <div key={type} className="text-green-800">
                  {type.replace('_', ' ')}: {count}
                </div>
              ))}
            </div>
            <div>
              <div className="font-medium">Locations:</div>
              {Object.entries(
                validJobs.reduce((acc, job) => {
                  acc[job.location] = (acc[job.location] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).slice(0, 5).map(([location, count]) => (
                <div key={location} className="text-green-800">
                  {location}: {count}
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
          disabled={validJobs.length === 0}
          icon={Target}
        >
          Import {validJobs.length} Jobs
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
