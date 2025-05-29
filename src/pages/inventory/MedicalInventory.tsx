import React, { useState } from 'react';
import { Package, AlertTriangle, Plus, Search } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { PageHeader } from '../../components/ui/PageHeader';
import { SearchInput } from '../../components/ui/SearchInput';
import { Badge } from '../../components/ui/Badge';
import { MedicalItem } from '../../types/inventory';

const mockInventory: MedicalItem[] = [
  {
    id: '1',
    name: 'Surgical Masks',
    category: 'PPE',
    quantity: 1000,
    unit: 'pieces',
    minimumStock: 500,
    expiryDate: '2025-12-31',
    supplier: 'Medical Supplies Co.',
    location: 'Storage Room A'
  },
  {
    id: '2',
    name: 'Disposable Gloves',
    category: 'PPE',
    quantity: 200,
    unit: 'boxes',
    minimumStock: 100,
    expiryDate: '2025-06-30',
    supplier: 'Medical Supplies Co.',
    location: 'Storage Room A'
  },
  {
    id: '3',
    name: 'Paracetamol 500mg',
    category: 'Medication',
    quantity: 50,
    unit: 'boxes',
    minimumStock: 30,
    expiryDate: '2024-12-31',
    supplier: 'Pharma Inc.',
    location: 'Pharmacy Storage'
  }
];

export const MedicalInventory = () => {
  const [inventory] = useState<MedicalItem[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLowStockStatus = (item: MedicalItem) => {
    if (item.quantity <= item.minimumStock * 0.5) return 'error';
    if (item.quantity <= item.minimumStock) return 'warning';
    return 'success';
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Medical Inventory"
        actions={
          <Button
            variant="primary"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Items
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-light-200">
                {inventory.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Low Stock Items
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-light-200">
                {inventory.filter(item => item.quantity <= item.minimumStock).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-200 dark:border-dark-100">
          <SearchInput
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-dark-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Expiry Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-200 divide-y divide-gray-200 dark:divide-dark-100">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 dark:hover:bg-dark-100/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-light-200">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.supplier}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="info">
                      {item.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-light-200">
                      {item.quantity} {item.unit}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Min: {item.minimumStock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getLowStockStatus(item)}>
                      {item.quantity <= item.minimumStock * 0.5 ? 'Critical' :
                        item.quantity <= item.minimumStock ? 'Low Stock' : 'In Stock'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {item.expiryDate}
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