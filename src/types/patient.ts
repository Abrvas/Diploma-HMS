export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  address: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  doctorId: string;
  doctorName: string;
  type: 'diagnosis' | 'test' | 'prescription';
}

export interface PatientFilters {
  search: string;
  bloodType: string;
  gender: string;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface PatientState {
  patients: Patient[];
  totalPatients: number;
  filters: PatientFilters;
  pagination: PaginationState;
  setFilters: (filters: Partial<PatientFilters>) => void;
  setPagination: (pagination: Partial<PaginationState>) => void;
  fetchPatients: () => Promise<void>;
  getPatient: (id: string) => Promise<Patient>;
  getMedicalRecords: (patientId: string) => Promise<MedicalRecord[]>;
  addMedicalRecord: (record: Omit<MedicalRecord, 'id'>) => Promise<void>;
  updatePatient: (id: string, data: Partial<Patient>) => Promise<void>;
  createPatient: (data: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}