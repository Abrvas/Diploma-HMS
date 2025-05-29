import React from 'react';
import { useForm } from 'react-hook-form';
import { Patient } from '../../types/patient';
import { Button } from '../ui/Button';

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
const genders = ['male', 'female', 'other'] as const;

export const PatientForm = ({ patient, onSubmit, onCancel }: PatientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: patient || {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'male',
      phone: '',
      email: '',
      address: '',
      bloodType: 'A+',
      allergies: [],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            First Name
          </label>
          <input
            type="text"
            {...register('firstName', { required: 'First name is required' })}
            className="form-input"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <input
            type="text"
            {...register('lastName', { required: 'Last name is required' })}
            className="form-input"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date of Birth
          </label>
          <input
            type="date"
            {...register('dateOfBirth', { required: 'Date of birth is required' })}
            className="form-input"
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Gender
          </label>
          <select
            {...register('gender')}
            className="form-select"
          >
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone
          </label>
          <input
            type="tel"
            {...register('phone', { required: 'Phone is required' })}
            className="form-input"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="form-input"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Address
          </label>
          <input
            type="text"
            {...register('address', { required: 'Address is required' })}
            className="form-input"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Blood Type
          </label>
          <select
            {...register('bloodType')}
            className="form-select"
          >
            {bloodTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Allergies
          </label>
          <input
            type="text"
            {...register('allergies')}
            placeholder="Separate with commas"
            className="form-input"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {patient ? 'Update Patient' : 'Add Patient'}
        </Button>
      </div>
    </form>
  );
};