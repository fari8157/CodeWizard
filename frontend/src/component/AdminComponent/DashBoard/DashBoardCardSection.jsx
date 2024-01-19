import { FaRedhat, FaUser } from "react-icons/fa"
import { GoTrophy } from "react-icons/go"
import { TbBooks } from "react-icons/tb"

import DashboardCard from "./DashBoardCard"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { BiBlanket } from "react-icons/bi";
import { BiLayer } from "react-icons/bi";
import { BiBarChartAlt } from "react-icons/bi";
import useAxiosPrivate from "../../../hook/useAxiosPrivate"

const DashboardCardSection = () => {
  const[totalStudent,setStudent]=useState('')
  const[totalCourse,setTotalCourse]=useState('')
  const[totalTeachers,setTeachers]=useState('')
  const[totalRevenue,setRevenueCourse]=useState('')
  
  const {adminAxiosInstance } = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminAxiosInstance.get('/dashCard');
        setStudent(response.data.totalStudents)
        setTotalCourse(response.data.totalCourses)
        setTeachers(response.data.totalTeacher)
        setRevenueCourse(response.data.totalRevenue)
        
      } catch (error) {
        console.error('Error fetching payments:', error);
      } 
    };

    fetchData();
  }, []);
 

    return (
      <div className='h-2/5 md:h-1/4 w-full flex flex-col md:flex-row justify-between gap-2 md:gap-0'>
        <DashboardCard text="Total students" value={totalStudent?totalStudent:0} Icon={<FaUser color='white' className='text-xl md:text-veryLarge' /> } />
        <DashboardCard text="Total course" value={totalCourse?totalCourse:0} Icon={<BiBlanket color='white' className='text-xl md:text-veryLarge' /> }/>
        <DashboardCard text="Total teachers" value={totalTeachers?totalTeachers:0} Icon={<BiLayer color='white' className='text-xl md:text-veryLarge' /> }/>
        <DashboardCard text="Total revenue" value={totalRevenue?totalRevenue:0} Icon={<BiBarChartAlt color='white' className='text-xl md:text-veryLarge' /> }/>
      </div>
    )
  }
  
  export default DashboardCardSection