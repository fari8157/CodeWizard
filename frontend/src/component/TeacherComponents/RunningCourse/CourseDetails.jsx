import React, { useEffect, useState } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CourseCard from "./CourseCard";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { useSelector } from "react-redux";

function CourseDetails() {
  const { teacherAxiosInstance } = useAxiosPrivate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { userId } = useSelector((state) => state.Client);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await teacherAxiosInstance.get(`/courses/${userId}`, {
          params: {
            search: searchTerm,
            category: selectedCategory,
            page: currentPage,
            limit: itemsPerPage,
            priceRange: selectedPriceRange,
          },
        });

        setCourses(response.data.courses);
        setFilteredCourses(response.data.filteredCourses);
        setCurrentPage(response.data.currentPage);
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Handle error (e.g., show an error message)
      }
    };

    fetchData();
  }, [
    searchTerm,
    selectedCategory,
    currentPage,
    itemsPerPage,
    selectedPriceRange,
  ]);

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
    setCurrentPage(1);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="bg-dashboard-bg h-screen">
      <div className="">
        <div className="w-full px-6 h-24 flex justify-center items-center  ">
          <div className="w-full h-2/3 bg-teacher-card-bg flex items-center justify-center px-4 ">
            <div className="flex items-center gap-6">
              {/* Category Dropdown */}
              <select
                className="p-2 rounded-l-md w-24 md:w-32 text-white text-verySmall-1 bg-dashboard-bg outline-none mr-1"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {" "}
                <option value="">All Categories</option>
                {Array.from(
                  new Set(courses.map((course) => course.category))
                ).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div>
                <select
                  onChange={handlePriceRangeChange}
                  className="p-2 rounded-l-md w-24 md:w-32 text-white text-verySmall-1 bg-dashboard-bg outline-none mr-1"
                >
                  <option value="">All Prices</option>
                  <option value="0-100">{"\u20B9"}0 - {"\u20B9"}100</option>
                  <option value="100-500">{"\u20B9"}100 - {"\u20B9"}500</option>
                </select>
              </div>

              {/* Search Bar */}
              <div className="flex justify-center items-center h-10">
                <div className="flex justify-center items-center">
                  <div className="w-14 h-10 rounded-l-md bg-black flex justify-center items-center">
                    <span className="text-blue-500">
                      <FaSearch />
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 rounded-r-md w-full md:w-64 text-white text-verySmall-1 bg-dashboard-bg outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full h-auto  overflow-hidden">
      {filteredCourses.length === 0 ? (
          // Display a message when no courses are available
          <div className="flex justify-center items-center h-48 text-white text-xl">
            No courses available.
          </div>
        ) : (
          // Display course cards if there are courses
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-auto bg-dashboard-bg">
            {currentCourses.map((course) => (
              <div key={course._id}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center bg-dashboard-bg pb-5 pt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <FaChevronLeft />
          </button>

          {Array.from(
            { length: Math.ceil(filteredCourses.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredCourses.length / itemsPerPage)
            }
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === Math.ceil(filteredCourses.length / itemsPerPage)
                ? "bg-gray-300 text-gray-600"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
