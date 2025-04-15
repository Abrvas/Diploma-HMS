import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const SearchInput = ({ className, ...props }: SearchInputProps) => {
  return (
    <div className="relative">
      <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        className={cn(
          "w-full pl-10 pr-4 py-2.5 rounded-lg",
          "border border-gray-200 dark:border-dark-100",
          "bg-white/50 dark:bg-dark-100/50",
          "focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent",
          "text-gray-900 dark:text-light-200",
          "placeholder-gray-500 dark:placeholder-gray-400",
          className
        )}
        {...props}
      />
    </div>
  );
};