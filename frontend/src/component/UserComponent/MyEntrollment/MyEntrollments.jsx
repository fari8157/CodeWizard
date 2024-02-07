import React, { useEffect, useState } from 'react';
import EnrollmentCard from './EntrollmentCard';
import useAxiosPrivate from '../../../hook/useAxiosPrivate';
import { useSelector } from 'react-redux';

function MyEntrollments() {
  const {userAxiosInstance}=useAxiosPrivate()
  const {Token,role,userId}=useSelector((state)=>state.Client)
  const [courses,setCourses]=useState([])
  // Sample data for enrollment cards
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAxiosInstance.get(`/myEntrollments/${userId}`);
        setCourses(response.data.courses)
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors here
      }
    };
  
    fetchData(); // Call the async function to fetch data
  
  }, [userId]); // Include userId in the dependency array if needed
  

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row gap-2">
      {courses.map((enrollment) => (
        <EnrollmentCard
          key={enrollment.id}
          course={enrollment}
        
        />
      ))}
    </div>
  );
}

export default MyEntrollments;
