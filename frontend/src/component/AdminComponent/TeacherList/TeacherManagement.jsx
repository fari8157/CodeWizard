import React, { useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import TeacherCard from './TeacherCadr'
import adminAxiosInstance from '../../../Axiox/AdminAxiox'
import { useState } from 'react'
import { useSelector } from 'react-redux'


const TeacherManagement = () => {
    const{Token,role}=useSelector((state)=>state.Client)

    const [teachers,setTeachers]=useState([])
const [FilteredTeachers,setFilteredTeachers]=useState([])
useEffect(()=>{
    adminAxiosInstance.get("/teachers" ,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':Token,
        'userRole':role,
      }
    }).then((response)=>{
      console.log(response.data);
      setTeachers(response.data.teachers)
      setFilteredTeachers(response.data.teachers);
    })
   },[setTeachers,setFilteredTeachers])
  
  return (
    <div className='w-screen h-screen overflow-x-hidden'>
       
        <div className='w-full h-full bg-dashboard-bg'>
            <div className='w-full px-6 h-24 bg-dashboard-bg flex justify-center items-center'>
                <div className='w-full h-2/3 bg-teacher-card-bg flex items-center justify-end px-4'>
                    <div className='flex '>
                        <div className='w-14 h-10 rounded-l-md bg-black flex justify-center items-center'>
                            <FaSearch className='text-blue-500' />
                        </div>
                        <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 rounded-r-md w-full md:w-64 text-white text-verySmall-1 bg-dashboard-bg outline-none"
                        />
                    </div>
                </div>
            </div>
            <div className='w-full h-auto bg-dashboard-bg flex items-center justify-center flex-wrap gap-4 py-2 px-2'>
            {teachers.map((teacher, index) => (
                      <TeacherCard key={index} teacher={teacher} />
                    ))}
           
                

            </div>
            <div className='w-full h-24 bg-dashboard-bg flex items-center justify-center'>
               
            </div>
        </div>
    </div>
  )
}

export default TeacherManagement