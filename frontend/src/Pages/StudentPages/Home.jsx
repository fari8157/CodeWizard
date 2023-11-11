import React from 'react'
import Nav from '../../component/UserComponent/NavBar/Nav2'
import Header from '../../component/UserComponent/Header/Header'
import CategoryGrid from '../../component/UserComponent/CategoryGrid'
import PopularCourses from '../../component/UserComponent/Course/PopularCourses'
import OurSpecialties from '../../component/UserComponent/ourSpeciality/Speciality'
import BlogPosts from '../../component/UserComponent/Blog/BlogPosts'
import Footer from '../../component/UserComponent/Footer/Footer'
function Home() {
  return (
    <div>
    <Nav/>
    <Header/>
    <CategoryGrid/>
    <PopularCourses/>
    <OurSpecialties/>
    <BlogPosts/>
    <Footer/>
 </div>
  )
}

export default Home