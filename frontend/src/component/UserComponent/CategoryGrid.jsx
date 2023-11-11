import React from 'react';
import CategoryCard from './CategoryCard';
import frontendImage from '/banner.png'; // Import images for categories
import backendImage from '/logo2.png';
import projectImage from '/banner.png';
import fullstackImage from '/banner.png';

const categories = [
  { name: 'Frontend', image: frontendImage },
  { name: 'Backend', image: backendImage },
  { name: 'Project', image: projectImage },
  { name: 'Full Stack', image: fullstackImage },
  { name: 'Other', image: fullstackImage }, 
 // Add more categories as needed
];

const CategoryGrid = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl mb-4 font-bold uppercase text-blue-950">Top Categories</h2>
      <div className="flex flex-wrap justify-center">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category.name} image={category.image} />
        ))}

      </div>
    </div>
  );
  
};

export default CategoryGrid;
