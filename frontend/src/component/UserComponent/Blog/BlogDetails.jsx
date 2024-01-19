// BlogDetailPage.js

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import userAxios from "../../../Axiox/UserAxiox";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { AiFillDelete } from 'react-icons/ai'
import Swal from 'sweetalert2';
// Import any necessary components

const BlogDetailPage = () => {
  const{userAxiosInstance}=useAxiosPrivate()
  const [blog, setBlog] = useState('');
  const [newComment, setNewComment] = useState("");

  const location = useLocation();
  const postId = location.state && location.state;
  const { Token, role, userId } = useSelector((state) => state.Client);
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await userAxios.get(
          `blogDetails?postId=${postId}`
        );
        setBlog(response.data);
        console.log(response.data); // Example: Log the received data
      } catch (error) {
        // Handle errors
        console.error("Error fetching blog details:", error);
      }
    };

    if (postId) {
      fetchBlogDetails();
    }
  }, [postId]);
  // Dummy blog post data for demonstration
  

  // State for new comment input
 
  
  const handleAddComment =async () => {
    const trimmedComment = newComment.trim();
    if (!trimmedComment) {
      // Show SweetAlert for an empty comment
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please enter a valid comment!',
      });
      return;
    }
   console.log("Adding comment:", newComment);
   const response = await userAxiosInstance.post(`addComment?blogId=${postId}`, { newComment });
   setBlog( response.data);

   setNewComment("");
  };
  const handleDeleteComment = async (commentId) => {
    try {
      // Make an API call to delete the comment
      await userAxiosInstance.delete(`deleteComment?commentId=${commentId}&blogId=${postId}`);


      // Filter out the deleted comment from the state
      const updatedComments = blog.comments.filter(comment => comment._id !== commentId);

      // Update the state with the filtered comments
      setBlog(prevBlog => ({
        ...prevBlog,
        comments: updatedComments,
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Handle error if deletion fails
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <img
            src={blog?.coverImage?.url}
            alt="Blog Post"
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="flex justify-between items-center text-gray-600 mb-6">
          <div className="flex items-center">
            <div className="mr-2">
              <div className="text-sm font-semibold">
                {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              {/* Show date and month in a small box */}
            </div>
          </div>

          <div className="text-sm">{blog?.comments?.length} Comments</div>
        </div>
        <h1 className="text-4xl font-bold mb-6">{blog?.title}</h1>
        <div className="mb-8">
          <p className="text-lg">By {blog?.user?.fullName}</p>
          {/* Add other details like category or tags here */}
        </div>
        <div
          className="text-lg mb-8"
          dangerouslySetInnerHTML={{ __html: blog?.description }}
        ></div>
        {/* This uses dangerouslySetInnerHTML which should be used carefully if content is user-generated */}

        {/* Comments Section */}
        <div className="mt-8">
          {Token && role && (
            <div className="mt-6">
              <textarea
                className="w-full p-3 border rounded-md"
                rows="4"
                placeholder="Add your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md text-lg"
                  onClick={handleAddComment}
                >
                  Add Comment
                </button>
              </div>
            </div>
          )}

          <h2 className="text-3xl mb-6">Comments</h2>
          {blog?.comments?.length > 0 ? (
  blog.comments.map((comment) => (
    <div key={comment._id} className="bg-gray-100 p-4 rounded-md mb-6">
      <p className="font-semibold">{comment?.user?.fullName}</p>
      <div className="flex justify-end">
        {userId === comment.user._id && (
          <AiFillDelete
            className="text-red-500 cursor-pointer"
            onClick={() => handleDeleteComment(comment._id)}
          />
        )}
      </div>
      <p className="text-sm text-gray-600 mb-2">
        {new Date(comment?.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <p className="text-lg">{comment?.content}</p>
    </div>
  ))
) : (
  <p>No comments available</p>
)}

          {/* Add form for adding new comments */}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
