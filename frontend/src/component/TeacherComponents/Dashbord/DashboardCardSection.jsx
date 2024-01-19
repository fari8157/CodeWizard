import { FaRedhat, FaUser } from "react-icons/fa"
import { GoTrophy } from "react-icons/go"
import { TbBooks } from "react-icons/tb"
import useAxiosPrivate from '../../../hook/useAxiosPrivate';
import DashboardCard from "./DashboardCard "
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { BiBlanket } from "react-icons/bi";
import { BiLayer } from "react-icons/bi";
import { BiBarChartAlt } from "react-icons/bi";
const DashboardCardSection = () => {
  const[totalStudent,setStudent]=useState('')
  const[totalCourse,setTotalCourse]=useState('')
  const[completeCourse,setCompleteCourse]=useState('')
  const[totalRevenue,setRevenueCourse]=useState('')
  
  const { teacherAxiosInstance } = useAxiosPrivate();
  const { userId } = useSelector((state) => state.Client);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await teacherAxiosInstance.get(`/dashCard/${userId}`);
        setStudent(response.data.data.studentCount)
        setTotalCourse(response.data.data.totalCourse)
        setCompleteCourse(response.data.data.uploadedCourses)
        setRevenueCourse(response.data.data.totalRevenue)
        console.log(response.data.data.studentCount
          );
      } catch (error) {
        console.error('Error fetching payments:', error);
      } 
    };

    fetchData();
  }, [userId, teacherAxiosInstance]);

    return (
      <div className='h-2/5 md:h-1/4 w-full flex flex-col md:flex-row justify-between gap-2 md:gap-0'>
        <DashboardCard text="Total students" value={totalStudent?totalStudent:0} Icon={<FaUser color='white' className='text-xl md:text-veryLarge' /> } />
        <DashboardCard text="Total course" value={totalCourse?totalCourse:0} Icon={<BiBlanket color='white' className='text-xl md:text-veryLarge' /> }/>
        <DashboardCard text="Completd courses" value={completeCourse?completeCourse:0} Icon={<BiLayer color='white' className='text-xl md:text-veryLarge' /> }/>
        <DashboardCard text="Total revenue" value={totalRevenue?totalRevenue:0} Icon={<BiBarChartAlt color='white' className='text-xl md:text-veryLarge' /> }/>
      </div>
    )
  }
  
  export default DashboardCardSection