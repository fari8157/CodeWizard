import React from 'react';
import { FaStar, FaRegStar, FaDollarSign } from 'react-icons/fa';
import { Fade } from 'react-reveal';
import { useNavigate } from 'react-router-dom';


const CourseCard = ({ course }) => {
   const navigate=useNavigate()
  const handleContinue = () => {
    const courseId = course && course._id; // Assuming course._id contains the courseId
    if (courseId) {
      navigate(`/teacher/chapters/${courseId}`,{state:{course}});
    }
  }
  const { 
    courseName, 
    description, coverPhoto, reviews, 
    DiscountPrice, 
    price } = course;
    const ratings = reviews.map(review => review.rating);
  
    // Calculate average rating
    const averageRating = ratings.length > 0
      ? ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length
      : 0;


  return (
    <Fade bottom>
    <div className="course-card rounded-lg border p-4 hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-4 cursor-pointer mt-9  " >
      <img src={coverPhoto.url} alt={ courseName} className="w-full h-48 object-fill transform transition-transform duration-1000 ease-in-out hover:scale-105" onClick={handleContinue}/>
      <h3 className="text-white text-lg font-semibold mt-2">{courseName}</h3>
      <p className="text-white mt-1 h-36 ">{description}</p>
      <hr className='mt-9' />
      <div className="flex justify-between mt-2">
        <span className=" text-blue-600 flex">
        <p className="text-blue-600 ">{'\u20B9'}{ DiscountPrice}</p>
        </span>
        <p className="text-white  line-through">{'\u20B9'}{ price}</p>
      </div>
      <div className="text-center mt-4 ">
      <div className="text-white flex justify-center">
      {Array(5)
              .fill()
              .map((_, index) => (
                <div key={index}>
                  {index < averageRating ? <FaStar /> : <FaRegStar />}
                </div>
              ))}
          </div>
          <p className="text-gray-600 mt-1">({ratings.length} reviews)</p>
      </div>
    </div>
    </Fade>
  );
};

export default CourseCard;



