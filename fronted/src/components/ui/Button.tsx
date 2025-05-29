import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        // Base styles
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        
        // Variants
        {
          'bg-brand-purple hover:bg-brand-purple-dark text-white dark:bg-brand-purple dark:hover:bg-brand-purple-dark dark:text-white focus:ring-brand-purple':
            variant === 'primary',
          'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-dark-100 dark:hover:bg-dark-50 dark:text-light-200 focus:ring-gray-400':
            variant === 'secondary',
          'border border-gray-200 dark:border-dark-100 hover:bg-gray-50 dark:hover:bg-dark-100 text-gray-900 dark:text-light-200 focus:ring-gray-400':
            variant === 'outline',
          'hover:bg-gray-100 dark:hover:bg-dark-100 text-gray-900 dark:text-light-200 focus:ring-gray-400':
            variant === 'ghost',
        },

        // Sizes
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};