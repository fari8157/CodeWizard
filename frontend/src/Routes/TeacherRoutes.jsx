import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TeacherLogin from '../Pages/TeacherPages/Login'
import TeacherSignup from '../Pages/TeacherPages/SignUp'
import ForgetPass from '../Pages/TeacherPages/ForgetPass'
import Dashboard from '../Pages/TeacherPages/Dashboard'
import TeacherProtective from '../ProtectiveRoutes/TeacherProtective'
import UserProctiveRoutes from '../ProtectiveRoutes/UserProctiveRoutes'
import UploadClasses from '../Pages/TeacherPages/UploadClass'
import Profile from '../Pages/TeacherPages/Profile'
import UploadDetails from '../Pages/TeacherPages/UploadDetails'

function TeacherRoutes() {
  return (
    <Routes>
   <Route path='/login' element={
    
      <UserProctiveRoutes>
   <TeacherLogin/>
   </UserProctiveRoutes>
  
   }></Route>
   <Route path='/register' element={<TeacherSignup/>}></Route>
   <Route path='/forgot' element={<ForgetPass/>}></Route>
   <Route path='/Dashboard' element={<Dashboard/>}></Route>
   <Route path='/uploadCourse' element={<UploadClasses/>}></Route>
   <Route path='/profile' element={<Profile/>}></Route>
   <Route path='/uploadDetails' element={<UploadDetails/>}></Route>

   
   

</Routes>
  )
}

export default TeacherRoutes
