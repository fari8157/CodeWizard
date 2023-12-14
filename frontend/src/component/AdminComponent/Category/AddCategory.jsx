import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const AddCategory = ({ closeModal }) => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);

  const handleDragEnd = (result) => {
    // TODO: Implement logic to handle reordering after drag and drop
    // Example: Update state based on the reordered items
  };

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setCategoryName('');
    setImage(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        {/* Close button */}
        <span className="float-right text-gray-600 cursor-pointer" onClick={closeModal}>
          &times;
        </span>

        {/* Modal content */}
        <h2 className="text-2xl font-bold mb-4">Add Category</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Category Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Upload Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Category
          </button>
        </form>

        {/* Drag and Drop Section */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="categories">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {/* Placeholder for draggable content */}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default AddCategory;
