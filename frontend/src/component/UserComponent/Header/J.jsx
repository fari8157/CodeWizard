import React from 'react';
import './J.css';

const Departments = () => {
  // Example data for departments
  const departments = [
    { name: 'Anxiety', image: 'banner.png' },
    { name: 'Self Confidence', image: 'teacher1.png' },
    { name: 'Motivation', image: 'motivation-image-url' },
    {name: 'Anxiety', image: 'banner.png' },
    { name: 'Self Confidence', image: 'teacher1.png' },
    { name: 'Motivation', image: 'motivation-image-url' },
    // Add more departments as needed
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-900 ">
      <div className="container mx-auto py-8 relative">
        <div className="bg-holder bg-size "></div>
        {/* <div className="bg-cover bg-center bg-departments  flex justify-center py-2" ></div> */}
        <h2 className="text-3xl mb-4 font-bold uppercase text-blue-950">OUR DEPARTMENTS</h2>
        <div className="flex flex-row space-x-4 overflow-x-auto">
          {departments.map((department, index) => (
            <div key={index} className="max-w-sm bg-white p-4 rounded-lg shadow">
              <img src={department.image} alt={department.name} className="w-24 h-24 mx-auto mb-4" />
              <p className="text-center">{department.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Departments;
