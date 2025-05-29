import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];  // Делаем параметр опциональным
}

export const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  // Если роли не указаны или массив пустой, разрешаем доступ
  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // Проверяем роль пользователя
  if (!allowedRoles.includes(user.position)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};