export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  medications: Medication[];
  diagnosis: string;
  notes?: string;
  status: 'active' | 'completed' | 'cancelled';
}