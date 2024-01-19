import React from 'react';
import 'tailwindcss/tailwind.css';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import TeacherRoutes from './Routes/TeacherRoutes';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/teacher/*" element={<TeacherRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
