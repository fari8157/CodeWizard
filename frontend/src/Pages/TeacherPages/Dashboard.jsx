import React from 'react'
import Navbar from '../../component/TeacherComponents/Nav/NavBar'
import DashHome from '../../component/TeacherComponents/Dashbord/DashHome'

function Dashboard() {
  return (
    <div className=' overflow-x-hidden'>
      <Navbar/>
     <DashHome/>
    </div>
  )
}

export default Dashboard
