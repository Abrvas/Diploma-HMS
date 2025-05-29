import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

export const RoleSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {showBackButton && (
        <button
          onClick={() => navigate('/')}
          className="fixed top-4 left-4 z-50 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      )}

      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 dark:bg-blue-500 p-4 rounded-2xl shadow-lg">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome to MediFlow
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please select how you would like to proceed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate('/patient/login')}
            className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-500 dark:group-hover:bg-blue-500 transition-colors">
                <User className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">I'm a Patient</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access your patient portal to manage appointments and view medical records
              </p>
              <ArrowRight className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => navigate('/login')}
            className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 dark:hover:border-purple-400"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:bg-purple-500 dark:group-hover:bg-purple-500 transition-colors">
                <Stethoscope className="w-8 h-8 text-purple-600 dark:text-purple-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">I'm a Staff Member</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access the healthcare management system for staff and administrators
              </p>
              <ArrowRight className="w-6 h-6 text-purple-500 dark:text-purple-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};