import React from 'react'
import Navbar from '../../component/UserComponent/NavBar/Nav2'
import Blog from'../../component/UserComponent/Myblogs/MyblogList'
import Footer from '../../component/UserComponent/Footer/Footer2'
function MyBlog() {
  return (
    <div>
        <Navbar/>
        <Blog/>
        <Footer/>
    </div>
  )
}

export default MyBlog