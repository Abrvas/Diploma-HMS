import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  User,
  Calendar,
  Users,
  FileText,
  Settings as SettingsIcon,
  BarChart,
  LogOut,
  Stethoscope,
  Receipt,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const getNavigationItems = (role: string) => {
  // Base items for all users
  const baseItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5 text-gray-500 dark:text-gray-400" /> },
    { path: '/profile', label: 'My Profile', icon: <User className="w-5 h-5 text-gray-500 dark:text-gray-400" /> },
    { path: '/settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" /> },
  ];

  // Staff specific items
  const doctorItems = [
    { path: '/appointments', label: 'Appointments', icon: <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" /> },
    { path: '/patients', label: 'Patients', icon: <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" /> },
  ];

  const adminItems = [
    { path: '/doctors', label: 'Doctors', icon: <Stethoscope className="w-5 h-5 text-gray-500 dark:text-gray-400" /> },
    { path: '/admin/users', label: 'User Management', icon: <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" /> },
  ];

  const cashierItems = [
    { path: '/payment-history', label: 'Payment History', icon: <Receipt className="w-5 h-5 text-gray-500 dark:text-gray-400" /> },
  ];

  const directorItems = [
    { path: '/analytics', label: 'Analytics', icon: <BarChart className="w-5 h-5 text-gray-500 dark:text-gray-400" /> },
    { path: '/doctors', label: 'Doctors', icon: <Stethoscope className="w-5 h-5 text-gray-500 dark:text-gray-400" /> },
  ];

  switch (role) {
    case 'doctor':
      return [...baseItems, ...doctorItems];
    case 'admin':
      return [...baseItems, ...adminItems];
    case 'director':
      return [...baseItems, ...directorItems];
    case 'cashier':
      return [...baseItems, ...cashierItems];
    default:
      return baseItems;
  }
};

export const Sidebar = () => {
  const { user, logout } = useAuthStore();
  
  if (!user) return null;

  const navigation = getNavigationItems(user.role);

  return (
    <div className="w-64 h-screen bg-white dark:bg-dark-200 fixed left-0 top-0 flex flex-col border-r border-gray-200 dark:border-dark-100">
      <div className="p-6 border-b border-gray-200 dark:border-dark-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-lg">
            <Stethoscope className="w-6 h-6 text-brand-purple dark:text-brand-purple-light" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-light-100">MediFlow</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 custom-scrollbar">
        <nav className="px-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-brand-purple/10 dark:bg-brand-purple/20 text-brand-purple dark:text-brand-purple-light'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-100 hover:text-gray-900 dark:hover:text-light-100'
                }`
              }
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-dark-100">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-light-100 w-full px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
        >
          <LogOut className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};