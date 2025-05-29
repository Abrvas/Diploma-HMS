import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  Activity,
  Users,
  Calendar,
  FileText,
  BarChart,
  Stethoscope,
  Settings,
  CreditCard,
  Plus
} from 'lucide-react';
import { Card } from '../../components/ui/Card';

const StatsCard = ({ title, value, trend, icon: Icon }: any) => (
  <Card className="p-6">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-lg">
        <Icon className="w-6 h-6 text-brand-purple dark:text-brand-purple-light" />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-light-200">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 dark:text-green-400">
            {trend}
          </p>
        )}
      </div>
    </div>
  </Card>
);

export const StaffDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const getQuickActions = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { 
            title: 'User Management',
            description: 'Manage staff and patient accounts',
            icon: <Users className="w-8 h-8" />,
            path: '/admin/users',
            color: 'blue'
          },
          { 
            title: 'Analytics',
            description: 'View system statistics and reports',
            icon: <BarChart className="w-8 h-8" />,
            path: '/analytics',
            color: 'purple'
          },
          { 
            title: 'Settings',
            description: 'Configure system preferences',
            icon: <Settings className="w-8 h-8" />,
            path: '/admin/settings',
            color: 'gray'
          }
        ];
      case 'doctor':
        return [
          { 
            title: 'Appointments',
            description: 'View and manage patient appointments',
            icon: <Calendar className="w-8 h-8" />,
            path: '/appointments',
            color: 'purple'
          },
          { 
            title: 'Patients',
            description: 'Access patient records and history',
            icon: <Users className="w-8 h-8" />,
            path: '/patients',
            color: 'blue'
          },
          { 
            title: 'Medical Records',
            description: 'Update and view medical records',
            icon: <FileText className="w-8 h-8" />,
            path: '/documents',
            color: 'green'
          }
        ];
      case 'cashier':
        return [
          { 
            title: 'Payment History',
            description: 'View and manage payment records',
            icon: <CreditCard className="w-8 h-8" />,
            path: '/payment-history',
            color: 'green'
          },
          { 
            title: 'New Payment',
            description: 'Process a new payment',
            icon: <Plus className="w-8 h-8" />,
            path: '/new-payment',
            color: 'blue'
          },
          { 
            title: 'Reports',
            description: 'Generate financial reports',
            icon: <BarChart className="w-8 h-8" />,
            path: '/reports',
            color: 'purple'
          }
        ];
      case 'director':
        return [
          { 
            title: 'Analytics',
            description: 'View hospital performance metrics',
            icon: <BarChart className="w-8 h-8" />,
            path: '/analytics',
            color: 'blue'
          },
          { 
            title: 'Doctors',
            description: 'Manage medical staff',
            icon: <Stethoscope className="w-8 h-8" />,
            path: '/doctors',
            color: 'purple'
          },
          { 
            title: 'Reports',
            description: 'Access hospital reports',
            icon: <FileText className="w-8 h-8" />,
            path: '/reports',
            color: 'green'
          }
        ];
      default:
        return [];
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Patients Today"
          value="48"
          trend="+12% from last month"
          icon={Users}
        />
        <StatsCard
          title="Appointments"
          value="24"
          trend="+8% from last month"
          icon={Calendar}
        />
        <StatsCard
          title="Revenue"
          value="₸ 125,000"
          trend="+15% from last month"
          icon={Activity}
        />
        <StatsCard
          title="Available Doctors"
          value="12"
          trend="+2 more than yesterday"
          icon={Stethoscope}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="p-6 border-b border-gray-200 dark:border-dark-100">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-light-200">
            Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl cursor-pointer hover:bg-${action.color}-50 dark:hover:bg-${action.color}-900/10 transition-colors`}
              onClick={() => navigate(action.path)}
            >
              <div className="flex flex-col gap-4">
                <div className={`p-4 bg-${action.color}-100 dark:bg-${action.color}-900/20 rounded-xl w-fit`}>
                  {action.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{action.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};