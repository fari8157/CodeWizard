import React, { useState } from "react";
import Dropzone from "react-dropzone";
import adminAxiosInstance from "../../../Axiox/AdminAxiox";
import Swal from 'sweetalert2'
import { Dna } from "react-loader-spinner";
import PropTypes from "prop-types";
function EditImage({ closeModal, category, setFetch }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleEditImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please upload a valid image file.",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading before the API call

    try {
      const categoryData = { image: image };
      const response = await adminAxiosInstance.put(
        `/editCategoryImage/${category._id}`,
        categoryData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      if (response.data.error) {
       Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
       
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
        setFetch(true);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    
      Swal.fire({
        position: "center",
        icon: "error",
        title:"An error occurred while submitting the form",
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      setLoading(false);
      closeModal()

    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
        <span
          className="float-right text-gray-600 cursor-pointer"
          onClick={closeModal}
        >
          &times;
        </span>
        <h2 className="text-2xl font-bold mb-4">Edit Category image</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="flex justify-center p-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Category
            </button>
          </div>
        </form>
       
      </div>
    </div>
  );
}
EditImage.propTypes = {
  closeModal: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  setFetch: PropTypes.func.isRequired,
};

export default EditImage;
