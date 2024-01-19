import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Dna } from "react-loader-spinner";
import useAxiosPrivate from'../../../hook/useAxiosPrivate'
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
const AddBlogModal = ({ onClose, onSave, editPost }) => {
  const {userAxiosInstance}= useAxiosPrivate()
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    content: "", // Added content property
    // Add other necessary properties
  });
  const { userId } = useSelector((state) => state.Client);
  useEffect(() => {
    if (editPost) {
      setBlogData({
        title: editPost.title || "",
        image: editPost.image || "",
        content: editPost.description || "",
        // Set other necessary properties for editing
      });
      setImage(editPost.image || null);
    }
  }, [editPost]);

  const handleEditImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setBlogData((prevData) => ({
        ...prevData,
        image: file,
      }));
    } else {
      // Handle error
      console.error("Please upload a valid image file.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Prepare blog data to save
    const newBlogData = {
      ...blogData,
      userId: userId, // Make sure userId is defined or passed as an argument
    };
    console.log('new', newBlogData);
  
    try {
      const response = await userAxiosInstance.post('newBlog', newBlogData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log( response);
      if(response.data.error){
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: response.data.message || 'An error occurred.',
        });
        setLoading(false);
        return
      }
      
      Swal.fire({
        icon: 'success',
        title: 'success!',
        text: response.data.message || 'An error occurred.',
      });
      onSave(response.data.blog)
      setLoading(false);
      onClose();
    } catch (error) {
      console.error('Error saving the blog:', error);
      setLoading(false);
      // Handle error (e.g., show error message)
    }
  };
  const handleEdit =async () => {
    try{
    setLoading(true);
    // Prepare blog data to save
    const newBlogData = {
      ...blogData,
    };
    console.log(editPost._id);

    const response = await userAxiosInstance.put(`editBlog/${editPost._id}`, newBlogData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log( response);
    if(response.data.error){
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: response.data.message || 'An error occurred.',
      });
      setLoading(false);
      return
    }
    
    Swal.fire({
      icon: 'success',
      title: 'success!',
      text: response.data.message || 'An error occurred.',
    });
    onSave(response.data.blog)
    setLoading(false);
    onClose();
  } catch (error) {
    console.error('Error saving the blog:', error);
    setLoading(false);
    // Handle error (e.g., show error message)
  }}

   
   

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      < Toaster/>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          {editPost ? "Edit Blog" : "Add Blog"}
        </h2>
        <input
          type="text"
          name="title"
          value={blogData.title}
          onChange={handleChange}
          placeholder="Enter Title"
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        />

        <textarea
          name="content"
          value={blogData.content}
          onChange={handleChange}
          placeholder="Enter Blog Content"
          className="border border-gray-300 p-2 rounded mb-4 w-full h-32"
        />
        <Dropzone
          accept={["image/*"]}
          multiple={false}
          onDrop={handleEditImageDrop}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                className="w-full h-40 border-2 border-gray-400 border-dashed flex items-center justify-center cursor-pointer"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col h-full justify-center">
                  {image ? (
                    <div className="h-1/3 flex items-center justify-center">
                      {image.name}
                    </div>
                  ) : (
                    <p>Drag 'n' drop image here, or click to select image</p>
                  )}
                  {image && (
                    <img
                      className="w-full h-2/3 object-center pb-4"
                      src={URL.createObjectURL(image)}
                      alt="Category"
                    />
                  )}
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        <div className="flex justify-end py-3">
          { editPost?(<button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
          >
            Save
          </button>):(<button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
          >
            Save
          </button>)}
          
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlogModal;
