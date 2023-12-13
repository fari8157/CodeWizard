

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const CourseCard = ({ courseData, onDelete, onShowVideos,onShowDetails  }) => {
  const { courseName, description, coverPhoto } = courseData;
 
  return (

    
    <div
      
      className="video-card w-72 bg-gray-200 mx-2 rounded-md my-4 overflow-hidden hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
    >
      <img
        src={coverPhoto.url}
        alt={courseName}
        className="w-full h-48 object-cover"
        onClick={onShowDetails}
      />
      <div className="p-4 bg-slate-800 text-white">
        <h3 className="text-xl font-bold mb-2">{courseName}</h3>
        <div className="justify-between flex">
        
          <button
          
            className="btn hvr-shutter-in-horizontal justify-center border-y rounded-md border-black text-black bg-yellow-500 px-4 py-2 hover:bg-yellow-600 transition duration-300 ease-in-out"
            onClick={onShowVideos}
          >
            show detail
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
       
          <button
            
            className="btn hvr-shutter-in-horizontal justify-center border-y rounded-md border-black text-black bg-red-600 px-7 py-2 hover:bg-red-800 transition duration-300 ease-in-out"
          >
            delete
          </button>
        </div>
        <div className='flex justify-center mt-2'>
       
      </div>
      </div>
      
    </div>
  );
};

export default CourseCard;
