import React, { useState } from "react";
import Dropzone from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { Dna } from "react-loader-spinner";
import PropTypes from "prop-types";
const AddCategory = ({ closeModal, setFetch }) => {
  const { adminAxiosInstance } = useAxiosPrivate();
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleEditImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file && file.type.startsWith("image/")) {
      setImage(acceptedFiles[0]);
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const categoryData = { name: categoryName, image };
      const response = await adminAxiosInstance.post(
        "/createCategory",
        categoryData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#00FF00",
            color: "#FFFFFF",
            padding: "16px",
            minWidth: "300px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            position: "center", // Center the toast
          },
        });
        setFetch(true);
      }

      setCategoryName("");
      setImage(null);
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred while submitting the form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
       <Toaster />
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
      <div className="bg-white p-8 rounded-lg w-auto">
      
        {/* Close button */}
        <span
          className="float-right text-gray-600 cursor-pointer"
          onClick={closeModal}
        >
          &times;
        </span>

        {/* Modal content */}
        <h2 className="text-2xl font-bold mb-4">Add Category</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Category Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>

          {/* Image Upload */}
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
                      ></img>
                    )}
                  </div>
                </div>
              </section>
            )}
          </Dropzone>

          {/* Submit Button */}
          <div className=" flex justify-center p-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Category
            </button>
          </div>
        </form>

        {/* Drag and Drop Section */}
      </div>
       
    </div>
  );
};
AddCategory.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setFetch: PropTypes.func.isRequired,
};
export default AddCategory;
