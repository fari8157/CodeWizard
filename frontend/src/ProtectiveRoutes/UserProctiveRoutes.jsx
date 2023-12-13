import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

function UserProctiveRoutes({ children }) {
  const { Token,role } = useSelector((state) => state.Client);
  const location = useLocation();

//   return Token &&role=='student' ?  (
//     <Navigate to="/" state={{ from: location.pathname }} replace />
//   ) : Token &&role=='admin' ?  (
//     <Navigate to="/admin/dashbord" state={{ from: location.pathname }} replace />
//     ) : (
//       // <Navigate to="/" state={{ from: location.pathname }} replace />
//       children
//   );
// }
return Token && role === 'student' ? (
  <Navigate to="/" state={{ from: location.pathname }} replace />
) : Token && role === 'admin' ? (
  <Navigate to="/admin/dashbord" state={{ from: location.pathname }} replace />
) : Token && role === 'teacher' ? (
  <Navigate to="/teacher/Dashboard" state={{ from: location.pathname }} replace />
) : (
  children
);
}

export default UserProctiveRoutes;
// import { useSelector } from 'react-redux';
// import { useLocation, Navigate } from 'react-router-dom';

// function UserProctiveRoutes({ children }) {
//   const { Token, role } = useSelector((state) => state.Client);
//   const location = useLocation();

//   if (Token && role) {
//     if (role === 'student') {
//       return <Navigate to="/" state={{ from: location.pathname }} replace />;
//     } else if (role === 'admin') {
//       return <Navigate to="/admin/dashbord" state={{ from: location.pathname }} replace />;
//     }
//   }

//   return children;
// }

// export default UserProctiveRoutes;
