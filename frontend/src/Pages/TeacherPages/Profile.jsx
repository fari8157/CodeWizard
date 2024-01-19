import React from 'react'
import Navbar from '../../component/TeacherComponents/Nav/NavBar'
import Profile from '../../component/TeacherComponents/Profile/Profile'
const ProfilePage = () => {
  return (
    <div className='w-screen h-screen+50 md:h-screen overflow-x-hidden'> 
  <Navbar/>
  <Profile/> 


    </div>
  )
}

export default ProfilePage