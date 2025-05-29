import { create } from 'zustand';
import { Appointment, AppointmentFormData } from '../types/appointment';

interface AppointmentState {
  appointments: Appointment[];
  createAppointment: (data: AppointmentFormData, doctorId: string, doctorName: string) => void;
  getAppointments: (doctorId: string) => Appointment[];
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],
  createAppointment: (data, doctorId, doctorName) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      patientId: Date.now().toString(),
      doctorId,
      doctorName,
      ...data,
      status: 'scheduled',
    };

    set((state) => ({
      appointments: [...state.appointments, newAppointment],
    }));
  },
  getAppointments: (doctorId) => {
    return get().appointments.filter((app) => app.doctorId === doctorId);
  },
}));