import React, { useState } from 'react';
import { Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';

interface Application {
  id: number;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  amount?: number;
  reason?: string;
}

const initialApplications: Application[] = [
  {
    id: 1,
    type: 'Pension Withdrawal',
    status: 'pending',
    submittedDate: '2024-03-10',
    amount: 5000,
  },
  {
    id: 2,
    type: 'Address Change',
    status: 'approved',
    submittedDate: '2024-02-28',
  },
  {
    id: 3,
    type: 'Beneficiary Update',
    status: 'rejected',
    submittedDate: '2024-02-15',
    reason: 'Incomplete documentation',
  },
];

const applicationTypes = [
  'Pension Withdrawal',
  'Address Change',
  'Beneficiary Update',
  'Document Request',
  'Contact Update',
];

export const Applications = () => {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />;
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get('type') as string;
    const amount = formData.get('amount') as string;

    if (!type) {
      setFormError('Please select an application type');
      return;
    }

    const newApplication: Application = {
      id: Date.now(),
      type,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
    };

    if (amount) {
      newApplication.amount = parseFloat(amount);
    }

    setApplications([newApplication, ...applications]);
    setShowModal(false);
    setFormError(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applications"
        actions={
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Application
          </Button>
        }
      />

      <Card>
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-100">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-light-200">
            Recent Applications
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-dark-100">
          {applications.map((application) => (
            <div
              key={application.id}
              className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-dark-100/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(application.status)}
                  <h3 className="text-lg font-medium text-gray-900 dark:text-light-200">
                    {application.type}
                  </h3>
                </div>
                <Badge
                  variant={
                    application.status === 'approved'
                      ? 'success'
                      : application.status === 'rejected'
                      ? 'error'
                      : 'warning'
                  }
                  className="capitalize"
                >
                  {application.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Submitted on {application.submittedDate}
              </div>
              {application.amount && (
                <div className="mt-2 text-sm text-gray-900 dark:text-light-200">
                  Amount: ${application.amount.toFixed(2)}
                </div>
              )}
              {application.reason && (
                <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                  Reason: {application.reason}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="New Application"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Application Type
            </label>
            <select
              name="type"
              className="form-select"
            >
              <option value="">Select type</option>
              {applicationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {formError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount (if applicable)
            </label>
            <input
              type="number"
              name="amount"
              step="0.01"
              min="0"
              className="form-input"
              placeholder="Enter amount"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};