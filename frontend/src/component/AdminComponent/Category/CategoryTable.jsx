import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import PicModal from '../../Modal/PictureModal';
import AddCategory from './AddCategory';
import useAxiosPrivate from '../../../hook/useAxiosPrivate';
import EditCategoryModal from './EditCategory';
import EditImage from './EditImage';



const Category = () => {
  const{adminAxiosInstance}= useAxiosPrivate()
  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([])
   const [filteredCategories, setFilteredCategories] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  // Additional states for modal
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showAddModal, setaddModal] = useState(false);
  const[editNameModal,setNameEditModal] = useState(false)
  const [editImageModal,setImageEditModal]=useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fetch,setFetch]=useState(false)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await adminAxiosInstance.get('/categories');
        console.log(response);
        setCategories(response.data.categories);
        setFetch(false)
      } catch (error) {
        console.error('Error fetching categories:', error);
        
      }
    };

    fetchCategories();
  }, [ setCategories,fetch]);

  const openModal = (category) => {
    setSelectedCategory(category);
    setNameEditModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedCategory(null);
    setNameEditModal(false);
  };

  const openImageModal = (category) => {
    setSelectedCategory(category);
    setImageEditModal(true);
  };

  const closeImageModal = () => {
    setSelectedCategory(null);
    setImageEditModal(false);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleOpenModal = (imageSrc) => {
    setModalImage(imageSrc);
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNewModal = () => {
    setaddModal(true);
    console.log(showAddModal);
  };

  const handleSearch = (value) => {
    setSearchInput(value);

    const filteredData = categories.filter((category) =>
      category.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCategories(filteredData);
    setCurrentPage(0); 
  };

  
  const handleItemsPerPageChange = (e) => {
    const selectedItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(0); 
  };

 
  const offset = currentPage * itemsPerPage;
  let paginatedData = filteredCategories.slice(offset, offset + itemsPerPage);
  useEffect(() => {
   
    setFilteredCategories(categories);
  }, [categories]);
  return (
    <div className="bg-opacity-50 bg-white text-black p-4">
  {/* Search input */}
  <div className="max-w-screen-xl mx-auto mb-4 ">
    <div className="flex justify-between items-center mb-4"> 
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded-md  md:w-64"
        value={searchInput}
        onChange={(e) => handleSearch(e.target.value)}
      />
      
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded  sm:hover:text-blue-500 sm:py-2 sm:px-4"
        onClick={handleNewModal}
      >
        Add Category
      </button>
    </div>
  </div>

      {/* Table */}
      <div className="overflow-x-auto">
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
                <div className="text-sm text-gray-900">{category.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center flex items-center justify-center">
                <img
                  src={category.images&&category.images.url}
                  alt="Category"
                  className="h-8 w-8 cursor-pointer"
                  onClick={() => handleOpenModal(category.images&&category.images.url)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center ">
                <div className='flex gap-3 justify-center items-center'>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => openModal(category)}
                >
                  Edit Name
                </button>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => openImageModal(category)}
                >
                  Edit Image
                </button>
                </div>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
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
      {showAddModal && (
 <AddCategory closeModal={() => setaddModal(false)} setFetch={setFetch} />

)}
       {editNameModal&&<EditCategoryModal closeModal={closeModal} category={selectedCategory} setFetch={setFetch}/>}
       {editImageModal&&<EditImage closeModal={closeImageModal} category={selectedCategory} setFetch={setFetch}/>}
      {showModal && <PicModal image={modalImage} closeModal={handleCloseModal} />}
    </div>
  );
};

export default Category;
