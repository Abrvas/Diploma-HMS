import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-dark-200 rounded-lg border border-gray-200 dark:border-dark-100",
        "shadow-sm dark:shadow-dark-sm",
        "hover:border-brand-purple/20 dark:hover:border-brand-purple/20 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "px-6 py-4 border-b border-gray-200 dark:border-dark-100",
        "flex items-center justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className, ...props }: CardProps) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-gray-900 dark:text-light-200",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};