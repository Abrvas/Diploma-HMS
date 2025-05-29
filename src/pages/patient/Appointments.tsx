import React, { useState } from 'react';
import { Calendar, Clock, Plus, Search, Filter, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

export const PatientAppointments = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2024-03-20',
      time: '10:00 AM',
      type: 'Check-up',
      status: 'upcoming',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      date: '2024-03-15',
      time: '2:30 PM',
      type: 'Follow-up',
      status: 'completed',
    },
    {
      id: 3,
      doctor: 'Dr. Emily Wilson',
      specialty: 'Dermatologist',
      date: '2024-03-10',
      time: '11:00 AM',
      type: 'Consultation',
      status: 'cancelled',
    },
  ];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBooking(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Appointments"
        actions={
          <Button
            variant="primary"
            onClick={() => setShowBooking(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Book Appointment
          </Button>
        }
      />

      <Card>
        <div className="p-6 border-b border-gray-200 dark:border-dark-100">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-dark-100"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-dark-100">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-dark-100/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {appointment.status === 'upcoming' ? (
                    <Calendar className="w-6 h-6 text-blue-500" />
                  ) : appointment.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-light-100">
                      {appointment.doctor}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {appointment.specialty}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.date} at {appointment.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant={
                      appointment.status === 'upcoming'
                        ? 'info'
                        : appointment.status === 'completed'
                        ? 'success'
                        : 'error'
                    }
                    className="capitalize"
                  >
                    {appointment.status}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {appointment.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        title="Book New Appointment"
      >
        <form onSubmit={handleBookAppointment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Appointment Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-select"
            >
              <option value="">Select type</option>
              <option value="checkup">Check-up</option>
              <option value="followup">Follow-up</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preferred Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preferred Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Additional Notes
            </label>
            <textarea
              rows={3}
              className="form-input"
              placeholder="Any specific concerns or requirements..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-dark-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowBooking(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Book Appointment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};