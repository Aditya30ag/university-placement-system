'use client';
import React from 'react';
import { Card } from '@/components/ui/Card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { CHART_COLORS } from '@/constants';

interface PrepCVChartsProps {
  testsCompleted: number;
  resumesUploaded: number;
  totalStudents: number;
  avgScore: number;
}

export const PrepCVCharts: React.FC<PrepCVChartsProps> = ({
  testsCompleted,
  resumesUploaded,
  totalStudents,
  avgScore
}) => {
  const completionData = [
    {
      name: 'Tests Completed',
      completed: testsCompleted,
      pending: totalStudents - testsCompleted,
      percentage: ((testsCompleted / totalStudents) * 100).toFixed(1)
    },
    {
      name: 'Resumes Uploaded',
      completed: resumesUploaded,
      pending: totalStudents - resumesUploaded,
      percentage: ((resumesUploaded / totalStudents) * 100).toFixed(1)
    }
  ];

  const pieData = [
    { name: 'Tests Completed', value: testsCompleted, color: CHART_COLORS[1] },
    { name: 'Tests Pending', value: totalStudents - testsCompleted, color: CHART_COLORS[3] },
  ];

  const scoreDistribution = [
    { range: '90-100', count: 156, color: CHART_COLORS[1] },
    { range: '80-89', count: 234, color: CHART_COLORS[0] },
    { range: '70-79', count: 312, color: CHART_COLORS[2] },
    { range: '60-69', count: 198, color: CHART_COLORS[4] },
    { range: '<60', count: 87, color: CHART_COLORS[3] }
  ];

  return (
    <>
      {/* Completion Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Completion Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={completionData} margin={{ left: 20, right: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [value, name]}
                labelFormatter={(label) => label}
              />
              <Legend />
              <Bar dataKey="completed" fill={CHART_COLORS[1]} name="Completed" />
              <Bar dataKey="pending" fill={CHART_COLORS[3]} name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Test Completion Pie Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Test Completion Status</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Students']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{avgScore.toFixed(1)}</div>
          <div className="text-sm text-gray-500">Average Score</div>
        </div>
      </Card>

      {/* Score Distribution */}
      <Card className="p-6 lg:col-span-2">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Score Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreDistribution} margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [value, 'Students']}
                labelFormatter={(label) => `Score Range: ${label}`}
              />
              <Bar dataKey="count" fill={CHART_COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );
};

