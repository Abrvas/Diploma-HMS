import React from 'react';
import { Card } from './Card';
import { cn } from '../../utils/cn';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    positive?: boolean;
  };
  className?: string;
}

export const StatsCard = ({ icon, label, value, trend, className }: StatsCardProps) => {
  return (
    <Card className={cn('stats-card', className)}>
      <div className="stats-icon">
        {icon}
      </div>
      <div className="stats-content">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
        </div>
        <p className="stats-value">{value}</p>
        {trend && (
          <p className={cn(
            'stats-trend',
            trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          )}>
            {trend.value}
          </p>
        )}
      </div>
    </Card>
  );
};