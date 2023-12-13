import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userAxiosInstance from '../../../Axiox/UserAxiox';
import { FaRupeeSign } from 'react-icons/fa'
import { FaPlayCircle } from 'react-icons/fa';
import {loadStripe} from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

function CourseSinglePage() {
    const [courseDetails, setCourseDetails] = useState({});
    const [showVideo, setShowVideo] = useState(false);
    const {Token,role}=useSelector((state)=>state.Client)
    const toggleVideo = () => {
        setShowVideo(!showVideo);
      };
    const divStyle = {
        borderBottomRightRadius: '100px',
      };
      const { id } = useParams();
      console.log( id );
      useEffect(() => {
        const fetchCourseDetails = async () => {
          try {
            const response = await userAxiosInstance.get(`/courses/${id}`);
            setCourseDetails(response.data.courseDetails); 
          } catch (error) {
            console.error('Error fetching course details:', error);
          }
        };
    
        fetchCourseDetails();
      }, [id]);
      const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51OMTNFSB5PePlulF0QTJTBGDpFmTakRHm3SV2p15rg8YhiDGwknGVUNC5iq8NFR5CpVWBpZGPgd7NcTIPg0gSVKy00Tlyx33nF");
        const course_id = id; // Assuming id is previously defined
      
        try {
          const response = await userAxiosInstance.post('/create-payment-session', { course_id }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': Token,
              'userRole': role,
            }
          });
      
          const session = response.data; // Assuming the session ID is returned in response data
          const result = await stripe.redirectToCheckout({
            sessionId: session.id
          });
      
          if (result.error) {
            console.error(result.error);
          }
        } catch (error) {
          console.error('Error during payment:', error);
        }
      };
      
    console.log(courseDetails);
  return (
    <div>
      <div className="bg-cyan-800 h-96 flex items-center justify-center rounded-br-3xl" style={divStyle}>
        <div className="relative overflow-hidden p-12 max-w-4xl w-full rounded-br-3xl">
          <div className="flex flex-col lg:flex-row items-center justify-between relative">
            <div className="">
              <h2 className="text-white text-3xl font-bold mb-4">Course Name:  {courseDetails&&courseDetails.courseName}</h2>
              <p className="text-white mb-2 ">Price:{'\u20B9'} {courseDetails&&courseDetails.price}</p>
              <p className="text-white mb-2">Discount Price: {'\u20B9'} {courseDetails&&courseDetails.DiscountPrice}</p>
              <p className="text-white mb-2">Total Videos: {courseDetails&&courseDetails.totalVideos}</p>
            </div>
          </div>
        </div>
        <div onClick={toggleVideo}>
        <div style={{backgroundImage: `url(${courseDetails && courseDetails.coverPhoto && courseDetails.coverPhoto.url})`}} className=' flex justify-center items-center h-72 w-72 object-cover absolute bottom-8 right-12 lg:h-96 lg:w-96 lg:rounded-br-3xl bg-center bg-cover'>
            <FaPlayCircle className="text-black text-6xl cursor-pointer  absolute"  />
        </div>
        {/* <img
          src={courseDetails && courseDetails.coverPhoto && courseDetails.coverPhoto.url}
          alt="Course Image"
          className="h-72 w-72 object-cover absolute bottom-8 right-12 lg:h-96 lg:w-96 lg:rounded-br-3xl"
        /> */}
        {showVideo && (
          <video
            controls
            autoPlay
            className="h-72 w-72 object-cover absolute bottom-8 right-12 lg:h-96 lg:w-96 lg:rounded-br-3xl"
          >
            <source src={courseDetails && courseDetails.demoVideo&& courseDetails.demoVideo.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      </div>
      <br />
      <br />
      <div className="mt-8 text-black p-8 ">
        <h3 className="text-xl font-bold mb-4">Objectives</h3>
        <p className="text-black">
        {courseDetails&&courseDetails.description}
        </p>
      </div>
      <div className="mt-8 text-black p-8">
        <h3 className="text-xl font-bold mb-4">Course Outline</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
  {courseDetails &&courseDetails.allHeadlines&&
    courseDetails.allHeadlines.map((headline, index) => (
      <div key={index} className="bg-white p-4 rounded-md shadow-md">
        <h4 className="text-lg font-semibold mb-2">{headline}</h4>
      </div>
    ))}
</div>

    
          
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="hidden md:flex inline-block rounded-full bg-cyan-700 dark:bg-yellow-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white dark:text-neutral-800 dark:hover:text-white shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-cyan-600 dark:hover:bg-cyan-700  hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-cyan-600 dark:focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-700 dark:active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
        >
          <span className="flex items-center gap-1" onClick={makePayment} >BUY NOW</span>
        </button>
      </div>
    </div>
  );
}

export default CourseSinglePage;
