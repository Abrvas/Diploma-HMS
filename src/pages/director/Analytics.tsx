import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Star,
  Download,
  Loader2
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatsCard } from '../../components/ui/StatsCard';

const stats = {
  patients: {
    total: 1250,
    active: 980,
    avgVisits: 45,
    satisfaction: 4.8,
  },
  revenue: {
    total: 12500000,
    thisMonth: 1500000,
    lastMonth: 1200000,
    growth: 25,
  },
  appointments: {
    total: 450,
    completed: 380,
    cancelled: 70,
  },
};

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create CSV content
      const csvContent = [
        ['Analytics Report', `Last ${timeRange} days`],
        [''],
        ['Patients'],
        ['Total Patients', stats.patients.total],
        ['Active Patients', stats.patients.active],
        ['Average Visits', stats.patients.avgVisits],
        ['Patient Satisfaction', stats.patients.satisfaction],
        [''],
        ['Revenue'],
        ['Total Revenue', `₸${stats.revenue.total}`],
        ['This Month', `₸${stats.revenue.thisMonth}`],
        ['Last Month', `₸${stats.revenue.lastMonth}`],
        ['Growth', `${stats.revenue.growth}%`],
        [''],
        ['Appointments'],
        ['Total Appointments', stats.appointments.total],
        ['Completed', stats.appointments.completed],
        ['Cancelled', stats.appointments.cancelled],
      ].map(row => row.join(',')).join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `analytics_report_${timeRange}days.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics Dashboard"
        actions={
          <>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="form-select"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
            <Button
              variant="primary"
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center gap-2"
            >
              {exporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export Report
                </>
              )}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<Users className="w-6 h-6" />}
          label="Total Patients"
          value={stats.patients.total}
          trend={{ value: '+12% from last month', positive: true }}
        />
        <StatsCard
          icon={<UserCheck className="w-6 h-6" />}
          label="Active Patients"
          value={stats.patients.active}
          trend={{ value: '+8% from last month', positive: true }}
        />
        <StatsCard
          icon={<DollarSign className="w-6 h-6" />}
          label="Revenue"
          value={`₸ ${stats.revenue.thisMonth.toLocaleString()}`}
          trend={{ value: `+${stats.revenue.growth}% from last month`, positive: true }}
        />
        <StatsCard
          icon={<Star className="w-6 h-6" />}
          label="Patient Satisfaction"
          value={`${stats.patients.satisfaction}/5.0`}
          trend={{ value: '+0.3 from last month', positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-light-100 mb-4">
              Appointments Overview
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Appointments</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-light-100">{stats.appointments.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-light-100">{stats.appointments.completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cancelled</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-light-100">{stats.appointments.cancelled}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-light-100 mb-4">
              Revenue Breakdown
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-light-100">
                  ₸ {stats.revenue.total.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-light-100">
                  ₸ {stats.revenue.thisMonth.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last Month</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-light-100">
                  ₸ {stats.revenue.lastMonth.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};