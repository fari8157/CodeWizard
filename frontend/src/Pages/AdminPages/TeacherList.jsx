import React from 'react'
import Navbar from '../../component/AdminComponent/NavBar/Nav2'
import TeacherManagement from '../../component/AdminComponent/TeacherList/TeacherManagement'

function TeacherList() {
  return (
    <div className='w-screen h-screen overflow-x-hidden'>
      <Navbar/>
      <TeacherManagement/>
    </div>
  )
}

export default TeacherList
