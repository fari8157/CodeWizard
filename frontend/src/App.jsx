import React from 'react'
import 'tailwindcss/tailwind.css';
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';
import AdminRoutes from './Routes/AdminRoutes';




function App() {


  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path = '/*' element ={<UserRoutes/>}/>
      <Route path = '/admin*' element ={<AdminRoutes/>}/>
     </Routes>
    </BrowserRouter> 
    {/* <Nav/>
    {/* <Nav2/>
     <Table/> */}
    </>
  )
}

export default App
