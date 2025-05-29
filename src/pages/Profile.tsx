import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { Camera, Lock, Shield, Bell, Check } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';
import { Modal } from '../components/ui/Modal';

export const Profile = () => {
  const { user } = useAuthStore();
  const [activeModal, setActiveModal] = useState<'password' | '2fa' | 'notifications' | 'avatar' | null>(null);
  const { addNotification } = useNotificationStore();
  const [loading, setLoading] = useState(false);

  const handleSettingsSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addNotification({
        title: 'Settings Updated',
        message: 'Your settings have been successfully updated.',
        type: 'success',
      });
      setActiveModal(null);
    } catch (error) {
      addNotification({
        title: 'Error',
        message: 'Failed to update settings. Please try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" />

      <Card>
        <div className="p-8 border-b border-gray-200 dark:border-dark-100 relative">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-24 h-24 rounded-full border-4 border-white dark:border-dark-100 shadow-lg"
              />
              <button
                onClick={() => setActiveModal('avatar')}
                className="absolute bottom-0 right-0 p-2 bg-brand-purple text-white rounded-full hover:bg-brand-purple-dark transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-light-200">{user?.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mt-1">Role: {user?.role}</p>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-light-200 mb-4">Account Details</h4>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee ID</dt>
                <dd className="text-sm text-gray-900 dark:text-light-200 mt-1">{user?.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</dt>
                <dd className="text-sm text-gray-900 dark:text-light-200 mt-1 capitalize">{user?.role}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Join Date</dt>
                <dd className="text-sm text-gray-900 dark:text-light-200 mt-1">January 15, 2024</dd>
              </div>
            </dl>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-light-200 mb-4">Contact Information</h4>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                <dd className="text-sm text-gray-900 dark:text-light-200 mt-1">{user?.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                <dd className="text-sm text-gray-900 dark:text-light-200 mt-1">+1 (555) 123-4567</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                <dd className="text-sm text-gray-900 dark:text-light-200 mt-1">123 Hospital Street, Medical District</dd>
              </div>
            </dl>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6 border-b border-gray-200 dark:border-dark-100">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-light-200">Account Settings</h2>
        </div>
        <div className="p-6">
          <div className="space-y-2">
            <button
              onClick={() => setActiveModal('password')}
              className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-100/50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <span className="block font-medium">Change Password</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Update your password regularly to keep your account secure</span>
                </div>
              </div>
              <span className="text-gray-400 dark:text-gray-500">•••••••••</span>
            </button>

            <button
              onClick={() => setActiveModal('2fa')}
              className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-100/50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <span className="block font-medium">Two-Factor Authentication</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</span>
                </div>
              </div>
              <span className="text-red-500 dark:text-red-400">Disabled</span>
            </button>

            <button
              onClick={() => setActiveModal('notifications')}
              className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-100/50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <span className="block font-medium">Email Notifications</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Manage your email notification preferences</span>
                </div>
              </div>
              <span className="text-green-500 dark:text-green-400">Enabled</span>
            </button>
          </div>
        </div>
      </Card>

      {activeModal === 'password' && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Change Password"
        >
          <form onSubmit={(e) => { e.preventDefault(); handleSettingsSave(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                className="form-input"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveModal(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {activeModal === '2fa' && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Two-Factor Authentication"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="enable2fa"
                className="form-checkbox"
              />
              <label htmlFor="enable2fa" className="text-sm text-gray-700 dark:text-gray-300">
                Enable Two-Factor Authentication
              </label>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-dark-100/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Two-factor authentication adds an extra layer of security to your account by requiring more than just a password to sign in.
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setActiveModal(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSettingsSave}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'notifications' && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Email Notifications"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="appointmentNotifications"
                defaultChecked
                className="form-checkbox"
              />
              <div>
                <label htmlFor="appointmentNotifications" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Appointment Reminders
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Receive notifications about upcoming appointments
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="systemNotifications"
                defaultChecked
                className="form-checkbox"
              />
              <div>
                <label htmlFor="systemNotifications" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  System Updates
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Get notified about important system changes
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setActiveModal(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSettingsSave}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {activeModal === 'avatar' && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Update Profile Picture"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-1.5 bg-brand-purple text-white rounded-full hover:bg-brand-purple-dark transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById('avatar-upload')?.click()}
            >
              Choose new photo
            </Button>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setActiveModal(null)}
              >
                Cancel
               </Button>
              <Button
                variant="primary"
                onClick={handleSettingsSave}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};