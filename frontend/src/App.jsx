import React from 'react'
import Navbar from './component/UserComponent/NavBar/Nav'
import 'tailwindcss/tailwind.css';
import './App.css'
import Navbar2 from './component/UserComponent/NavBar/Nav2';

import Signup from './component/UserComponent/Signup/Signup';
import Login from './component/UserComponent/Login/Login';
import TeacherLogin from './component/TeacherComponents/TeacherLogin';
import TeacherSignup from './component/TeacherComponents/TeacherSignup/TeacherSignup';
import SampleLogin from './component/TeacherComponents/TeacherLogin/SampleLogin';




function App() {


  return (
    <>
    {/* <Navbar/> */}
    <Navbar2/>
    <Signup/>
    {/* <Login/> */}
    {/* <TeacherLogin/> */}
    {/* <TeacherSignup/> */}
    
    
       
    </>
  )
}

export default App
