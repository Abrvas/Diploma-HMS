import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Check, User, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore, Notification } from '../../store/notificationStore';
import { format } from 'date-fns';
import { ThemeToggle } from "../ui/ThemeToggle";
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const { name, role, avatar, logout } = useAuthStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        buttonRef.current &&
        !notificationsRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        profileButtonRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    navigate('/settings');
  };

  return (
    <header className="h-20 fixed top-0 right-0 left-64 z-20 bg-white dark:bg-dark-200 border-b border-gray-200 dark:border-dark-100">
      <div className="h-full px-8 flex items-center justify-between gap-6">
        {/* Search Section */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-dark-100 bg-white dark:bg-dark-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent text-gray-900 dark:text-light-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-6">
          <ThemeToggle />

          {/* Notifications */}
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors group"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-light-200" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-purple rounded-full" />
              )}
            </button>

            {showNotifications && (
              <div
                ref={notificationsRef}
                className="absolute right-0 mt-3 w-96 bg-white dark:bg-dark-200 rounded-xl shadow-lg dark:shadow-dark-lg border border-gray-200 dark:border-dark-100 z-50"
              >
                <div className="p-4 border-b border-gray-200 dark:border-dark-100 flex items-center justify-between bg-gray-50 dark:bg-dark-100">
                  <h3 className="font-medium text-gray-900 dark:text-light-200">Notifications</h3>
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-brand-purple hover:text-brand-purple-dark dark:hover:text-brand-purple-light font-medium transition-colors"
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-[480px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`p-4 border-b border-gray-200 dark:border-dark-100 hover:bg-gray-50 dark:hover:bg-dark-100 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-brand-purple-light/10 dark:bg-brand-purple/10' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 mt-2 rounded-full transition-colors ${
                              notification.read ? 'bg-gray-300 dark:bg-gray-600' : 'bg-brand-purple'
                            }`}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-900 dark:text-light-200">{notification.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                              {format(new Date(notification.createdAt), 'MMM d, yyyy HH:mm')}
                            </p>
                          </div>
                          {notification.read ? (
                            <Check className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          ) : (
                            <div className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <div
              ref={profileButtonRef}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-4 cursor-pointer"
            >
              <div className="text-right mr-2">
                <p className="text-sm font-medium text-gray-900 dark:text-light-200">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role}</p>
              </div>
              <img
                src={avatar || ''}
                alt={name || 'Profile'}
                className="w-10 h-10 rounded-full border-2 border-gray-100 dark:border-dark-100 hover:border-brand-purple dark:hover:border-brand-purple transition-colors"
              />
            </div>

            {showProfileMenu && (
              <div
                ref={profileRef}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-200 rounded-lg shadow-lg dark:shadow-dark-lg py-1 z-50"
              >
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-100"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={handleSettingsClick}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-100"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <div className="border-t border-gray-200 dark:border-dark-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-dark-100"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
