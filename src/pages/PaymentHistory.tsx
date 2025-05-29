import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';

const transactions = [
  {
    id: 1,
    date: '2024-03-15',
    description: 'Monthly Pension Payment',
    amount: 250000,
    status: 'completed',
    reference: 'TRX-001',
  },
  {
    id: 2,
    date: '2024-02-15',
    description: 'Monthly Pension Payment',
    amount: 250000,
    status: 'completed',
    reference: 'TRX-002',
  },
  {
    id: 3,
    date: '2024-01-15',
    description: 'Monthly Pension Payment',
    amount: 250000,
    status: 'completed',
    reference: 'TRX-003',
  },
];

export const PaymentHistory = () => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      // Create CSV content
      const csvContent = [
        ['Payment History Report'],
        ['Date', 'Description', 'Reference', 'Amount (₸)', 'Status'],
        ...transactions.map(t => [
          t.date,
          t.description,
          t.reference,
          t.amount.toLocaleString(),
          t.status
        ])
      ].map(row => row.join(',')).join('\n');

      // Create blob and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `payment_history_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payment History"
        actions={
          <Button
            variant="primary"
            onClick={handleExport}
            disabled={exporting}
            className="flex items-center gap-2"
          >
            {exporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export
              </>
            )}
          </Button>
        }
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-100">
              {transactions.map((transaction) => (
                <tr 
                  key={transaction.id} 
                  className="hover:bg-gray-50 dark:hover:bg-dark-100 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-light-100">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-light-100">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-light-100">
                    ₸ {transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="success">
                      {transaction.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};