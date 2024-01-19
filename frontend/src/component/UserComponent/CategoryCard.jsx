import React from 'react';
import { useNavigate } from 'react-router-dom';


const CategoryCard = ({ category, image }) => {
  const navigate=useNavigate()
  return (
    <div className="category-card m-4 rounded-full transform transition-transform duration-1000 ease-in-out hover:scale-105 hover:cursor-pointer" onClick={()=>navigate('/courses',{state:{category:category}})}>
      <div className="image-container h-70 ">
        <img src={image?.url} alt={category} className="w-52 h-48 object-contain " />
      </div>
      <div className="category-name text-center py-2 bg-gray-800 text-white font-bold rounded-b-md">
        {category}
      </div>
    </div>
  );
};

export default CategoryCard; 
