import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import CourseCard from './CourseCard';
import fullstackImage from '/banner.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import userAxiosInstance from '../../../Axiox/UserAxiox';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
// import './Course.css'
//  // Create a CourseCard component


function CourseDetails() {
    const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [courses,setCourses]=useState([])
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get('success');

    if (success === 'true') {
      setShowAlert(true);
    } else if (success === 'false') {
      setShowAlert(true);
    }
  }, [location.search]);

  const handlePaymentSuccess = () => {
    Swal.fire({
      icon: 'success',
      title: 'Payment Successful!',
      text: 'Your payment was successful!',
    }).then(() => {
      // Redirect to another page or perform any other action after user interaction
    });
  };

  const handlePaymentCancellation = () => {
    Swal.fire({
      icon: 'error',
      title: 'Payment Cancelled!',
      text: 'Your payment was cancelled.',
    }).then(() => {
      // Redirect to another page or perform any other action after user interaction
    });
  };

  useEffect(() => {
    if (showAlert) {
      if (location.search.includes('success=true')) {
        handlePaymentSuccess();
        navigate('/courses')
      } else if (location.search.includes('success=false')) {
        handlePaymentCancellation();
        navigate('/courses')
      }
    }
  }, [showAlert, location.search]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAxiosInstance.get('/courses');
       
        setCourses(response.data.courses)
       
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Handle error (e.g., show an error message)
      }
    };
  
    fetchData(); // Call the async function to fetch data
  }, [setCourses]);
  

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const filteredByCategory = selectedCategory
    ? courses.filter((course) => course.category === selectedCategory)
    : courses;
    console.log( filteredByCategory);
    const filteredCourses = filteredByCategory.filter((course) =>
    course.courseName && course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (

    
    <div>
<div className='w-full px-6 h-24 flex justify-center items-center  '>
    <div className='w-full h-2/3 bg-teacher-card-bg flex items-center justify-center px-4 '>
        <div className='flex items-center gap-6'>
            {/* Category Dropdown */}
            <select 
                className="p-2 rounded-l-md w-24 md:w-32 text-white text-verySmall-1 bg-dashboard-bg outline-none mr-1"
                /* Add your options and logic for the category dropdown here */
                value={selectedCategory}
                onChange={handleCategoryChange}
           >    <option value="">All Categories</option>
                   {Array.from(new Set(courses.map((course) => course.category))).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
            </select>

            {/* Search Bar */}
            <div className='flex justify-center items-center h-10'>
        <div className='flex justify-center items-center'>
          <div className='w-14 h-10 rounded-l-md bg-black flex justify-center items-center'>
            <span className='text-blue-500'><FaSearch /></span>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 rounded-r-md w-full md:w-64 text-white text-verySmall-1 bg-dashboard-bg outline-none"
          />
        </div>
      </div>

        </div>

    </div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-auto   ">
        {currentCourses.map((course) => (
          <div key={course._id}>
            <Link to={`/courses/${course._id}`}>
              <CourseCard course={course} />
            </Link>
           
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
  {/* Previous Page Button */}
  <button
    onClick={() => paginate(currentPage - 1)}
    disabled={currentPage === 1}
    className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-800"
  >
    <FaChevronLeft />
  </button>

  {/* Page Number Buttons */}
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

  {/* Next Page Button */}
  <button
    onClick={() => paginate(currentPage + 1)}
    disabled={currentPage === Math.ceil(filteredCourses.length / itemsPerPage)}
    className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-800"
  >
    <FaChevronRight />
  </button>
</div>
    </div>
  )
}

export default CourseDetails