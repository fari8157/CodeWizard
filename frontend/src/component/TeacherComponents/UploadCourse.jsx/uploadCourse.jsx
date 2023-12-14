import React, { useState } from 'react';
import teacherAxiosInstance from '../../../Axiox/TeacherAxiox';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Spinner from '../../Spinner/Spinner';
import Swal from 'sweetalert2';
import CourseCard from './UploadCard/CourseCard';
import fullstackImage from '/banner.png';
import DetailCard from './UploadCard/UploadCourseGrid';
import { useSelector } from 'react-redux';


const UploadClass = () => {
  const [showModal, setShowModal] = useState(false);
  const [update,setUpdate]=useState(false)
  const {email}=useSelector((state)=>state.Client) 
  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
    teacherEmail:email,
    category: '',
    price: '',
    discountPrice: '',
    courseOutline: '',
    coverPhoto: null,
    demoVideo: null,
  });
  

  const handleAddCourse = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Check for null or spaces in the value
   
  
    if ((name === 'price' || name === 'discountPrice') && formData['price'] && formData['discountPrice']) {
      const price = parseFloat(formData['price']);
      const discountPrice = parseFloat(formData['discountPrice']);
  
      if (price <= discountPrice) {
        toast.error('The price must be greater than the discount price.');
        return;
      }
    }
  
    if (name === 'price' || name === 'discountPrice') {
      const isValidNumber = value === '' || /^[+]?(\d+(\.\d*)?|\.\d+)$/.test(value) && parseFloat(value) > 0;
  
      if (!isValidNumber) {
        toast.error(`Please enter a valid price (greater than zero) in the ${name} field.`);
        return;
      }
     
    }
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const handleFiles = (e) => {
    const file = e.target.files[0];
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime']; 
  
    if (e.target.name === 'coverPhoto') {
      if (!allowedImageTypes.includes(file.type)) {
        alert('Please upload an image file (JPEG, PNG, GIF).');
        e.target.value = '';
        return;
      }
      setFormData({
        ...formData,
        coverPhoto: file,
      });
    } else if (e.target.name === 'demoVideo') {
      if (!allowedVideoTypes.includes(file.type)) {
        alert('Please upload a valid video file (MP4, MPEG, QuickTime, etc.).');
        e.target.value = '';
        return;
      }
      setFormData({
        ...formData,
        demoVideo: file,
      });
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    for (const key in formData) {
      if (formData[key] === null || formData[key] === '') {
        toast.error(`Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return;
      }
    }
    Swal.fire({
      title: 'Saving Course Details',
      text: 'Please wait...',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      showCancelButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  
    try {
      console.log('Form Data:', formData);
      const formDataToSend = new FormData();
      formDataToSend.append('courseName', formData.courseName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('teacherEmail',formData.teacherEmail)
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('discountPrice', formData.discountPrice);
      formDataToSend.append('courseOutline', formData.courseOutline);
      formDataToSend.append('coverPhoto', formData.coverPhoto);
      formDataToSend.append('demoVideo', formData.demoVideo);
      console.log('Form Data mm:',formDataToSend);
      const response = await teacherAxiosInstance.post('uploadCourse/videos', formDataToSend, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      });
      console.log(response);
  
      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        setUpdate(true)
      }
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Error occurred while uploading course details.');
    } finally {
      Swal.close();
      setShowModal(false);
    }
  };
  return (
    <div className='bg-dashboard-bg h-full'>
     <hr />
    <div className="flex justify-between gap-2 pt-7 "> 
      <ToastContainer/>
      <div className="hidden md:flex"></div>
      {/* <div className="bg-white rounded-full md:w-1/4 w-1/2 md:ml-0 ml-6 flex items-center md:px-4 md:py-2 p-2 shadow-md border border-black  ">
        <input
          type="text"
          name="search"
          placeholder="Search courses..."
          className="w-full focus:outline-none"
          onChange={handleInputChange}
        />
        <button className="ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17l-6-6" />
          </svg>
        </button>
      </div> */}
      <div className="mr-5 whitespace-pre-wrap ">
        <span
         
          className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group"
          onClick={handleAddCourse}
        >
          <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">
            Add Course 
          </span>
        </span>
      </div>
      


      {/* Modal */}
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={closeModal} aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <form  encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Course Details</h3>

                  {/* Course Name input */}
                  <div className="mt-4">
                    <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                      Course Name
                    </label>
                    <input
                      type="text"
                      id="courseName"
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleInputChange}
                      className="mt-1 ring-indigo-500  border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-300 rounded-md p-1 "
                    />
                  </div>

                  {/* Description textarea */}
                  <div className="mt-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="mt-1  ring-indigo-500 border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-300 rounded-md"
                    ></textarea>
                  </div>

                  {/* Category dropdown */}
                  <div className="mt-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      
                      onChange={handleInputChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base  border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select category</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Full Stack">Full Stack</option>
                      <option value="Projects">Projects</option>
                      <option value="Frontend">Programming Languages</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  {/* Price and Discount Price */}
                  <div className="mt-4 flex">
                    <div className="flex-1 mr-4">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-300 rounded-md p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700">
                        Discount Price
                      </label>
                      <input
                        type="text"
                        id="discountPrice"
                        name="discountPrice"
                        value={formData.discountPrice}
                        onChange={handleInputChange}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-1"
                      />
                    </div>
                  </div>

                  {/* Course Outline */}
                  <div className="mt-4">
                    <label htmlFor="courseOutline" className="block text-sm font-medium text-gray-700">
                      Course Outline
                    </label>
                    <textarea
                      id="courseOutline"
                      name="courseOutline"
                      rows="3"
                      value={formData.courseOutline}
                      onChange={handleInputChange}
                      className="mt-1 focus:ring-indigo-500 border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div className="mt-4">
                  <label htmlFor="coverPhoto" className="block text-sm font-medium text-gray-700">
                    Cover Photo
                  </label>
                  <input
                    type="file"
                    id="coverPhoto"
                    name="coverPhoto"
                    
                    onChange={handleFiles}
                    className="mt-1  ring-indigo-500  border-indigo-500 block w-full shadow-sm sm:text-sm border border-black rounded-md p-1"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="demoVideo" className="block text-sm font-medium text-gray-700">
                    Demo Video
                  </label>
                  <input
                    type="file"
                    id="demoVideo"
                    name="demoVideo"
                    
                    onChange={handleFiles}
                    className="mt-1 ring-indigo-500 border-indigo-500 block w-full shadow-sm sm:text-sm  border border-black rounded-md p-1"
                  />
                </div>

                  {/* Cover Photo and Demo Video */}
                  {/* Add other form fields as needed */}

                  {/* Modal actions */}
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
      <div >
      <DetailCard update={update} setUpdate={setUpdate} />

    </div>
    </div>
  );
};

export default UploadClass;
