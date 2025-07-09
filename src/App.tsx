import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import NotAuthorizedPage from './pages/NotAuthorizedPage';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { jwtDecode } from 'jwt-decode';
import { useEffect, type JSX } from 'react';
import { loginSuccess, logout } from './store/slices/authSlice';

const App = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const ProtectedRoute = ({
    element,
    allowedRoles
  }: {
    element: JSX.Element;
    allowedRoles: string[];
  }) => {
    if (!isAuthenticated || !user) return <Navigate to="/login" />;
    if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
    return element;
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          const user = {
            email: decoded.email,
            role: decoded.role,
          };
          dispatch(loginSuccess({ token, user }));
        } else {
          localStorage.removeItem('token');
          dispatch(logout());
        }
      } catch (error) {
        console.error('Invalid token',error);
        localStorage.removeItem('token');
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Role-Based Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={<EmployeeDashboard />}
              allowedRoles={['EMPLOYEE']}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={['ADMIN']}
            />
          }
        />

        {/* Unauthorized fallback */}
        <Route path="/unauthorized" element={<NotAuthorizedPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
