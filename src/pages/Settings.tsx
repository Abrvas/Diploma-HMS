import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import { Bell, Lock, Shield, Check, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/ui/PageHeader';
import { Modal } from '../components/ui/Modal';

export const Settings = () => {
  const { user } = useAuthStore();
  const [activeModal, setActiveModal] = useState<'password' | '2fa' | 'notifications' | null>(null);
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
      <PageHeader title="Settings" />

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

      {/* Change Password Modal */}
      <Modal
        isOpen={activeModal === 'password'}
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
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2FA Modal */}
      <Modal
        isOpen={activeModal === '2fa'}
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
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        isOpen={activeModal === 'notifications'}
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
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};