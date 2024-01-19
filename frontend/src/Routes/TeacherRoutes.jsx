import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TeacherLogin from '../Pages/TeacherPages/Login'
import TeacherSignup from '../Pages/TeacherPages/SignUp'
import ForgetPass from '../Pages/TeacherPages/ForgetPass'
import Dashboard from '../Pages/TeacherPages/Dashboard'
import TeacherProtective from '../ProtectiveRoutes/TeacherProtective'
import {UserProtectedRoutes} from '../ProtectiveRoutes/UserProctiveRoutes'
import UploadClasses from '../Pages/TeacherPages/UploadClass'
import Profile from '../Pages/TeacherPages/Profile'
import UploadDetails from '../Pages/TeacherPages/UploadDetails'
import RunnigClass from '../Pages/TeacherPages/RunnigClass'
import ChapterShowing from '../Pages/TeacherPages/ChapterShowing'
import Payment from '../Pages/TeacherPages/Payment'
import ChapterDetails from '../Pages/TeacherPages/ChapterDetails'
import Chat from '../Pages/TeacherPages/Chat'

function TeacherRoutes() {
  return (
    <Routes>
   <Route path='/login' element={
    
      <UserProtectedRoutes>
   <TeacherLogin/>
   </UserProtectedRoutes>
  
   }></Route>
   <Route path='/register' element={
    <UserProtectedRoutes>
   <TeacherSignup/>
   </UserProtectedRoutes>
   }></Route>
   <Route path='/forgot' element={<ForgetPass/>}></Route>
   <Route path='/Dashboard' element={
   <TeacherProtective>
   <Dashboard/>
   </TeacherProtective>}></Route>
   <Route path='/uploadCourse' element={
   <TeacherProtective>
   <UploadClasses/>
   </TeacherProtective>
  }></Route>
   <Route path='/profile' element={
   <TeacherProtective>
   <Profile/>
   </TeacherProtective>
   }></Route>
   <Route path='/uploadDetails' element={
   <TeacherProtective>
   <UploadDetails/>
   </TeacherProtective>
   }></Route>
   <Route path='/courses' element={
   
   <RunnigClass/>}></Route>
   <Route exact path="/chapters/:courseId" element={<ChapterShowing/>} />
   <Route path='/payments' element={<Payment/>}></Route>
   <Route path='/chapterDetails' element={<ChapterDetails/>}></Route>
   <Route path='/chat' element={<Chat/>}></Route>


   
   

</Routes>
  )
}

export default TeacherRoutes
