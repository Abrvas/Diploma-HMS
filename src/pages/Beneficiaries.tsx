import React, { useState } from 'react';
import { UserPlus, Pencil, Trash2, X } from 'lucide-react';

interface Beneficiary {
  id: number;
  name: string;
  relation: string;
  dateOfBirth: string;
  percentage: number;
  contact: string;
}

const initialBeneficiaries: Beneficiary[] = [
  {
    id: 1,
    name: 'Johnny Fox',
    relation: 'Son',
    dateOfBirth: '1995-06-15',
    percentage: 50,
    contact: '+1 (555) 123-4567',
  },
  {
    id: 2,
    name: 'Natasha Fox',
    relation: 'Daughter',
    dateOfBirth: '1998-03-22',
    percentage: 50,
    contact: '+1 (555) 987-6543',
  },
];

export const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(initialBeneficiaries);
  const [showModal, setShowModal] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState<Beneficiary | null>(null);

  const handleAddBeneficiary = () => {
    setEditingBeneficiary(null);
    setShowModal(true);
  };

  const handleEdit = (beneficiary: Beneficiary) => {
    setEditingBeneficiary(beneficiary);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to remove this beneficiary?')) {
      setBeneficiaries(beneficiaries.filter(b => b.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBeneficiary = {
      id: editingBeneficiary?.id || Date.now(),
      name: formData.get('name') as string,
      relation: formData.get('relation') as string,
      dateOfBirth: formData.get('dateOfBirth') as string,
      percentage: Number(formData.get('percentage')),
      contact: formData.get('contact') as string,
    };

    if (editingBeneficiary) {
      setBeneficiaries(beneficiaries.map(b => 
        b.id === editingBeneficiary.id ? newBeneficiary : b
      ));
    } else {
      setBeneficiaries([...beneficiaries, newBeneficiary]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Beneficiaries</h1>
        <button 
          onClick={handleAddBeneficiary}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4" />
          Add Beneficiary
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {beneficiaries.map((beneficiary) => (
          <div key={beneficiary.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-600">
                    {beneficiary.name[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {beneficiary.name}
                  </h3>
                  <p className="text-sm text-gray-500">{beneficiary.relation}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEdit(beneficiary)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Pencil className="w-4 h-4 text-gray-500" />
                </button>
                <button 
                  onClick={() => handleDelete(beneficiary.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                <p className="text-sm text-gray-900">{beneficiary.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Contact</p>
                <p className="text-sm text-gray-900">{beneficiary.contact}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Benefit Percentage
                </p>
                <p className="text-sm text-gray-900">{beneficiary.percentage}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {editingBeneficiary ? 'Edit Beneficiary' : 'Add Beneficiary'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingBeneficiary?.name}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Relation</label>
                <input
                  type="text"
                  name="relation"
                  defaultValue={editingBeneficiary?.relation}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  defaultValue={editingBeneficiary?.dateOfBirth}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  type="tel"
                  name="contact"
                  defaultValue={editingBeneficiary?.contact}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Percentage</label>
                <input
                  type="number"
                  name="percentage"
                  defaultValue={editingBeneficiary?.percentage}
                  required
                  min="0"
                  max="100"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingBeneficiary ? 'Save Changes' : 'Add Beneficiary'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};