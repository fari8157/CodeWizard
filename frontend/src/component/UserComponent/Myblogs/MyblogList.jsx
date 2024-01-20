import React, { useEffect, useState } from "react";
import AddBlogModal from './AddBlog';
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BlogListingPage = () => {
  const navigate =useNavigate()
  const { userId } = useSelector((state) => state.Client);
  const {userAxiosInstance}=useAxiosPrivate()
  const [showModal, setShowModal] = useState(false);
  const [editPost, setEditPost] = useState(null)
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await userAxiosInstance.get(`myBlog/${userId}`);
        setBlogPosts(response.data.blogs);
      } catch (error) {
        // Handle errors, e.g., set error state or show an error message
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts(); // Invoke the async function
  }, [userId]); // 

  const handleAddBlog = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditPost(null); // Reset edit post when closing modal
  };

  const handleSaveBlog = (newBlogData) => {
    // If there's an editPost, update that post, else add a new post
    if (editPost) {
      const updatedPosts = blogPosts.map(post =>
        post._id === editPost._id ? { ...post, ...newBlogData } : post
      );
      setBlogPosts(updatedPosts);
      setEditPost(null); // Reset edit post after saving changes
    } else {
      setBlogPosts([...blogPosts, newBlogData]);
    }
    setShowModal(false);
  };

  const handleDeleteBlog = async (id) => {
    try {
      const response = await userAxiosInstance.delete(`deleteBlog/${id}`);
      console.log(response);
      const updatedBlogPosts = blogPosts.filter((post) => post._id !== id);
      setBlogPosts(updatedBlogPosts);
      } catch (error) {
      console.error('Error deleting blog:', error);
      // Handle error: display an error message, perform logging, etc.
      // Example: toast.error('Failed to delete blog');
    }
  };
  

  const handleEditBlog = (post) => {
    setEditPost(post);
    setShowModal(true);
  };

  return (
    <div>
      {/* Banner for blog creation section */}
      <div
        className="text-white text-center py-24 relative"
        style={{
          backgroundImage:
            "url('https://www.dckap.com/wp-content/uploads/2023/05/Untitled-design-31.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-pulse text-blue-500">
          Start Your Blogging Journey
        </h1>
        <p className="text-lg mb-8 animate-bounce ">
          Craft Compelling Stories, Share Insights, and Inspire Others!
        </p>
        {/* Add more engaging content related to starting a blog */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <button className="border-2 border-green-600 hover:bg-green-600 text-white py-2 px-6 rounded-md transition duration-300 animate-pulse" onClick={handleAddBlog}>
            Add Blog
          </button>
        </div>
      </div>

      {/* Blog creation section */}
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.length > 0 ? (
    blogPosts.map(post => (
      <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl" onClick={() => navigate('/blogDetails', { state: post._id })}>
        <img src={post.coverImage.url} alt={post.title} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-600 mb-2">{post.date}</p>
          <div className="flex justify-between">
            <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition duration-300 mr-2" onClick={() => handleDeleteBlog(post._id)}>
              Delete
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md transition duration-300" onClick={() => handleEditBlog(post)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="text-center text-gray-600 mt-4">
      <p>Add your first blog.</p>
    </div>
  )}
        </div>
      </div>
      {showModal && (
        <AddBlogModal onClose={handleCloseModal} onSave={handleSaveBlog} editPost={editPost} />
      )}
    </div>
  );
};

export default BlogListingPage;
