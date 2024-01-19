import React, { useEffect, useState } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CourseCard from "./CourseCard";
import userAxiosInstance from "../../../Axiox/UserAxiox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
function CourseDetails() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState(
    location?.state?.category ? location.state.category : ""
  );
  const [courses, setCourses] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [totalPage, SetTotalPage] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  useEffect(() => {
    fetchData();
  }, [selectedCategory, currentPage, itemsPerPage, selectedPriceRange]);

  const debouncedFetchData = debounce(async (term) => {
    try {
      const response = await userAxiosInstance.get("/courses", {
        params: {
          search: term,
          category: selectedCategory,
          page: currentPage,
          limit: itemsPerPage,
          priceRange: selectedPriceRange,
        },
      });
      setCourses(response.data.courses);
      setFilteredCourses(response.data.filteredCourses);
      setCurrentPage(response.data.currentPage);
      SetTotalPage(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, 3000);
  useEffect(() => {
    return () => debouncedFetchData.cancel();
  }, [debouncedFetchData]);
  useEffect(() => {
    debouncedFetchData(debouncedSearchTerm);
  }, [
    debouncedSearchTerm,
    selectedCategory,
    currentPage,
    itemsPerPage,
    selectedPriceRange,
  ]);

  const fetchData = async () => {
    try {
      const response = await userAxiosInstance.get("/courses", {
        params: {
          search: debouncedSearchTerm,
          category: selectedCategory,
          page: currentPage,
          limit: itemsPerPage,
          priceRange: selectedPriceRange,
        },
      });
      setCourses(response.data.courses);
      setFilteredCourses(response.data.filteredCourses);
      setCurrentPage(response.data.currentPage);
      SetTotalPage(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setDebouncedSearchTerm(event.target.value);
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get("success");

    if (success === "true") {
      setShowAlert(true);
    } else if (success === "false") {
      setShowAlert(true);
    }
  }, [location.search]);

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(currentPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  return (
    <div>
      <div className="w-full px-6 h-24 flex justify-center items-center  ">
        <div className="w-full h-2/3 bg-teacher-card-bg flex items-center justify-center px-4 ">
          <div className="flex items-center gap-6">
            {/* Category Dropdown */}
            <select
              className="p-2 rounded-l-md w-24 md:w-32 text-white text-verySmall-1 bg-dashboard-bg outline-none mr-1"
              /* Add your options and logic for the category dropdown here */
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
                <option value="0-100">
                  {"\u20B9"}0 - {"\u20B9"}100
                </option>
                <option value="100-500">
                  {"\u20B9"}100 - {"\u20B9"}500
                </option>
                {/* Add more price ranges as needed */}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mx-auto   ">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course._id}>
              <Link to={`/courses/${course._id}`}>
                <CourseCard course={course} />
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-4 flex items-center justify-center h-48">
            <p className="text-xl text-gray-500">No courses available.</p>
          </div>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-800"
        >
          <FaChevronLeft />
        </button>

        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPage}
          className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-800"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default CourseDetails;
