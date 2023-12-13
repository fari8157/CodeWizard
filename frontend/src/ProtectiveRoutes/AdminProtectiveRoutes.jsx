import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

function AdminProctiveRoutes({ children }) {
  const { role,Token } = useSelector((state) => state.Client);
  const location = useLocation();

  return Token &&(role==='admin') ? (
    children
    ) : (
      <Navigate to="/" state={{ from: location.pathname }} replace />
  );
}

export default AdminProctiveRoutes;
