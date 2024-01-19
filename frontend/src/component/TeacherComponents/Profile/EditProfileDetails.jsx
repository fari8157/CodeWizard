import React from 'react';

const EditDetailsModal = ({ closeModal, teacherData, handleInputChange, handleSubmit }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800" onClick={closeModal}>
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={teacherData.fullName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Bank Account Number:</label>
            <input
              type="text"
              name="bankAccountNumber"
              value={teacherData.bankAccountNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">IFSC Code:</label>
            <input
              type="text"
              name="ifscCode"
              value={teacherData.ifscCode}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={teacherData.phoneNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className='flex justify-between'>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
          <button
            
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"  onClick={closeModal}
          >
           cancel
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDetailsModal;
