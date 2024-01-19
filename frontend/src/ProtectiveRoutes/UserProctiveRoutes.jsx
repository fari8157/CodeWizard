import { useSelector } from 'react-redux';
import { useLocation, Navigate, Route } from 'react-router-dom';

function UserProtectedRoutes({ children }) {
  const { Token, role } = useSelector((state) => state.Client);
  const location = useLocation();

  return Token && role === 'student' ? (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  ) : Token && role === 'admin' ? (
    <Navigate to="/admin/dashboard" state={{ from: location.pathname }} replace />
  ) : Token && role === 'teacher' ? (
    <Navigate to="/teacher/Dashboard" state={{ from: location.pathname }} replace />
  ) : (
    children
  );
}

function UserProtectedRoute({ children }) {
  const { Token, role } = useSelector((state) => state.Client);
  const location = useLocation();

  return Token && role === 'student' ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  );
}

export { UserProtectedRoutes, UserProtectedRoute };
