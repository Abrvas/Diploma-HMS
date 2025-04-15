import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { usePatientStore } from '../../store/patientStore';
import { Patient, MedicalRecord } from '../../types/patient';
import { Loader2, Plus, X, Check } from 'lucide-react';

interface AddRecordModalProps {
  patientId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const AddRecordModal = ({ patientId, onClose, onSuccess }: AddRecordModalProps) => {
  const { addMedicalRecord } = usePatientStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const record = {
      patientId,
      date: format(new Date(), 'yyyy-MM-dd'),
      diagnosis: formData.get('diagnosis') as string,
      prescription: formData.get('prescription') as string,
      notes: formData.get('notes') as string,
      doctorId: 'D1',
      doctorName: 'Dr. Smith',
      type: formData.get('type') as 'diagnosis' | 'test' | 'prescription',
    };

    try {
      await addMedicalRecord(record);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding medical record:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add Medical Record</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              required
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="diagnosis">Diagnosis</option>
              <option value="test">Test</option>
              <option value="prescription">Prescription</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diagnosis
            </label>
            <textarea
              name="diagnosis"
              required
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prescription
            </label>
            <textarea
              name="prescription"
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Add Record
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getPatient, getMedicalRecords } = usePatientStore();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddRecord, setShowAddRecord] = useState(false);

  const fetchData = async () => {
    if (!id) return;
    try {
      const [patientData, recordsData] = await Promise.all([
        getPatient(id),
        getMedicalRecords(id),
      ]);
      setPatient(patientData);
      setRecords(recordsData);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, getPatient, getMedicalRecords]);

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
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Patient Information
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Personal Details
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="text-sm text-gray-900">
                    {patient.firstName} {patient.lastName}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {format(new Date(patient.dateOfBirth), 'MMMM d, yyyy')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="text-sm text-gray-900 capitalize">
                    {patient.gender}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Blood Type
                  </dt>
                  <dd className="text-sm text-gray-900">{patient.bloodType}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Contact Information
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">{patient.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900">{patient.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="text-sm text-gray-900">{patient.address}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Medical Records
          </h2>
          <button
            onClick={() => setShowAddRecord(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Record
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {records.map((record) => (
              <div
                key={record.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {format(new Date(record.date), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-sm text-gray-500">{record.doctorName}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800">
                    {record.type}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-900">Diagnosis</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {record.diagnosis}
                  </p>
                </div>
                {record.prescription && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900">
                      Prescription
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {record.prescription}
                    </p>
                  </div>
                )}
                {record.notes && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900">Notes</p>
                    <p className="text-sm text-gray-500 mt-1">{record.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddRecord && (
        <AddRecordModal
          patientId={id!}
          onClose={() => setShowAddRecord(false)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
};