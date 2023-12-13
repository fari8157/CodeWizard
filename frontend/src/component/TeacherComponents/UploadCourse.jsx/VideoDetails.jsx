
import React, { useState } from 'react';
import teacherAxiosInstance from '../../../Axiox/TeacherAxiox';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

const CourseVideos = ({ formData, chapters, handleDeleteVideo, handleClose }) => {
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [chapterIndex, setChapterIndex] = useState('');
  const [chapterVideo, setChapterVideo] = useState(null);
  const [chapterHeadline, setChapterHeadline] = useState('');
  const [chapterCoverImage, setChapterCoverImage] = useState(null);
  const [course_id, setCourse_id] = useState(formData._id);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  const handleAddChapter = () => {
    setShowChapterModal(true);
  };

  const handleCloseChapterModal = () => {
    setShowChapterModal(false);
    setChapterIndex('');
    setChapterVideo(null);
    setChapterHeadline('');
    setChapterCoverImage(null);
  };

  const handleIndexChange = (e) => {
    setChapterIndex(e.target.value);
  };

  const handleVideoChange = (e) => {
    setChapterVideo(e.target.files[0]);
  };

  const handleHeadlineChange = (e) => {
    setChapterHeadline(e.target.value);
  };

  const handleCoverImageChange = (e) => {
    setChapterCoverImage(e.target.files[0]);
  };

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
      formData.append('courseId', course_id);
      formData.append('chapterCoverImage', chapterCoverImage);

      const response = await teacherAxiosInstance.post('uploadChapters', formData);

      if (response.data.error) {
        Swal.close();
        toast.error(response.data.message);
      } else {
        Swal.close();
        toast.success(response.data.message);
      }

      handleCloseChapterModal();
    } catch (error) {
      console.error(error);
      Swal.close();
      toast.error('Error submitting data');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-3/4 md:max-w-md mx-auto p-4">
        <ToastContainer />
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Course Videos</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            Close
          </button>
        </div>

        <div className="mb-6">
          <video className="w-full" controls>
            <source src={formData.demoVideo.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div>
          {chapters.map((chapter) => (
            <div key={chapter.chapterIndex} className="flex items-center mb-4">
              <div className="w-1/5">
                <img
                  src={chapter.chapterCoverImage.url}
                  alt={`Chapter ${chapter.chapterIndex}`}
                  onClick={() => openModal(chapter.chapterVideo.url)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className="w-3/5">
                <h3 className="font-bold">{chapter.chapterHeadline}</h3>
              </div>
              <div className="w-1/5 text-right">
                <button onClick={() => handleDeleteVideo(chapter.chapterIndex)} className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </div>
            </div>
          ))}

        
          <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
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
  <button onClick={closeModal}>Close</button>
  {selectedVideo && (
    <video className="w-full" controls>
      <source src={selectedVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )}
</Modal>
        </div>

        <div className="flex justify-center mt-4">
          <button onClick={handleAddChapter} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Chapter
          </button>
        </div>

        {showChapterModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg w-3/4 md:max-w-md mx-auto p-4">
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
  );
};

export default CourseVideos;
