import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

function TeacherProtective() {
    const { Token,role } = useSelector((state) => state.Client);
    const location = useLocation();
  return (
    Token && (role === 'teacher') ? (
     
      children
      ) : (
        <Navigate to="/" state={{ from: location.pathname }} replace />
  )
  )
}

export default TeacherProtective

