import { create } from 'zustand';
import axios from 'axios';
import { AppointmentFormData, Appointment } from '../types/appointment';

interface AppointmentState {
  appointments: Appointment[];
  getAppointments: (doctorId: string) => Appointment[];
  fetchAppointments: () => Promise<void>;
  createAppointment: (
    data: AppointmentFormData,
    doctorId: string,
    userId: string
  ) => Promise<void>;
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],

  getAppointments: (doctorId) =>
    get().appointments.filter((a) => a.doctor.toString() === doctorId),

  fetchAppointments: async () => {
    const res = await axios.get('http://localhost:8000/api/appointments/');
    console.log('Fetched appointments:', res.data); // ✅ для дебага
    set({ appointments: res.data });
  },

  createAppointment: async (formData, doctorId, userId) => {
    const res = await axios.post('http://localhost:8000/api/appointments/', {
      doctor: doctorId,
      user: userId,
      appointment_date: formData.date,
      appointment_time: formData.time,
      phone: '77015122080', // ❗можно расширить формой
      reason: formData.notes,
      status: 'scheduled',
    });

    set((state) => ({
      appointments: [...state.appointments, res.data],
    }));
  },
}));
