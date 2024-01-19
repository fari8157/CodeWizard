import React from 'react'
import Navbar from '../../component/AdminComponent/NavBar/Nav2'
import Profile from '../../component/AdminComponent/TeacherList/TeacherDetails'

function TeacherDetails() {
  return (
    <div className='w-screen h-screen+50 md:h-screen overflow-x-hidden'>
      <Navbar/>
      <Profile/>
    </div>
  )
}

export default TeacherDetails
