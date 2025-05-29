export interface VitalSigns {
  id: string;
  patientId: string;
  timestamp: string;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  notes?: string;
}

export interface VitalsChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    tension: number;
  }[];
}