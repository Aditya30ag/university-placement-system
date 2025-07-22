'use client';
import React from 'react';
import { Card } from '@/components/ui/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import type { MonthlyTrend, DepartmentStats } from '@/types';
import { CHART_COLORS } from '@/constants';

interface DashboardChartsProps {
  monthlyTrend: MonthlyTrend[];
  departmentStats: DepartmentStats[];
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({
  monthlyTrend,
  departmentStats
}) => {
  const placementStatusData = [
    { name: 'Placed', value: 892, color: CHART_COLORS[1] },
    { name: 'Intern', value: 138, color: CHART_COLORS[2] },
    { name: 'Unplaced', value: 220, color: CHART_COLORS[3] }
  ];

  return (
    <>
      {/* Monthly Placement Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Placement Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [value, name]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="placed" 
                stroke={CHART_COLORS[1]} 
                strokeWidth={2} 
                name="Placed"
              />
              <Line 
                type="monotone" 
                dataKey="intern" 
                stroke={CHART_COLORS[2]} 
                strokeWidth={2} 
                name="Intern"
              />
              <Line 
                type="monotone" 
                dataKey="unplaced" 
                stroke={CHART_COLORS[3]} 
                strokeWidth={2} 
                name="Unplaced"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Department-wise Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Department-wise Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentStats} margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="department" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                fontSize={12}
              />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  name === 'placedPercentage' ? `${value}%` : value,
                  name === 'placedPercentage' ? 'Placement %' : 'Students'
                ]}
              />
              <Bar dataKey="totalStudents" fill={CHART_COLORS[0]} name="Total Students" />
              <Bar dataKey="placedStudents" fill={CHART_COLORS[1]} name="Placed Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Placement Status Pie Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Placement Status</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={placementStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {placementStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Students']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );
};

