import React from 'react';
import CategoryCard from './CategoryCard';
import frontendImage from '/frontend.avif'; // Import images for categories
import backendImage from '/backend.jpg';
import othersImage from '/othres.jpg';
import fullstackImage from '/full-stack courses.webp';
import languageImage from'/lang.webp'

const categories = [
  { name: 'Programming languages', image: languageImage},
  { name: 'frontend', image: frontendImage },
  { name: 'Backend', image: backendImage },
  { name: 'Full Stack', image: fullstackImage },
  { name: 'Others', image: othersImage }, 
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
