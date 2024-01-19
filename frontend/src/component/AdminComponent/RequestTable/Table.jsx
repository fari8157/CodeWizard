import React, { useEffect, useState } from "react";
import adminAxios from "../../../Axiox/AdminAxiox";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import PicModal from "../../Modal/PictureModal";
import Swal from 'sweetalert2';

const TeacherRequest = () => {
  const [searchInput, setSearchInput] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const { Token, role } = useSelector((state) => state.Client);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    adminAxios
      .get("/teacherApprovel", {
        headers: {
          "Content-Type": "application/json",
          Authorization: Token,
          userRole: role,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTeachers(response.data.teachers);
        setFilteredTeachers(response.data.teachers);
      });
  }, [setTeachers, setFilteredTeachers]);

  const accessChange = (email, isApprovel, teacherId) => {
    console.log(email, isApprovel);
    adminAxios
      .put(
        `/updateTeacherApprovel/${teacherId}`,
        { email, isApprovel },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: Token,
            userRole: role,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          // Show error alert
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text:response.data.message,
          });
          return;
        } else {
          const updatedFilteredTeachers = filteredTeachers.filter(
            (teacher) => teacher.email !== email
          );
          setFilteredTeachers(updatedFilteredTeachers);
  
          // Show success alert
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          });
        }
      })
      .catch((error) => {
        // Show generic error alert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred',
        });
        console.error(error);
      });
  };
  
  
  const handleSearch = (value) => {
    setSearchInput(value);

    const filteredData = teachers.filter((teacher) => {
      const fullName = (teacher.fullName || "").toLowerCase();
      const userName = (teacher.userName || "").toLowerCase();
      const email = (teacher.email || "").toLowerCase();

      return (
        fullName.includes(value.toLowerCase()) ||
        userName.includes(value.toLowerCase()) ||
        email.includes(value.toLowerCase())
      );
    });

    setFilteredTeachers(filteredData);
    setCurrentPage(0); // Reset to first page on new search
  };

  const handleItemsPerPageChange = (e) => {
    const selectedItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(0); // Reset to first page on items per page change
  };

  const offset = currentPage * itemsPerPage;
  let paginatedData = [];

  if (Array.isArray(filteredTeachers)) {
    paginatedData = filteredTeachers.slice(offset, offset + itemsPerPage);
  }
  const handleOpenModal = (imageSrc) => {
    setModalImage(imageSrc);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  function formatCurrentDate(date) {
    const currentDate = new Date(Date.now(date));
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return currentDate.toLocaleDateString("en-US", options);
  }

  return (
    <div className="bg-opacity-50 bg-white text-black p-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-4">
          <div className="flex justify-end items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded-md w-full md:w-64"
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
           <div className=" overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mx-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sl No
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teacher Fullname
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Proof
                </th>
                {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th> */}
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approve/Reject
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((teacher, index) => (
                  <tr key={teacher._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">
                        {index + 1 + currentPage * itemsPerPage}
                      </div>
                    </td>
                    <td className="px-6 py-4  whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">
                        {" "}
                        {formatCurrentDate(teacher.created)}
                      </div>
                    </td>
                    <td className="px-6 py-4  whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">
                        {teacher.fullName}
                      </div>
                    </td>
                    <td className="px-6 py-4  whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">
                        {teacher.email}
                      </div>
                    </td>
                    <td className="px-6 py-4  whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900">
                        {" "}
                        {teacher.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center  items-center ">
                      <img
                        src={teacher.idProof}
                        alt="ID Proof"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => handleOpenModal(teacher.idProof)}
                      />
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        type="button"
                        className="hidden md:flex inline-block rounded-full border border-red-900 text-blue-500 dark:bg-yellow-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal hover:text-white dark:text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-red-900 dark:hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-cyan-600 dark:focus-bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus-outline-none focus-ring-0 active-bg-cyan-700 dark:active-bg-neutral-200 active-shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)]"
                      >
                        View Details
                      </button>
                    </td> */}
                    <td className="px-6 py-4 text-center  whitespace-nowrap flex  gap-2  ">
                      <button
                        class="relative inline-flex items-center justify-center px-6 p-1 py-1 overflow-hidden font-medium text-green-500 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group"
                        onClick={() =>
                          accessChange(teacher.email,true,teacher._id)
                        }
                      >
                        <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
                          <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </span>
                        <span class="absolute flex items-center justify-center w-full h-full text-green-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                          Approve
                        </span>
                        <span class="relative invisible">Approve</span>
                      </button>

                      <button
                        class="relative inline-flex items-center justify-start inline-block px-6 py-1.5  overflow-hidden font-bold rounded-full group"
                        onClick={() => accessChange(teacher.email, false)}
                      >
                        <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
                        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-red-700 opacity-100 group-hover:-translate-x-8"></span>
                        <span className="relative w-full text-left text-red-500 transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                          Reject
                        </span>
                        <span className="absolute inset-0 border-2 border-red-500 rounded-full"></span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 whitespace-nowrap text-center items-center"
                  >
                    <div className="flex items-center justify-center h-full">
                      <p className="text-xl text-gray-500">
                        No data available.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          {showModal && (
            <PicModal image={modalImage} closeModal={handleCloseModal} />
          )}

          <div className="flex justify-end mt-7">
            <label className="mr-2 bg-orange-400 rounded-full px-6 p-2 text-white">
              Items per Page
            </label>
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
              pageCount={Math.ceil(filteredTeachers.length / itemsPerPage)}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageChange}
              containerClassName="pagination-container"
              activeClassName="active"
              breakLabel={"..."}
              breakClassName={"break-me"}
              previousLabel={<span className="pagination-arrow">&lt;</span>}
              nextLabel={<span className="pagination-arrow">&gt;</span>}
              pageLinkClassName="pagination-page"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRequest;
