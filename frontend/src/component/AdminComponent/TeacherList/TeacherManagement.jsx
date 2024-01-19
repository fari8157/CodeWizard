import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import TeacherCard from './TeacherCadr'; // Corrected typo in the import statement
import adminAxiosInstance from '../../../Axiox/AdminAxiox';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

const TeacherManagement = () => {
  const { Token, role } = useSelector((state) => state.Client);

  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    adminAxiosInstance
      .get('/teachers', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Token,
          userRole: role,
        },
      })
      .then((response) => {
        setTeachers(response.data.teachers);
        setFilteredTeachers(response.data.teachers);
      });
  }, [Token, role]);
 
  const acessChange = (email,isAccess,teacher_id) => {
    console.log(email,isAccess,teacher_id);
    adminAxiosInstance.put(`/teacherAccess/${teacher_id}` ,{email,isAccess},
    {
      headers:{
        'Content-Type':'application/json',
        'Authorization':Token,  
        'userRole':role,
      }
    }).then((response)=>{
      console.log(response.data);
      setFilteredTeachers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === response.data.email ? { ...user,isAccess: !isAccess } : user
      )
    );
   
    })
   
  };


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    const filtered = teachers.filter((teacher) => {
      const fullName = teacher.fullName.toLowerCase(); 
      return fullName.includes(query);
    });
  
    setFilteredTeachers(filtered);
    setCurrentPage(0);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTeachers.slice(indexOfFirstItem, indexOfLastItem);

  const pageCount = Math.ceil(filteredTeachers.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  return (
    <div className='w-screen h-screen overflow-x-hidden'>
      {/* Your existing JSX */}
      <div className='w-full px-6 h-24  flex justify-center items-center'>
        {/* Search Input */}
        <div className='w-full h-2/3 bg-teacher-card-bg flex items-center justify-end px-4'>
          <div className='flex '>
            <div className='w-14 h-10 rounded-l-md bg-black flex justify-center items-center'>
              <FaSearch className='text-blue-500' />
            </div>
            <input
              type='text'
              placeholder='Search...'
              value={searchQuery}
              onChange={ handleSearch}
              className='p-2 rounded-r-md w-full md:w-64 text-white text-verySmall-1 bg-dashboard-bg outline-none'
            />
          </div>
        </div>
      </div>
      {/* Render Teacher Cards */}
      <div className='w-full h-auto flex items-center justify-center flex-wrap gap-2 py-2 px-2'>
        {currentItems.map((teacher, index) => (
          <TeacherCard key={index} teacher={teacher}  acessChange={acessChange} />
        ))}
      </div>
      <div className='w-full h-24'>
        <div className='flex justify-center'>
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick} // Corrected function name
            containerClassName='pagination-container'
            activeClassName='active'
            breakLabel={'...'}
            breakClassName={'break-me'}
            previousLabel={<span className='pagination-arrow'>&lt;</span>}
            nextLabel={<span className='pagination-arrow'>&gt;</span>}
            pageLinkClassName='pagination-page'
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherManagement;
