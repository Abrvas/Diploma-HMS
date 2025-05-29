import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-dark-300 transition-colors">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="pt-20 min-h-[calc(100vh-5rem)] ml-64">
          <div className="h-full p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};