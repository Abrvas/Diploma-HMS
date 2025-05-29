import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-[72px] shrink-0 cursor-pointer items-center rounded-full bg-gray-100 dark:bg-dark-100 p-1 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {/* Toggle Track */}
      <div className="absolute inset-0 rounded-full transition-colors duration-300" />
      
      {/* Toggle Thumb */}
      <div
        className={`
          absolute h-7 w-7 rounded-full bg-white dark:bg-dark-300
          shadow-md transition-transform duration-300 ease-in-out
          ${isDark ? 'translate-x-[36px]' : 'translate-x-0'}
        `}
      />
      
      {/* Icons */}
      <div className="relative flex w-full justify-between px-2">
        <Sun 
          className={`h-5 w-5 transition-all duration-300 ${
            isDark ? 'opacity-50 text-gray-400' : 'text-brand-turquoise'
          }`}
        />
        <Moon 
          className={`h-5 w-5 transition-all duration-300 ${
            isDark ? 'text-brand-turquoise-light' : 'opacity-50 text-gray-400'
          }`}
        />
      </div>
    </button>
  );
};