export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'checkup' | 'consultation' | 'followup';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface AppointmentFormData {
  patientName: string;
  date: string;
  time: string;
  type: 'checkup' | 'consultation' | 'followup';
  notes?: string;
}