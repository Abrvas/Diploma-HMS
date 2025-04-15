
import { useNavigate } from 'react-router-dom';
import { PatientForm } from './PatientForm';
import { usePatientStore } from '../../store/patientStore';

export const AddPatient = () => {
  const navigate = useNavigate();
  const createPatient = usePatientStore((state) => state.createPatient);

  const handleSubmit = async (data: any) => {
    try {
      // Convert allergies string to array
      const allergies = data.allergies
        ? data.allergies.split(',').map((a: string) => a.trim())
        : [];

      await createPatient({ ...data, allergies });
      navigate('/patients');
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Add New Patient</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Patient Information
          </h2>
        </div>
        <div className="p-6">
          <PatientForm
            onSubmit={handleSubmit}
            onCancel={() => navigate('/patients')}
          />
        </div>
      </div>
    </div>
  );
};