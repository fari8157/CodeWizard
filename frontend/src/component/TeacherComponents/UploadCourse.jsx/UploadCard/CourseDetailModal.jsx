import React, { useRef, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import teacherAxiosInstance from '../../../../Axiox/TeacherAxiox';

const CourseModal = ({ formData, onClose,setCourseDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(formData);

  const modalRef = useRef(null);
  const {
    courseName,
    description,
    category,
    price,
    DiscountPrice,
  coverPhoto,
    courseOutLine,
    demoVideo,
    _id,
  } = isEditing ? editedData : formData;

  const descriptionLines = description.split('\n');
  const outlineLines = courseOutLine.split('\n');

  const adjustModalHeight = () => {
    if (modalRef.current) {
      const contentHeight = modalRef.current.scrollHeight;
      modalRef.current.style.height = `${contentHeight}px`;
    }
  };

  useEffect(() => {
    adjustModalHeight();
  }, [description, category, price, DiscountPrice, coverPhoto, courseOutLine, demoVideo, isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onClose();
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const handleFiles = (e) => {
   
    const file = e.target.files[0];
    console.log(file);
    const fieldName = e.target.name;
  
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
  
    if (fieldName === 'coverPhoto') {
      if (!allowedImageTypes.includes(file.type)) {
        alert('Please upload an image file (JPEG, PNG, GIF).');
        e.target.value = '';
        return;
      }
      setEditedData({
        ...editedData,
        coverPhoto: file,
      });
    } else if (fieldName === 'demoVideo') {
      if (!allowedVideoTypes.includes(file.type)) {
        alert('Please upload a valid video file (MP4, MPEG, QuickTime, etc.).');
        e.target.value = '';
        return;
      }
      setEditedData({
        ...editedData,
        demoVideo: file,
      });
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (const key in editedData) {
      if (editedData[key] === null || editedData[key] === '') {
        alert(`Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return;
      }
    }

    const priceValue = parseFloat(editedData.price);
    const discountPriceValue = parseFloat(editedData.DiscountPrice);

    if (priceValue <= 0 || discountPriceValue <= 0) {
      
      toast.error('Please enter valid prices (greater than zero).');
      return;
    }

    if (discountPriceValue >= priceValue) {
      toast.error('Discount price should be less than the regular price.');
      return;
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
      const formDataToSend = new FormData();
      formDataToSend.append('courseName', editedData.courseName);
      formDataToSend.append('description', editedData.description);
    
      formDataToSend.append('category', editedData.category);
      formDataToSend.append('price', editedData.price);
      formDataToSend.append('discountPrice', editedData.DiscountPrice);
      formDataToSend.append('courseOutline', editedData.courseOutLine);
      formDataToSend.append('course_id', editedData._id);
      // Append other formData fields...

      // Append file data
      formDataToSend.append('coverPhoto', editedData.coverPhoto);
      formDataToSend.append('demoVideo', editedData.demoVideo);
     
      const response = await teacherAxiosInstance.put(`edititCourseDetails/${ editedData._id}`, formDataToSend);
  console.log(response.data);
      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        setCourseDetails(response.data.editData)
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Error occurred while uploading course details.');
    } finally {
      Swal.close();
      setIsEditing(false);
      onClose();
    }
  };

  return (
    <>
    

   
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50 overflow-y-hidden mt-3">
            <div
              ref={modalRef}
              className="bg-white p-6 rounded-lg w-full max-w-3xl overflow-y-auto"
              style={{ maxHeight: '80vh' }}
            >
              <h2 className="text-3xl font-bold mb-2">Edit Details</h2>
              <label htmlFor="courseName" className="block mb-1 text-sm font-medium text-gray-700">
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                value={editedData.courseName}
                onChange={(e) => handleInputChange(e, 'courseName')}
                className="mb-2 p-2 border rounded-md w-full"
                placeholder="Course Name"
              />
              <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={editedData.description}
                onChange={(e) => handleInputChange(e, 'description')}
                className="mb-2 p-2 border rounded-md w-full"
                placeholder="Description"
              />

              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={editedData.category}
                onChange={(e) => handleInputChange(e, 'category')}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select category</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Projects">Projects</option>
                <option value="Programming Languages">Programming Languages</option>
                <option value="Others">Others</option>
              </select>

              <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                id="price"
                value={editedData.price}
                onChange={(e) => handleInputChange(e, 'price')}
                className="mb-2 p-2 border rounded-md w-full"
                placeholder="Price"
              />

              <label htmlFor="DiscountPrice" className="block mb-1 text-sm font-medium text-gray-700">
                Discount Price
              </label>
              <input
                type="text"
                id="DiscountPrice"
                value={editedData.DiscountPrice}
                onChange={(e) => handleInputChange(e, 'DiscountPrice')}
                className="mb-2 p-2 border rounded-md w-full"
                placeholder="Discount Price"
              />

              <label htmlFor="courseOutLine" className="block mb-1 text-sm font-medium text-gray-700">
                Course Outline
              </label>
              <textarea
                id="courseOutLine"
                value={editedData.courseOutLine}
                onChange={(e) => handleInputChange(e, 'courseOutLine')}
                className="mb-2 p-2 border rounded-md w-full"
                placeholder="Course Outline"
              />

<label htmlFor="coverPhoto" className="block mb-1 text-sm font-medium text-gray-700">
  Cover Photo
</label>
<input
  type="file"
  id="coverPhoto"
  name='coverPhoto'
  className="mb-2 p-2 border rounded-md w-full"
  accept="image/*"
  onChange={handleFiles}
/>

<label htmlFor="demoVideo" className="block mb-1 text-sm font-medium text-gray-700">
  Demo Video
</label>
<input
  type="file"
  id="demoVideo"
  name='demoVideo'
  className="mb-2 p-2 border rounded-md w-full"
  accept="video/*"
  onChange={handleFiles}
/>

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                >
                  Save
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
  
    </>
  );
};

export default CourseModal;
