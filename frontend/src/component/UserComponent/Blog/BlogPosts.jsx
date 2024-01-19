import React, { useEffect, useState } from 'react';
import LatestBlogPost from './BlogPost'; 
import Image from '/banner.png';
import { userAxios } from '../../../Axiox/UserAxiox';
import { Link, useNavigate } from 'react-router-dom';

const BlogPosts = () => {
  const [blogs, setBlog] = useState([]);
 
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await userAxios.get('homeBlogs');
        setBlog(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlog();
  }, []);

  return (
    <div className='text-center'>
      <h2 className="text-3xl font-bold uppercase text-blue-950 mb-4">Our Latest Blogs</h2>
      <div className="flex flex-wrap">
        {blogs.map((blog) => (
          <div key={blog._id} className="w-full md:w-1/3 p-4">
            <LatestBlogPost
              post={{
                id: blog._id,
                image: blog.coverImage.url, 
                date: blog.createdAt,
                title: blog.title,
                description: blog.description,
              }}
            />
          </div>
        ))}
      </div>
      <div className='flex justify-center mt-10'>
      <Link to="/blogs">
        <button
          type="button"
          className="md:flex inline-block rounded-full border border-blue-500  text-blue-500 dark:bg-yellow-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal hover:text-white dark:text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-cyan-600 dark:hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-cyan-600 dark:focus-bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus-outline-none focus-ring-0 active-bg-cyan-700 dark:active-bg-neutral-200 active-shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] "
        >
          More Blogs
        </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogPosts;
