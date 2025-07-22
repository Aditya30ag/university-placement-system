'use client';
import React from 'react';
import { Card } from '@/components/ui/Card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { CHART_COLORS } from '@/constants';
import type { DailyEngagement, WeeklyEngagement } from '@/types';

interface EngagementTrendsProps {
  dailyEngagement: DailyEngagement[];
  weeklyEngagement: WeeklyEngagement[];
  timeRange: '7d' | '30d' | '90d';
}

export const EngagementTrends: React.FC<EngagementTrendsProps> = ({
  dailyEngagement,
  weeklyEngagement,
  timeRange
}) => {
  const chartData = timeRange === '7d' ? dailyEngagement.slice(-7) : 
                   timeRange === '30d' ? dailyEngagement.slice(-30) :
                   weeklyEngagement;

  const dataKey = timeRange === '7d' || timeRange === '30d' ? 'date' : 'week';
  
  return (
    <>
      {/* Daily/Weekly Engagement */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Engagement Trends ({timeRange === '7d' ? 'Daily' : timeRange === '30d' ? 'Daily (30d)' : 'Weekly'})
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={dataKey}
                tick={{ fontSize: 12 }}
                angle={timeRange !== '7d' ? -45 : 0}
                textAnchor="end"
                height={timeRange !== '7d' ? 80 : 30}
              />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [value, name]}
                labelFormatter={(label) => `${dataKey}: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="testsCompleted" 
                stroke={CHART_COLORS[1]} 
                strokeWidth={2} 
                name="Tests Completed"
              />
              <Line 
                type="monotone" 
                dataKey="resumesUploaded" 
                stroke={CHART_COLORS[2]} 
                strokeWidth={2} 
                name="Resumes Uploaded"
              />
              <Line 
                type="monotone" 
                dataKey="uniqueUsers" 
                stroke={CHART_COLORS[0]} 
                strokeWidth={2} 
                name="Unique Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Weekly Comparison */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Activity Summary</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyEngagement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [value, name]}
              />
              <Bar dataKey="testsCompleted" fill={CHART_COLORS[1]} name="Tests" />
              <Bar dataKey="resumesUploaded" fill={CHART_COLORS[2]} name="Resumes" />
              <Bar dataKey="uniqueUsers" fill={CHART_COLORS[0]} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );
};

