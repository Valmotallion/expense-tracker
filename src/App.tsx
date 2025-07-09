import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import NotAuthorizedPage from './pages/NotAuthorizedPage';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';

const App = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

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
