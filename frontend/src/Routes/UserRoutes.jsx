import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Home from '../Pages/StudentPages/Home'
import Login from '../Pages/StudentPages/Login'
import Signup from '../Pages/StudentPages/Signup'
import Course from '../Pages/StudentPages/Course'
import AboutUs from '../Pages/StudentPages/AboutUs'
import Blog from '../Pages/StudentPages/Blog'
import Profile from '../Pages/StudentPages/Profile'
import {UserProtectedRoutes,UserProtectedRoute} from '../ProtectiveRoutes/UserProctiveRoutes'
import Forgot from '../Pages/StudentPages/ForgetPassWord'
import Otp from'../Pages/StudentPages/Otp'
import Teset from '../Pages/StudentPages/teset'
import AdminProctiveRoutes from '../ProtectiveRoutes/AdminProtectiveRoutes'
import CourseDetails from '../Pages/StudentPages/CourseDetails'
import MyEntrollment from '../Pages/StudentPages/MyEntrollment'

import Chapters from '../Pages/StudentPages/Chapters'
import Chat from '../Pages/StudentPages/Chat'
import BlogDetail from '../Pages/StudentPages/BlogDetails'
import MyBlog from '../Pages/StudentPages/MyBlogs'


function UserRoutes() {
  return (
    <Routes>
     
        <Route path= '/' element ={<Home/>} />
        <Route path= '/login' element ={
          <UserProtectedRoutes>
         <Login/>
        </UserProtectedRoutes>} />
       
        <Route path= '/register' element ={
          <UserProtectedRoutes>
        <Signup/>
        </UserProtectedRoutes>} />
        <Route exact path= '/courses' element = {<Course/>}></Route>   
        <Route path='/aboutUs' element ={<AboutUs/>}></Route>  
        <Route path='/blogs' element={<Blog/>}></Route>
        <Route exact path="/blogDetails" element={<BlogDetail/>} />
        <Route exact path="/myBlogs" element={
         <UserProtectedRoute>
        <MyBlog/>
        </UserProtectedRoute>
        } />
        <Route path='/profile' element={
         <UserProtectedRoute>
        <Profile/>
        </UserProtectedRoute>
        }></Route>
        <Route path='/forgotPassword' element={<Forgot/>}></Route>
        <Route exact path="/courses/:id" element={<CourseDetails/>} />
        <Route exact path="/myEntrollments" element={
        <UserProtectedRoute>
        <MyEntrollment/>
        </UserProtectedRoute>
        } />
        <Route exact path="/myEntrollments/chapters" element={
        <UserProtectedRoute>
        <Chapters/>
        </UserProtectedRoute>} />
        <Route exact path="/chats" element={
        <UserProtectedRoute>
        <Chat/>
        </UserProtectedRoute>
        } />
        {/* <Route path='/forgotPassword/Otp' element={<Otp/>}></Route>
        <Route path= '/test' element={<Teset/>}></Route> */}

         </Routes>
  )
}

export default UserRoutes