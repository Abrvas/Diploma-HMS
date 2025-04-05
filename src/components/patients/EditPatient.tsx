import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PatientForm } from './PatientForm';
import { usePatientStore } from '../../store/patientStore';
import { Patient } from '../../types/patient';
import { Loader2 } from 'lucide-react';

export const EditPatient = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPatient, updatePatient } = usePatientStore();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const data = await getPatient(id);
        setPatient(data);
      } catch (error) {
        console.error('Error fetching patient:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id, getPatient]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    try {
      // Convert allergies string to array
      const allergies = data.allergies
        ? data.allergies.split(',').map((a: string) => a.trim())
        : [];

      await updatePatient(id, { ...data, allergies });
      navigate(`/patients/${id}`);
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center text-gray-500">Patient not found</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Edit Patient</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Patient Information
          </h2>
        </div>
        <div className="p-6">
          <PatientForm
            patient={patient}
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/patients/${id}`)}
          />
        </div>
      </div>
    </div>
  );
};