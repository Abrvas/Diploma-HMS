import React, { useState } from 'react';
import { Calendar, Clock, User, FileText, X, Plus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAppointmentStore } from '../store/appointmentStore';
import { useNotificationStore } from '../store/notificationStore';
import { AppointmentFormData } from '../types/appointment';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/Badge';

export const Appointments = () => {
  const { user } = useAuthStore();
  const { createAppointment, getAppointments } = useAppointmentStore();
  const { addNotification } = useNotificationStore();
  const [showModal, setShowModal] = useState(false);

  const appointments = user ? getAppointments(user.id) : [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const appointmentData: AppointmentFormData = {
      patientName: formData.get('patientName') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      type: formData.get('type') as 'checkup' | 'consultation' | 'followup',
      notes: formData.get('notes') as string,
    };

    if (user) {
      createAppointment(appointmentData, user.id, user.name);
      addNotification({
        title: 'New Appointment',
        message: `Appointment scheduled with ${appointmentData.patientName} on ${appointmentData.date} at ${appointmentData.time}`,
        type: 'success',
      });
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        actions={
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Appointment
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-brand-purple dark:text-brand-purple-light" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-light-100">{appointment.patientName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{appointment.type}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{appointment.time}</span>
                </div>
                {appointment.notes && (
                  <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FileText className="w-4 h-4 mt-1" />
                    <span>{appointment.notes}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-100">
                <Badge
                  variant={
                    appointment.status === 'scheduled'
                      ? 'info'
                      : appointment.status === 'completed'
                      ? 'success'
                      : 'error'
                  }
                >
                  {appointment.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="New Appointment"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              required
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              required
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time
            </label>
            <input
              type="time"
              name="time"
              required
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              name="type"
              required
              className="form-select"
            >
              <option value="checkup">Check-up</option>
              <option value="consultation">Consultation</option>
              <option value="followup">Follow-up</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              rows={3}
              className="form-input"
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
              Create Appointment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};