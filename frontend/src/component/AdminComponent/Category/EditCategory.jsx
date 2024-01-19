import React, { useState } from "react";
import Swal from 'sweetalert2'
import adminAxiosInstance from "../../../Axiox/AdminAxiox";
import PropTypes from "prop-types";
import { Dna } from "react-loader-spinner";
const EditCategoryModal = ({ closeModal, category, setFetch }) => {
  const [categoryName, setCategoryName] = useState(category.name || "");
  const [categoryupdate, setcategoryUpdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

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
        timer: 1500,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading before the API call

    try {
      if (!categoryName.trim()) {
        alert("Category name cannot be empty or contain only spaces.");
        setLoading(false); // Stop loading state
        return;
      }

      // Check if the category name is the same as the existing one
      if (categoryName === category.name) {
        alert("No changes made to the category name.");
        setLoading(false); // Stop loading state
        return;
      }

      // console.log(categoryName, image,categoryupdate);
      const categoryData = { name: categoryName };
      const response = await adminAxiosInstance.put(
        `/editCategoryName/${category._id}`,
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
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setFetch(true);
        closeModal()
      }
    } catch (error) {
      console.error("Error occurred:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error occurred while submitting the form",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
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
        <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
        <form onSubmit={handleSubmit}>
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
};
EditCategoryModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setFetch: PropTypes.func.isRequired,
};

export default EditCategoryModal;
