import React, { useState } from 'react';
import { UserPlus, Search, Edit2, Trash2, X, Check, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  email: string;
  status: 'active' | 'inactive';
  avatar: string;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    department: 'Cardiology',
    email: 'sarah.johnson@mediflow.com',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=50&h=50',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    department: 'Neurology',
    email: 'michael.chen@mediflow.com',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=50&h=50',
  },
];

const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General Medicine'];
const specializations = ['Cardiologist', 'Neurologist', 'Pediatrician', 'Orthopedic Surgeon', 'General Physician'];

export const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setShowModal(true);
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setShowModal(true);
  };

  const handleDelete = (doctorId: string) => {
    setShowDeleteConfirm(doctorId);
  };

  const confirmDelete = async () => {
    if (!showDeleteConfirm) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDoctors(doctors.filter(d => d.id !== showDeleteConfirm));
      setShowDeleteConfirm(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const doctorData = {
        id: editingDoctor?.id || Date.now().toString(),
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        specialization: formData.get('specialization') as string,
        department: formData.get('department') as string,
        status: formData.get('status') as 'active' | 'inactive',
        avatar: editingDoctor?.avatar || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=50&h=50',
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingDoctor) {
        setDoctors(doctors.map(d => d.id === editingDoctor.id ? doctorData : d));
      } else {
        setDoctors([doctorData, ...doctors]);
      }
      setShowModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctors"
        actions={
          <Button
            variant="primary"
            onClick={handleAddDoctor}
            className="flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add Doctor
          </Button>
        }
      />

      <Card>
        <div className="p-4 border-b border-gray-200 dark:border-dark-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctors..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-dark-100 bg-white/50 dark:bg-dark-100/50 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent text-gray-900 dark:text-light-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-200 divide-y divide-gray-200 dark:divide-dark-100">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50 dark:hover:bg-dark-100/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={doctor.avatar}
                        alt={doctor.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-light-200">
                          {doctor.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{doctor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="info" className="capitalize">
                      {doctor.specialization}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {doctor.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={doctor.status === 'active' ? 'success' : 'error'}
                      className="capitalize"
                    >
                      {doctor.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleEdit(doctor)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(doctor.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Doctor Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={editingDoctor?.name}
              required
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={editingDoctor?.email}
              required
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Specialization
            </label>
            <select
              name="specialization"
              defaultValue={editingDoctor?.specialization}
              required
              className="form-select"
            >
              <option value="">Select specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Department
            </label>
            <select
              name="department"
              defaultValue={editingDoctor?.department}
              required
              className="form-select"
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              name="status"
              defaultValue={editingDoctor?.status}
              required
              className="form-select"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowModal(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {editingDoctor ? 'Save Changes' : 'Add Doctor'}
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this doctor? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(null)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={confirmDelete}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};