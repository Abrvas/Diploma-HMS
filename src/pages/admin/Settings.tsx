import React from 'react';
import { SystemSettings } from '../../types/auth';
import { Settings as SettingsIcon, Bell, Shield, CreditCard } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

const mockSettings: SystemSettings[] = [
  {
    id: '1',
    name: 'System Name',
    value: 'Hospital Management System',
    description: 'The name of the system displayed throughout the application',
    category: 'general',
    updatedAt: '2024-03-15',
    updatedBy: 'Admin',
  },
  {
    id: '2',
    name: 'Two-Factor Authentication',
    value: 'enabled',
    description: 'Require 2FA for all administrative accounts',
    category: 'security',
    updatedAt: '2024-03-14',
    updatedBy: 'Admin',
  },
  {
    id: '3',
    name: 'Email Notifications',
    value: 'enabled',
    description: 'Send email notifications for important system events',
    category: 'notifications',
    updatedAt: '2024-03-13',
    updatedBy: 'Admin',
  },
  {
    id: '4',
    name: 'Payment Gateway',
    value: 'Stripe',
    description: 'Default payment processing service',
    category: 'payments',
    updatedAt: '2024-03-12',
    updatedBy: 'Admin',
  },
];

const getCategoryIcon = (category: string) => {
  const iconClasses = "w-5 h-5 text-brand-purple dark:text-brand-purple-light";
  
  switch (category) {
    case 'general':
      return <SettingsIcon className={iconClasses} />;
    case 'security':
      return <Shield className={iconClasses} />;
    case 'notifications':
      return <Bell className={iconClasses} />;
    case 'payments':
      return <CreditCard className={iconClasses} />;
    default:
      return <SettingsIcon className={iconClasses} />;
  }
};

export const Settings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-light-100">System Settings</h1>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {mockSettings.map((setting) => (
          <Card key={setting.id}>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-lg">
                  {getCategoryIcon(setting.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-light-100">
                      {setting.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Last updated: {setting.updatedAt}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{setting.description}</p>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      defaultValue={setting.value}
                      className="flex-1 form-input"
                    />
                    <Button variant="primary">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};