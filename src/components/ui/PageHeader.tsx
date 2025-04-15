import React from 'react';
import { Card } from './Card';

interface PageHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export const PageHeader = ({ title, actions }: PageHeaderProps) => {
  return (
    <Card>
      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-light-100">{title}</h1>
        {actions && <div className="flex items-center gap-4">{actions}</div>}
      </div>
    </Card>
  );
};