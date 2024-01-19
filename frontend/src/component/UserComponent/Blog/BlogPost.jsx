import React from 'react';
import { useNavigate } from 'react-router-dom';

const formatDate = (rawDate) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(rawDate).toLocaleDateString(undefined, options);
};

const BlogPost = ({ post }) => {
  const navigate=useNavigate()
  const { id, image, date, title, description } = post;
  const formattedDate = formatDate(date);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer" onClick={() => navigate('/blogDetails', { state:id})} >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover mb-4"  />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <p className="absolute top-2 left-4 text-white text-sm font-semibold">{formattedDate}</p>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default BlogPost;
