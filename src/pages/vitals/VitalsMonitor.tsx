import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { PageHeader } from '../../components/ui/PageHeader';
import { Activity, Heart, Thermometer, Wind, Droplet } from 'lucide-react';
import { VitalSigns } from '../../types/vitals';

const mockVitals: VitalSigns = {
  id: '1',
  patientId: 'P1',
  timestamp: new Date().toISOString(),
  bloodPressure: {
    systolic: 120,
    diastolic: 80
  },
  heartRate: 75,
  temperature: 36.6,
  oxygenSaturation: 98,
  respiratoryRate: 16,
  notes: 'Patient stable'
};

export const VitalsMonitor = () => {
  const [vitals] = useState<VitalSigns>(mockVitals);

  const VitalCard = ({ 
    title, 
    value, 
    unit, 
    icon: Icon,
    color = 'text-brand-purple'
  }: { 
    title: string;
    value: number | string;
    unit: string;
    icon: React.ElementType;
    color?: string;
  }) => (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-opacity-10 ${color} bg-current`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-light-200">
            {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Patient Vitals Monitor" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VitalCard
          title="Blood Pressure"
          value={`${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`}
          unit="mmHg"
          icon={Activity}
          color="text-red-500"
        />
        <VitalCard
          title="Heart Rate"
          value={vitals.heartRate}
          unit="bpm"
          icon={Heart}
          color="text-pink-500"
        />
        <VitalCard
          title="Temperature"
          value={vitals.temperature}
          unit="°C"
          icon={Thermometer}
          color="text-orange-500"
        />
        <VitalCard
          title="Oxygen Saturation"
          value={vitals.oxygenSaturation}
          unit="%"
          icon={Wind}
          color="text-blue-500"
        />
        <VitalCard
          title="Respiratory Rate"
          value={vitals.respiratoryRate}
          unit="breaths/min"
          icon={Droplet}
          color="text-green-500"
        />
      </div>

      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-light-200 mb-4">
            Vitals History
          </h2>
          <div className="h-80 bg-gray-50 dark:bg-dark-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Chart will be implemented here
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-light-200 mb-4">
            Notes
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{vitals.notes}</p>
        </div>
      </Card>
    </div>
  );
};