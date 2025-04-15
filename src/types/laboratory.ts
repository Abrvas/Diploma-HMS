export interface LabTest {
  id: string;
  name: string;
  category: string;
  normalRange?: string;
  unit?: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  doctorId: string;
  testId: string;
  date: string;
  value: string;
  notes?: string;
  status: 'pending' | 'completed' | 'cancelled';
  abnormal: boolean;
}