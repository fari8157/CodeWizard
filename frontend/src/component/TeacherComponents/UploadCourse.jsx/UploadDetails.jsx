import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import teacherAxiosInstance from '../../../Axiox/TeacherAxiox';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import EditModal from'./UploadCard/CourseDetailModal'
function UploadDetail() {
  const location = useLocation();
  const selectedCourseVideos = location.state.course;
  const chapters = selectedCourseVideos.chapters;

  const [showChapterModal, setShowChapterModal] = useState(false);
  const [chapterIndex, setChapterIndex] = useState('');
  const [chapterHeadline, setChapterHeadline] = useState('');
  const [chapterVideo, setChapterVideo] = useState(null);
  const [chapterCoverImage, setChapterCoverImage] = useState(null);
  const [course_id, setCourse_id] = useState(selectedCourseVideos._id); 
  const {Token,role}=useSelector((state)=>state.Client)
  const [coureseDetails,setCourseDetails]=useState(selectedCourseVideos)
  const [chapterDetails,setChapterDetails]=useState(chapters)
  const [selectedVideo, setSelectedVideo] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [edit,setEdit]=useState(false)
  console.log(chapterDetails);
  const navigate=useNavigate()
  useEffect(()=>{
    setCourseDetails(selectedCourseVideos),
    setChapterDetails(chapters)
  },[setCourseDetails,setChapterDetails])
  
  
  const handleAddChapter = () => {
    setShowChapterModal(true);
  };

  const handleCloseChapterModal = () => {
    setShowChapterModal(false);
  };

  const handleIndexChange = (e) => {
    setChapterIndex(e.target.value);
  };

  const handleHeadlineChange = (e) => {
    setChapterHeadline(e.target.value);
  };

  const handleVideoChange = (e) => {
    setChapterVideo(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setChapterCoverImage(e.target.files[0]);
  };
  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };
const modalOpen=()=>{
setEdit(true)
}
const modalClose=()=>{
  setEdit(false)
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: 'Saving Chapter Details',
        text: 'Please wait...',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        showCancelButton: false,
        willOpen: () => {
          Swal.showLoading();
        }
      });

      const formData = new FormData();
      formData.append('chapterIndex', chapterIndex);
      formData.append('chapterVideo', chapterVideo);
      formData.append('chapterHeadline', chapterHeadline);
      formData.append('courseId', course_id); // Change the key according to your backend API
      formData.append('chapterCoverImage', chapterCoverImage);

      const response = await teacherAxiosInstance.post('uploadChapters', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Adjust the content type as per your requirement
          'Authorization': Token,
          'userRole': role,
        }
      });
      console.log(response.data);
      if (response.data.error) {
        Swal.close();
      
        toast.error(response.data.message);
      } else {
        Swal.close();
        setCourseDetails(response.data.courseDetails)
        setChapterDetails(response.data.courseDetails.chapters)
        toast.success(response.data.message);
      }

      handleCloseChapterModal();
    } catch (error) {
      console.error(error);
      Swal.close();
      // Assuming 'toast' function is defined for displaying notifications
      toast.error('Error submitting data');
    }
  };

  const conformCourse= async()=>{
    console.log(course_id);
    const response = await teacherAxiosInstance.post('confirmCourse', { course_id: course_id });
    console.log(response);
    if(response.data.error){
      toast.error(response.data.message)
    
    }else{
      navigate('/teacher/uploadCourse')
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Course uploaded',
      });
      
    }
  }

  return (
    <>
      <ToastContainer/>
      <div className="flex">
        {/* Left side (3/4 ratio) */}
        <div className="w-2/4 p-4">
          {/* Video tag */}
          <div className="bg-gray-200 p-4">
            <video controls className="w-full">
              <source src={coureseDetails.demoVideo.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
  
            {/* Course details */}
            <h2 className="text-xl font-bold my-2">Course Name: {coureseDetails.courseName}</h2>
  
            <h3 className="text-lg font-semibold my-2">Description</h3>
            <div className="overflow-y-auto max-h-40">
              <p className='text-gray-600 whitespace-pre-line break-words'>{coureseDetails.description}</p>
            </div>
  
            <h3 className="text-lg font-semibold my-2 whitespace-pre-line break-words">Course Outline</h3>
            <p className='text-gray-600 whitespace-pre-line break-words'>{coureseDetails.courseOutLine}</p>
          </div>
  
          {/* Buttons */}
          <div className="bg-gray-200 p-4 mt-5 flex justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 "onClick={modalOpen}>
                  Edit Details
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={conformCourse} >
                 Upload Details
                </button>
                
          </div>
        </div>
        {edit&&<EditModal formData={coureseDetails} onClose={modalClose} setCourseDetails={setCourseDetails}/>}
       
            {/* Right side (1/4 ratio) */}
        <div className="w-2/4 p-4">
          {/* Small card */}
          <div className="bg-gray-200 p-4 mb-4 felx items-center h-2/4 w-full">
            {/* Image with category name */}
            <img src={coureseDetails.coverPhoto.url} alt="Category Image" className="h-2/3 w-full object-fill mb-2" />
            <h3 className="text-lg font-semibold mb-2">Category Name: {coureseDetails.category}</h3>
  
            {/* Buttons for price and discount */}
            <div className='flex justify-between items-center h-1/3'>
              <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Price :{coureseDetails.price}
                </button>
              </div>
              <div>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Discount Price :{coureseDetails.DiscountPrice}
                </button>
              </div>
            </div>
          </div>
  
          {/* Card headline with chapters */}
          <div className="bg-gray-200 p-4">
            <div className='flex justify-between'>
              <h2 className="text-xl font-bold mb-2">Chapters</h2>
              {/* Displaying total videos */}
              <h2>Total videos: {chapters.length}</h2>
            </div>
  
            {/* Mapping chapters */}
            <div className="h-80 overflow-y-auto">
  {chapterDetails.map((chapter, index) => (
    <div key={index} className='flex items-center gap-4'>
      <h1>{index + 1}</h1>
      <div className="w-1/5 bg-gray-200 ">
        <img
         className='object-fill p-4 '
          src={chapter.chapterCoverImage.url}
          alt=''
          style={{ cursor: 'pointer' }}
          onClick={() => openModal(chapter.chapterVideo.url)}
        />
      </div>
      <div className='overflow-y-auto max-h-40'>
        <p className='whitespace-pre-line break-words'>{chapter.chapterHeadline}</p>
      </div>
      <span><FaEdit /></span>
      <span><MdDelete /></span>
    </div>
  ))}
  <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  style={{
    overlay: {
      zIndex: 100,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%', 
      height: '80%', 
      maxWidth: '800px', 
      maxHeight: '600px',
      overflow: 'hidden', 
    },
  }}
>
  <button onClick={() => setIsModalOpen(false)}>Close</button>
  {selectedVideo && (
    <video className="w-full" controls>
      <source src={selectedVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )}
</Modal>
</div>
            <div className='flex justify-center'>
              <button onClick={handleAddChapter} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Add Chapter
              </button>
            </div>
          </div>
  
          {/* Modal for adding chapters */}
          {showChapterModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white rounded-lg w-3/4 md:max-w-md mx-auto p-4">
                {/* Your modal content */}
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Add Chapter</h2>
                    <button onClick={handleCloseChapterModal} className="text-gray-500 hover:text-gray-700">
                      Close
                    </button>
                  </div>
                  {/* Form fields for adding a chapter */}
                  <div>
                    <label className="block font-bold mb-2">Chapter Index</label>
                    <input
                      type="text"
                      value={chapterIndex}
                      onChange={handleIndexChange}
                      className="border border-gray-300 rounded-md p-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold mt-4 mb-2">Upload Chapter Video</label>
                    <input
                      type="file"
                      onChange={handleVideoChange}
                      className="border border-gray-300 rounded-md p-2 w-full"
                      accept="video/*"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold mt-4 mb-2">Chapter Headline</label>
                    <input
                      type="text"
                      value={chapterHeadline}
                      onChange={handleHeadlineChange}
                      className="border border-gray-300 rounded-md p-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold mt-4 mb-2">Upload Chapter Cover Image</label>
                    <input
                      type="file"
                      onChange={handleCoverImageChange}
                      className="border border-gray-300 rounded-md p-2 w-full"
                      accept="image/*"
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add Chapter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
  
}

export default UploadDetail;
