import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from '../Pages/StudentPages/Home'
import Login from '../Pages/StudentPages/Login'
import Signup from '../Pages/StudentPages/Signup'
import Course from '../Pages/StudentPages/Course'
import AboutUs from '../Pages/StudentPages/AboutUs'
import Blog from '../Pages/StudentPages/Blog'
import Profile from '../Pages/StudentPages/Profile'
import UserProctiveRoutes from '../ProtectiveRoutes/UserProctiveRoutes'
import Forgot from '../Pages/StudentPages/ForgetPassWord'
import Otp from'../Pages/StudentPages/Otp'
import Teset from '../Pages/StudentPages/teset'
import AdminProctiveRoutes from '../ProtectiveRoutes/AdminProtectiveRoutes'
import CourseDetails from '../Pages/StudentPages/CourseDetails'


function UserRoutes() {
  return (
    <Routes>
     
        <Route path= '/' element ={<Home/>} />
        <Route path= '/login' element ={
          <UserProctiveRoutes>
         <Login/>
        </UserProctiveRoutes>} />
       
        <Route path= '/register' element ={
          <UserProctiveRoutes>
        <Signup/>
        </UserProctiveRoutes>} />
        <Route exact path= '/courses' element = {<Course/>}></Route>   
        <Route path='/aboutUs' element ={<AboutUs/>}></Route>  
        <Route path='/blogs' element={<Blog/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/forgotPassword' element={<Forgot/>}></Route>
        <Route exact path="/courses/:id" element={<CourseDetails/>} />
        {/* <Route path='/forgotPassword/Otp' element={<Otp/>}></Route>
        <Route path= '/test' element={<Teset/>}></Route> */}

         </Routes>
  )
}

export default UserRoutes