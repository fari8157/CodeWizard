import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import teacherAxiosInstance from "../../../../Axiox/TeacherAxiox";
import CourseVideos from "../VideoDetails";
import CourseModal from "./CourseDetailModal";
import { useSelector } from "react-redux";
import UploadDetail from "../UploadDetails";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../../hook/useAxiosPrivate";
import { Toaster, toast } from "react-hot-toast";
const DetailCard = ({ update, setUpdate }) => {
  const { teacherAxiosInstance } = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [selectedCourseVideos, setSelectedCourseVideos] = useState(null);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const { Token, role } = useSelector((state) => state.Client);

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await teacherAxiosInstance.get("uploadCourse/details", {
        headers: {
          "Content-Type": "application/json",
          Authorization: Token,
          userRole: role,
        },
      });
      console.log("Response data:", response.data);
      setCourses(response.data.uploadCourses);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    if (update) {
      fetchData();
      setUpdate(false);
    }
  }, [update]);

  const handleDelete = async (id) => {
    console.log("hii");
    try {
      const response = await teacherAxiosInstance.delete(`deleteCourse/${id}`);

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        setUpdate(true);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while deleting the course");
    }
  };

  const handleClose = () => {
    setSelectedCourseVideos(null);
  };

  const handleShowVideos = (id) => {
    const selectedCourse = courses.find((course) => course._id === id);
    if (selectedCourse) {
      setSelectedCourseVideos(selectedCourse);
    }
  };

  useEffect(() => {
    console.log("Selected Course Details:", selectedCourseDetails);
  }, [selectedCourseDetails]);

  const handleShowDetails = (id) => {
    const selectedCourse = courses.find((course) => course._id === id);
    if (selectedCourse) {
      setSelectedCourseDetails(selectedCourse);
    }
  };

  const handleDetailsClose = () => {
    setSelectedCourseDetails(null);
  };
  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-wrap gap-4 justify-center"> {/* Added justify-center */}
    <Toaster />
  
    {filteredCourses && filteredCourses.length > 0 ? (
      filteredCourses.map((course) => (
        <CourseCard
          key={course.id}
          courseData={course}
          onDelete={() => handleDelete(course._id)}
          onShowVideos={() =>
            navigate("/teacher/uploadDetails", { state: { course: course } })
          }
          onShowDetails={() =>
            navigate("/teacher/uploadDetails", { state: { course: course } })
          }
        />
      ))
    ) : (
      <div className="flex justify-center items-center h-48 text-white text-xl">
        No upload courses available.
      </div>
    )}
  </div>
  
  );
};

export default DetailCard;
