import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import teacherAxiosInstance from '../../../../Axiox/TeacherAxiox';
import CourseVideos from '../VideoDetails';
import CourseModal from './CourseDetailModal';
import { useSelector } from 'react-redux';
import UploadDetail from '../UploadDetails';
import { useNavigate } from 'react-router-dom';

const DetailCard = ({ update, setUpdate }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseVideos, setSelectedCourseVideos] = useState(null);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const {Token,role}=useSelector((state)=>state.Client)
  const navigate=useNavigate()
  const fetchData = async () => {
    try {
      
      const response = await teacherAxiosInstance.get('uploadCourse/details',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Token,
          'userRole': role,
        }
      });
      console.log('Response data:', response.data);
      setCourses(response.data.uploadCourses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    if (update) {
      fetchData();
      setUpdate(false);
    }
  }, [update]);

  const handleDelete = (id) => {
    // Logic to delete the course with the given id
    // You may update the 'courses' state after deletion
  };

  const handleClose = () => {
    setSelectedCourseVideos(null);
  };

  const handleShowVideos = (id) => {
    const selectedCourse = courses.find((course) => course._id === id);
    if (selectedCourse) {
      setSelectedCourseVideos(selectedCourse);
    

    }
  };

  useEffect(() => {
    console.log('Selected Course Details:', selectedCourseDetails);
  }, [selectedCourseDetails]);

  const handleShowDetails = (id) => {
    const selectedCourse = courses.find((course) => course._id === id);
    if (selectedCourse) {
      setSelectedCourseDetails(selectedCourse);
    }
  };

  const handleDetailsClose = () => {
    setSelectedCourseDetails(null);
  };
  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-wrap ml-10 gap-4">
      
      <div>
      {/* Search input */}
      {/* <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}

      {/* Display filtered/paginated courses */}
      {currentCourses.map((course) => (
        <CourseCard
          key={course.id}
          courseData={course}
          onDelete={() => handleDelete(course._id)}
          onShowVideos={() => navigate('/teacher/uploadDetails', { state: { course:course } })}
          onShowDetails={() => navigate('/teacher/uploadDetails', { state: { course:course } })}
        />
      ))}

      {/* Pagination buttons */}
      {/* <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredCourses.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div> */}
    </div>
       
    </div>
  );
};

export default DetailCard;
