import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const role = useAuthStore((state) => state.role);

  if (!role || (allowedRoles && !allowedRoles.includes(role))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
