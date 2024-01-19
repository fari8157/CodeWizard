// BlogListingPage.js

import React, { useEffect, useState } from 'react';
import  userAxiosInstance  from '../../../Axiox/UserAxiox';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const BlogListingPage = () => {
const navigate=useNavigate()
 const [blogPosts, setBlogPosts] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);

 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await userAxiosInstance.get(`/blogs?page=${currentPage}`);
       setBlogPosts(response.data.blogs);
       setTotalPages(response.data.totalPages);
     } catch (error) {
       console.error('Error fetching blogs:', error);
     }
   };

   fetchData();
 }, [currentPage]);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      {/* Banner for e-learning platform */}
      <div
        className="text-white text-center py-20"
        style={{
          backgroundImage: "url('https://blogs.infosupport.com/wp-content/uploads/2017/03/Header-20.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-6xl font-bold mb-8">Welcome to Our Blog Section</h1>
        <p className="text-2xl mb-10">Empowering students through knowledge and innovation!</p>
        <p className="text-3xl animate-bounce">Experience Learning Like Never Before</p>
        {/* The above animate-bounce class triggers a bounce animation */}
      </div>

      {/* Blog posts section */}
      <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {blogPosts && blogPosts.length > 0 ? (
    blogPosts.map(post => (
      <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:shadow-xl" onClick={() => navigate('/blogDetails', { state: post._id })}>
        <img src={post.coverImage.url} alt={post.title} className="w-full h-60 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-600 mb-2">By {post.user.fullName}</p>
          {/* Display formatted date */}
          <p className="text-sm text-gray-600">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-4 flex items-center justify-center h-48">
    <p className="text-xl text-gray-500">No blog posts available.</p>
    </div>
  )}
</div>

</div>
<div className="flex justify-center mt-8 gap-2 ">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="bg-gray-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        <FaChevronLeft />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`bg-gray-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${
            currentPage === page ? 'bg-blue-700' : ''
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="bg-gray-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        <FaChevronRight />
      </button>
    </div>
    </div>
  );
};

export default BlogListingPage;
