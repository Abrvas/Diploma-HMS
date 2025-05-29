import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/authStore';
import { Stethoscope, Loader2 } from 'lucide-react';
import { PatientRegistrationData } from '../../types/auth';
import { ThemeToggle } from '../../components/ThemeToggle';

export const PatientRegister = () => {
  const navigate = useNavigate();
  const { registerPatient } = useAuthStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PatientRegistrationData>();

  const onSubmit = async (data: PatientRegistrationData) => {
    try {
      await registerPatient(data);
      navigate('/patient/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 backdrop-blur-lg p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 dark:bg-blue-500 p-4 rounded-2xl shadow-lg">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Patient Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create your patient account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                {...register('name', { required: 'Full name is required' })}
                type="text"
                className="form-input"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                className="form-input"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                {...register('password', { required: 'Password is required' })}
                type="password"
                className="form-input"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date of Birth
              </label>
              <input
                {...register('dateOfBirth', { required: 'Date of birth is required' })}
                type="date"
                className="form-input"
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Insurance Number
              </label>
              <input
                {...register('insuranceNumber', { required: 'Insurance number is required' })}
                type="text"
                className="form-input"
              />
              {errors.insuranceNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.insuranceNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <input
                {...register('phone', { required: 'Phone number is required' })}
                type="tel"
                className="form-input"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <input
                {...register('address', { required: 'Address is required' })}
                type="text"
                className="form-input"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Register'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/patient/login')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};