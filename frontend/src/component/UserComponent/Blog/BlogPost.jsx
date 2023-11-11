// LatestBlogPost.js
import React from 'react';

const BlogPost = ({ post }) => {
  const { image, date, title, description } = post;

  return (
    <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
      <img src={image} alt={title} className="w-full h-48 object-cover mb-4" />
      <p className="text-gray-600">{date}</p>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default BlogPost;

