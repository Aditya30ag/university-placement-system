import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckCircle, XCircle, AlertTriangle, Download } from 'lucide-react';
import type { DepartmentCompletion } from '@/types';

interface ComplianceReportProps {
  departmentData: DepartmentCompletion[];
  complianceThreshold: number;
}

export const ComplianceReport: React.FC<ComplianceReportProps> = ({
  departmentData,
  complianceThreshold
}) => {
  const compliantDepartments = departmentData.filter(
    dept => dept.completionPercentage >= complianceThreshold
  );
  
  const nonCompliantDepartments = departmentData.filter(
    dept => dept.completionPercentage < complianceThreshold
  );

  const overallCompliance = (compliantDepartments.length / departmentData.length) * 100;

  const getComplianceIcon = (isCompliant: boolean) => {
    return isCompliant ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  const handleExportCompliance = () => {
    // Generate compliance report
    const reportData = departmentData.map(dept => ({
      Department: dept.department,
      'Total Students': dept.totalStudents,
      'Tests Completed': dept.testsCompleted,
      'Resumes Uploaded': dept.resumesUploaded,
      'Completion %': dept.completionPercentage.toFixed(1),
      'Compliance Status': dept.completionPercentage >= complianceThreshold ? 'Compliant' : 'Non-Compliant'
    }));

    const csvContent = [
      Object.keys(reportData[0]).join(','),
      ...reportData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Compliance Report</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCompliance}
          icon={Download}
        >
          Export
        </Button>
      </div>

      {/* Overall Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Compliance</span>
          <Badge 
            variant={overallCompliance >= 70 ? 'success' : overallCompliance >= 50 ? 'warning' : 'error'}
          >
            {overallCompliance.toFixed(1)}%
          </Badge>
        </div>
        <div className="text-xs text-gray-500">
          {compliantDepartments.length} of {departmentData.length} departments meeting {complianceThreshold}% threshold
        </div>
      </div>

      {/* Compliant Departments */}
      {compliantDepartments.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-green-900 mb-3 flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Compliant Departments ({compliantDepartments.length})
          </h4>
          <div className="space-y-2">
            {compliantDepartments.map(dept => (
              <div key={dept.department} className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm font-medium text-green-800">{dept.department}</span>
                <Badge variant="success">{dept.completionPercentage.toFixed(1)}%</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Non-Compliant Departments */}
      {nonCompliantDepartments.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-red-900 mb-3 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Needs Attention ({nonCompliantDepartments.length})
          </h4>
          <div className="space-y-2">
            {nonCompliantDepartments.map(dept => (
              <div key={dept.department} className="flex items-center justify-between p-2 bg-red-50 rounded">
                <div>
                  <span className="text-sm font-medium text-red-800">{dept.department}</span>
                  <div className="text-xs text-red-600">
                    Gap: {(complianceThreshold - dept.completionPercentage).toFixed(1)}% points
                  </div>
                </div>
                <Badge variant="error">{dept.completionPercentage.toFixed(1)}%</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Items */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="text-sm font-medium text-blue-900 mb-2">Recommended Actions:</h5>
        <ul className="text-xs text-blue-800 space-y-1">
          {nonCompliantDepartments.length > 0 && (
            <>
              <li>• Schedule focus sessions for low-performing departments</li>
              <li>• Implement peer mentoring programs</li>
              <li>• Send personalized reminders to students</li>
            </>
          )}
          {overallCompliance >= 80 ? (
            <li>• Maintain current engagement strategies</li>
          ) : (
            <li>• Review and strengthen overall engagement approach</li>
          )}
        </ul>
      </div>
    </Card>
  );
};

