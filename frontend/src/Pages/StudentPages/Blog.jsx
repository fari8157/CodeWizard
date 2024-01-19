import React from 'react'
import Navbar from '../../component/UserComponent/NavBar/Nav2'
import BlogListingPage from '../../component/UserComponent/Blog/BlogList'
import Footer from '../../component/UserComponent/Footer/Footer2'

function Blog() {
  return (
    <div>
      <Navbar/>
      <BlogListingPage/>
      <Footer/>
    </div>
  )
}

export default Blog