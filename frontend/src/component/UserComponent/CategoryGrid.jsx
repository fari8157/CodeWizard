import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

import {userAxios} from'../../Axiox/UserAxiox'



const CategoryGrid = () => {
  const [categories,setCategories]=useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAxios.get('getCategories');
        setCategories(response.data.categories)
       
      } catch (error) {
        // Handle errors
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchData(); // Call the asynchronous function
  }, [])
  return (
    <div className="text-center">
      <h2 className="text-3xl mb-4 font-bold uppercase text-blue-950">Top Categories</h2>
      <div className="flex flex-wrap justify-center">
        {categories&&categories.map((category, index) => (
        
          <CategoryCard key={index} category={category.name} image={category.images} />
        ))}

      </div>
    </div>
  );
  
};

export default CategoryGrid;
