import React from 'react';
import CourseCard from './CourseCard';
import fullstackImage from '/banner.png';
// import './Course.css'
//  // Create a CourseCard component

const popularCourses = [
  {
    id: 1,
    name: 'Web Development',
    description: 'Learn web development from scratch and become a full-stack developer. ',
    image: fullstackImage,
    reviews: 4.8,
    discountPrice: 49.99,
    actualPrice: 79.99,
  },
  {
    id: 1,
    name: 'Web Development',
    description: 'Learn web development from scratch and become a full-stack developer. ',
    image: fullstackImage,
    reviews: 4.8,
    discountPrice: 49.99,
    actualPrice: 79.99,
  },
  {
    id: 1,
    name: 'Web Development',
    description: 'Learn web development from scratch and become a full-stack developer. ',
    image: fullstackImage,
    reviews: 4.8,
    discountPrice: 49.99,
    actualPrice: 79.99,
  },
  {
    id: 1,
    name: 'Web Development',
    description: 'Learn web development from scratch and become a full-stack developer. ',
    image: fullstackImage,
    reviews: 4.8,
    discountPrice: 49.99,
    actualPrice: 79.99,
  }, {
    id: 1,
    name: 'Web Development',
    description: 'Learn web development from scratch and become a full-stack developer. ',
    image: fullstackImage,
    reviews: 4.8,
    discountPrice: 49.99,
    actualPrice: 79.99,
  }, {
    id: 1,
    name: 'Web Development',
    description: 'Learn web development from scratch and become a full-stack developer. ',
    image: fullstackImage,
    reviews: 4.8,
    discountPrice: 49.99,
    actualPrice: 79.99,
  }, {
    id: 1,
    name: 'Web Development',
    description: 'Learn web development from scratch and become a full-stack developer. ',
    image: fullstackImage,
    reviews: 4.8,
    discountPrice: 49.99,
    actualPrice: 79.99,
  }, {
    id: 1,
    name: 'Web Development',
    description: 'Learn web development from scratch and become a full-stack developer. ',
    image: fullstackImage,
    reviews: 4.8,
    discountPrice: 49.99,
    actualPrice: 79.99,
  },
  // Add more course objects as needed with descriptions
];

const PopularCourses = () => {
    return (
      <div className="text-center mt-16 md:px-7 px-4">
        <h2 className="text-3xl mb-4 font-bold uppercase  text-blue-950">Popular Courses</h2>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-auto">
          {popularCourses.map((course) => (
            <div key={course.id}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="hidden md:flex inline-block rounded-full border border-blue-500 text-blue-500 dark:bg-yellow-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal hover:text-white dark:text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-cyan-600 dark:hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-cyan-600 dark:focus-bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus-outline-none focus-ring-0 active-bg-cyan-700 dark:active-bg-neutral-200 active-shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)]"
          >
            More Courses
          </button>
        </div>
      </div>
    );
  };
  
  export default PopularCourses;