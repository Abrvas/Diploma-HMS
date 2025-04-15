import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  Activity,
  Users,
  Calendar,
  Stethoscope,
  Printer,
  FileText,
  ArrowRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/ui/Modal';

const StatsCard = ({ title, value, trend, icon: Icon }: any) => (
  <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-gray-700/50">
        <Icon className="w-5 h-5 text-gray-300" />
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-white">{value}</p>
          <span className="text-xs text-green-400">{trend}</span>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-purple to-brand-purple-dark p-8 text-white">
        <div className="relative z-10 flex items-start justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Welcome to MediFlow, {user?.name}</h1>
            <p className="text-xl text-white/90 mb-6">
              Your comprehensive healthcare management portal
            </p>
            <p className="text-white/80 mb-8 text-lg">
              Experience seamless healthcare services with instant access to medical professionals,
              easy appointment scheduling, and secure health records management.
            </p>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setShowAboutModal(true)}
            >
              Learn More
            </Button>
          </div>
          <div className="hidden lg:block">
            <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Stethoscope className="w-32 h-32 text-white/20" />
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4">
          <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4">
          <div className="w-48 h-48 rounded-full bg-white/5 backdrop-blur-sm" />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
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

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* User Profile */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-light-100 mb-4">
            User Profile
          </h2>
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-light-100">{user?.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user?.department}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Department of {user?.department}</p>
            </div>
          </div>
        </Card>

        {/* Today's Appointments */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-light-100 mb-4">
            Today's Appointments
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-dark-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-light-100">10:00 AM</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">John Smith</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 ml-auto" />
            </div>
          </div>
        </Card>
      </div>

      {/* About Modal */}
      <Modal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
        title="About MediFlow"
      >
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-300">
            MediFlow is a leading healthcare management system dedicated to revolutionizing the way medical facilities operate. 
            Our comprehensive platform streamlines healthcare delivery, enhances patient care, and improves operational efficiency.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-dark-100 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-light-200 mb-2">Excellence</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Committed to delivering the highest quality healthcare management solutions
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-dark-100 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-light-200 mb-2">Patient-Centric</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Focused on improving patient care and experience through technology
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-dark-100 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-light-200 mb-2">Collaborative</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enabling seamless communication between healthcare professionals
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-light-200 mb-3">Key Features</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <div className="w-1.5 h-1.5 bg-brand-purple rounded-full" />
                Advanced patient management system
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <div className="w-1.5 h-1.5 bg-brand-purple rounded-full" />
                Real-time appointment scheduling
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <div className="w-1.5 h-1.5 bg-brand-purple rounded-full" />
                Secure electronic health records
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <div className="w-1.5 h-1.5 bg-brand-purple rounded-full" />
                Integrated billing and insurance management
              </li>
            </ul>
          </div>

          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setShowAboutModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;