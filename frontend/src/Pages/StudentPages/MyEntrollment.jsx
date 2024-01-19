import React from 'react'
import CourseShowing from '../../component/UserComponent/MyEntrollment/courseShowing'
import Navbar from '../../component/UserComponent/NavBar/Nav2'
import Footer from '../../component/UserComponent/Footer/Footer2'
import EnrollmentCard from '../../component/UserComponent/MyEntrollment/EntrollmentCard'
import MyEntrollments from '../../component/UserComponent/MyEntrollment/MyEntrollments'

function MyEntrollment() {
  return (
    <div>
        <Navbar/>
      < MyEntrollments/>
      <Footer/>
    </div>
  )
}

export default MyEntrollment
