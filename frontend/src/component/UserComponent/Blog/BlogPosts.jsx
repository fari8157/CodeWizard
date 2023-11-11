// LatestBlogPosts.js
import React from 'react';
import LatestBlogPost from './BlogPost'; // Import the LatestBlogPost component
import Image from '/banner.png';

const latestBlogPosts = [
  {
    id: 1,
    image: Image,
    date: 'Nov 1, 2023',
    title: 'Blog Post Title 1',
    description: 'This is a brief description of the first blog post.',
  },
  {
    id: 2,
    image: Image,
    date: 'Nov 2, 2023',
    title: 'Blog Post Title 2',
    description: 'This is a brief description of the second blog post.',
  },
  {
    id: 3,
    image: Image,
    date: 'Nov 3, 2023',
    title: 'Blog Post Title 3',
    description: 'This is a brief description of the third blog post.',
  },
  {
    id: 1,
    image: Image,
    date: 'Nov 1, 2023',
    title: 'Blog Post Title 1',
    description: 'This is a brief description of the first blog post.',
  },
  {
    id: 2,
    image: Image,
    date: 'Nov 2, 2023',
    title: 'Blog Post Title 2',
    description: 'This is a brief description of the second blog post.',
  },
  {
    id: 3,
    image: Image,
    date: 'Nov 3, 2023',
    title: 'Blog Post Title 3',
    description: 'This is a brief description of the third blog post.',
  },]
  // Add more blog post objects as needed


  
    const BlogPosts = () => {
        const columns = 3; // Number of columns
      
        // Split the blog posts into groups of 3
        const groupedPosts = [];
        for (let i = 0; i < latestBlogPosts.length; i += columns) {
          groupedPosts.push(latestBlogPosts.slice(i, i + columns));
        }
      
        return (
          <div className='text-center'>
            <h2 className="text-3xl font-bold uppercase text-blue-950 mb-4">Our Latest Blogs</h2>
            {groupedPosts.map((row, rowIndex) => (
              <div key={rowIndex} className="flex mb-4">
                {row.map((post) => (
                  <div key={post.id} className="w-1/3 p-4">
                    <LatestBlogPost post={post} />
                  </div>
                ))}
              </div>
            ))}
           <div className='flex justify-center mt-10'>
        <button
          type="button"
          className="hidden md:flex inline-block rounded-full border border-blue-500  text-blue-500 dark:bg-yellow-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal hover:text-white dark:text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-cyan-600 dark:hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-cyan-600 dark:focus-bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus-outline-none focus-ring-0 active-bg-cyan-700 dark:active-bg-neutral-200 active-shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] "
        >
          More Blogs
        </button>
      </div>
          </div>
        );
      };
      
      export default BlogPosts;
      
