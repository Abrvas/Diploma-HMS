import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientStore } from '../../store/patientStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { PageHeader } from '../ui/PageHeader';
import { SearchInput } from '../ui/SearchInput';
import { Badge } from '../ui/Badge';

export const PatientList = () => {
  const navigate = useNavigate();
  const {
    patients,
    totalPatients,
    filters,
    pagination,
    setFilters,
    setPagination,
    fetchPatients,
  } = usePatientStore();

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const totalPages = Math.ceil(totalPatients / pagination.pageSize);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate('/patients/new')}
          >
            Add Patient
          </Button>
        }
      />

      <Card>
        <div className="p-4 border-b border-gray-200 dark:border-dark-100">
          <SearchInput
            placeholder="Search patients..."
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Blood Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-200 divide-y divide-gray-200 dark:divide-dark-100">
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  onClick={() => navigate(`/patients/${patient.id}`)}
                  className="hover:bg-gray-50 dark:hover:bg-dark-100/50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-light-200">
                      {patient.firstName} {patient.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {patient.gender}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="info">
                      {patient.bloodType}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{patient.phone}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{patient.email}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-dark-100 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing{' '}
            <span className="font-medium">
              {pagination.pageIndex * pagination.pageSize + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                totalPatients
              )}
            </span>{' '}
            of <span className="font-medium">{totalPatients}</span> results
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                setPagination({ pageIndex: pagination.pageIndex - 1 })
              }
              disabled={pagination.pageIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setPagination({ pageIndex: pagination.pageIndex + 1 })
              }
              disabled={pagination.pageIndex === totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};