import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const LogoutButton = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-600 hover:text-red-800 font-medium"
    >
      Выйти
    </button>
  );
};

export default LogoutButton;
