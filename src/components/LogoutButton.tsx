import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };

  return (
    <button onClick={handleLogout} className="text-red-600">
      Logout
    </button>
  );
};

export default LogoutButton;
