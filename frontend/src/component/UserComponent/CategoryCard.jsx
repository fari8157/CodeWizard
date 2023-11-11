import React from 'react';


const CategoryCard = ({ category, image }) => {
  return (
    <div className="category-card m-4 rounded-full transform transition-transform duration-1000 ease-in-out hover:scale-105 hover:bg-black cursor-pointer">
      <div className="image-container h-70 ">
        <img src={image} alt={category} className="w-52 h-48 object-cover " />
      </div>
      <div className="category-name text-center py-2 bg-gray-800 text-white font-bold rounded-b-md">
        {category}
      </div>
    </div>
  );
};

export default CategoryCard; 
