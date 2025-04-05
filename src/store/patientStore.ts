import { create } from 'zustand';
import { format } from 'date-fns';
import { Patient, PatientState, MedicalRecord } from '../types/patient';

// Mock data
const mockPatients: Patient[] = Array.from({ length: 50 }, (_, i) => ({
  id: `P${i + 1}`,
  firstName: `John${i + 1}`,
  lastName: `Doe${i + 1}`,
  dateOfBirth: '1990-01-01',
  gender: i % 2 === 0 ? 'male' : 'female',
  phone: '+1234567890',
  email: `patient${i + 1}@example.com`,
  address: '123 Main St',
  bloodType: 'A+',
  allergies: ['Peanuts', 'Penicillin'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

const mockMedicalRecords: Record<string, MedicalRecord[]> = {};
mockPatients.forEach((patient) => {
  mockMedicalRecords[patient.id] = Array.from({ length: 5 }, (_, i) => ({
    id: `MR${i + 1}`,
    patientId: patient.id,
    date: format(new Date(2024, 0, i + 1), 'yyyy-MM-dd'),
    diagnosis: 'Common cold',
    prescription: 'Rest and fluids',
    notes: 'Patient showing improvement',
    doctorId: 'D1',
    doctorName: 'Dr. Smith',
    type: i % 2 === 0 ? 'diagnosis' : 'prescription',
  }));
});

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: [],
  totalPatients: mockPatients.length,
  filters: {
    search: '',
    bloodType: '',
    gender: '',
  },
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, pageIndex: 0 },
    }));
    get().fetchPatients();
  },
  setPagination: (pagination) => {
    set((state) => ({
      pagination: { ...state.pagination, ...pagination },
    }));
    get().fetchPatients();
  },
  fetchPatients: async () => {
    const { filters, pagination } = get();
    
    // Simulate API call with filtering and pagination
    const filtered = mockPatients.filter((patient) => {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch = 
        patient.firstName.toLowerCase().includes(searchTerm) ||
        patient.lastName.toLowerCase().includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm);
      
      const matchesBloodType = !filters.bloodType || patient.bloodType === filters.bloodType;
      const matchesGender = !filters.gender || patient.gender === filters.gender;

      return matchesSearch && matchesBloodType && matchesGender;
    });

    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    const paginatedPatients = filtered.slice(start, end);

    set({ patients: paginatedPatients, totalPatients: filtered.length });
  },
  getPatient: async (id) => {
    const patient = mockPatients.find((p) => p.id === id);
    if (!patient) throw new Error('Patient not found');
    return patient;
  },
  getMedicalRecords: async (patientId) => {
    return mockMedicalRecords[patientId] || [];
  },
  addMedicalRecord: async (record) => {
    const newRecord: MedicalRecord = {
      ...record,
      id: `MR${Date.now()}`,
    };
    mockMedicalRecords[record.patientId] = [
      ...(mockMedicalRecords[record.patientId] || []),
      newRecord,
    ];
  },
  updatePatient: async (id, data) => {
    const patientIndex = mockPatients.findIndex((p) => p.id === id);
    if (patientIndex === -1) throw new Error('Patient not found');
    
    mockPatients[patientIndex] = {
      ...mockPatients[patientIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    get().fetchPatients();
  },
  createPatient: async (data) => {
    const newPatient: Patient = {
      ...data,
      id: `P${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockPatients.unshift(newPatient);
    mockMedicalRecords[newPatient.id] = [];
    
    get().fetchPatients();
  },
}));