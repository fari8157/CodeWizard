import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import PicModal from '../Modal/PictureModal';


const Category = () => {
  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([
    {
      _id: '1',
      categoryName: 'Category 1',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      _id: '2',
      categoryName: 'Category 2',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
        _id: '1',
        categoryName: 'Category 1',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        _id: '2',
        categoryName: 'Category 2',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        _id: '1',
        categoryName: 'Category 1',
        imageUrl: 'https://via.placeholder.com/150',
      },
      {
        _id: '2',
        categoryName: 'Category 2',
        imageUrl: 'https://via.placeholder.com/150',
      },
    // Add more dummy data objects here if needed
  ]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  // Additional states for modal
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  // Function to handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Function to open modal with image
  const handleOpenModal = (imageSrc) => {
    setModalImage(imageSrc);
    setShowModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle search input
  const handleSearch = (value) => {
    setSearchInput(value);

    const filteredData = categories.filter((category) =>
      category.categoryName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCategories(filteredData);
    setCurrentPage(0); // Reset to first page on new search
  };

  // Function to handle items per page change
  const handleItemsPerPageChange = (e) => {
    const selectedItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(0); // Reset to first page on items per page change
  };

  // Calculating offset for paginated data
  const offset = currentPage * itemsPerPage;
  let paginatedData = filteredCategories.slice(offset, offset + itemsPerPage);
  useEffect(() => {
    // Initialize filteredCategories with initial data when component mounts
    setFilteredCategories(categories);
  }, [categories]);
  return (
    <div className="bg-opacity-50 bg-white text-black p-4">
      {/* Search input */}
      <div className="max-w-screen-xl mx-auto mb-4 ">
        <div className="flex justify-center items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded-md w-full md:w-64"
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
       
      </div>

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200 mx-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sl No
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((category, index) => (
            <tr key={category._id}>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{index + 1 + currentPage * itemsPerPage}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm text-gray-900">{category.categoryName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center flex items-center justify-center">
                <img
                  src={category.imageUrl}
                  alt="Category"
                  className="h-8 w-8 cursor-pointer"
                  onClick={() => handleOpenModal(category.imageUrl)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => console.log('Edit clicked for:', category.categoryName)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-7">
            <label className="mr-2 bg-orange-400 rounded-full px-6 p-2 text-white">Items per Page</label>
            <select
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
              className="bg-orange-400 rounded-md text-white"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>

          <div className="flex-column-center">
            <ReactPaginate
              pageCount={Math.ceil(filteredCategories.length / itemsPerPage)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName="pagination-container"
              activeClassName="active"
              breakLabel={'...'}
              breakClassName={'break-me'}
              previousLabel={<span className="pagination-arrow">&lt;</span>}
              nextLabel={<span className="pagination-arrow">&gt;</span>}
              pageLinkClassName="pagination-page"
            />
          </div>

      {/* Modal */}
      {showModal && <PicModal image={modalImage} closeModal={handleCloseModal} />}
    </div>
  );
};

export default Category;
