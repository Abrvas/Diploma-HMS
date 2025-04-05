import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { 
  Stethoscope, 
  Calendar, 
  FileText, 
  ClipboardList, 
  ArrowRight 
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const PatientDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

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
              onClick={() => navigate('/appointments')}
            >
              Book Now
            </Button>
          </div>
          <div className="hidden lg:block">
            <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <Stethoscope className="w-32 h-32 text-white" />
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="group p-6 hover:bg-brand-purple hover:text-white transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/appointments')}
        >
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-purple-100 group-hover:bg-white/10 rounded-xl transition-colors w-fit">
              <Calendar className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                Book Appointment
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-gray-500 group-hover:text-white/80 transition-colors">
                Schedule a visit with our healthcare professionals
              </p>
            </div>
          </div>
        </Card>

        <Card 
          className="group p-6 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/documents')}
        >
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-blue-100 group-hover:bg-white/10 rounded-xl transition-colors w-fit">
              <FileText className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                Medical Records
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-gray-500 group-hover:text-white/80 transition-colors">
                Access your medical history and test results
              </p>
            </div>
          </div>
        </Card>

        <Card 
          className="group p-6 hover:bg-green-600 hover:text-white transition-all duration-300 cursor-pointer"
          onClick={() => navigate('/applications')}
        >
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-green-100 group-hover:bg-white/10 rounded-xl transition-colors w-fit">
              <ClipboardList className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                Request Prescription
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
              </h3>
              <p className="text-gray-500 group-hover:text-white/80 transition-colors">
                Submit prescription renewal requests
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};