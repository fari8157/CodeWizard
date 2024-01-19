import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import EditModal from "./UploadCard/CourseDetailModal";
import SortableItem from "./Sortable";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function UploadDetail() {
  const location = useLocation();
  const selectedCourseVideos = location.state.course;
  const chapters = selectedCourseVideos.chapters;
  const { teacherAxiosInstance } = useAxiosPrivate();
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [chapterIndex, setChapterIndex] = useState("");
  const [chapterHeadline, setChapterHeadline] = useState("");
  const [chapterVideo, setChapterVideo] = useState(null);
  const [chapterCaption, setChapterCaption] = useState("");
  const [update, setUpdate] = useState(false);
  const [course_id, setCourse_id] = useState(selectedCourseVideos._id);
  const { Token, role } = useSelector((state) => state.Client);
  const [coureseDetails, setCourseDetails] = useState(null);
  const [chapterDetails, setChapterDetails] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await teacherAxiosInstance.get(
        `/coursedetails/${course_id}`
      );

      setCourseDetails(response.data.course);
      setChapterDetails(response.data.course.chapters);
      setUpdate(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [update, setChapterDetails, setCourseDetails]);

  const handleAddChapter = () => {
    setShowChapterModal(true);
  };

  const handleCloseChapterModal = () => {
    setShowChapterModal(false);
  };
const handleCaptionChange=(e)=>{
  setChapterCaption(e.target.value)
}
  const handleIndexChange = (e) => {
    setChapterIndex(e.target.value);
  };

  const handleHeadlineChange = (e) => {
    setChapterHeadline(e.target.value);
  };

  const handleVideoChange = (e) => {
    setChapterVideo(e.target.files[0]);
  };

  const modalOpen = () => {
    setEdit(true);
  };
  const modalClose = () => {
    setEdit(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Saving Chapter Details",
        text: "Please wait...",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        showCancelButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      handleCloseChapterModal();

      const formData = new FormData();
      formData.append("chapterIndex", chapterIndex);
      formData.append("chapterVideo", chapterVideo);
      formData.append("chapterHeadline", chapterHeadline);
      formData.append("chapterCaption",chapterCaption)
      formData.append("courseId", course_id); // Change the key according to your backend API
      const response = await teacherAxiosInstance.post(
        "uploadChapters",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Adjust the content type as per your requirement
            Authorization: Token,
            userRole: role,
          },
        }
      );
      console.log(response.data);
      if (response.data.error) {
        Swal.close();

        toast.error(response.data.message);
      } else {
        Swal.close();
        // setCourseDetails(response.data.courseDetails)
        // setChapterDetails(response.data.courseDetails.chapters)
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      Swal.close();
      // Assuming 'toast' function is defined for displaying notifications
      toast.error("Error submitting data");
    }
  };

  const conformCourse = async () => {
    console.log(course_id);
    if (!Array.isArray(chapterDetails) || chapterDetails.length <= 0) {
      toast.error("Please add videos before trying to upload.");
      return;
    }
    const response = await teacherAxiosInstance.post("confirmCourse", {
      course_id: course_id,
    });
    console.log(response);
    if (response.data.error) {
      toast.error(response.data.message);
    } else {
      navigate("/teacher/uploadCourse");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Course uploaded",
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const activeId = active.id.chapterIndex;
    const overId = over.id.chapterIndex;
    console.log(active);
    console.log(over);

    if (activeId !== overId) {
      setChapterDetails((value) => {
        const activeIndex = value.indexOf(active.id);
        const overIndex = value.indexOf(over.id);

        const putData = {
          activeId,
          overId,
        };

        teacherAxiosInstance
          .put(`/changeIndex/${course_id}`, putData)
          .then((res) => {
            setUpdate(true);
          })
          .catch((err) => {
            console.log(err);
          });

        return arrayMove(value, activeIndex, overIndex);
      });
    }
  };

  const hadleDelete = async (courseId, chapterIndex) => {
    console.log(courseId, chapterIndex);
    const response = await teacherAxiosInstance.delete(
      `chapterDelete/${courseId}/${chapterIndex}`
    );
    if (response.data.error) {
      toast.error(response.data.message);
      return;
    }
    setUpdate(true);
    console.log(response);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col bg-dashboard-bg">
        {/* Left side (3/4 ratio) */}
        <div className="flex">
          <div className="w-2/4 p-4">
            {/* Video tag */}
            <div className=" bg-gray-800 text-white p-4  rounded-md">
              <video controls className="w-full">
                {/* <source src={coureseDetails && coureseDetails.demoVideo.url} type="video/mp4" /> */}
                {coureseDetails && (
                  <source src={coureseDetails.demoVideo.url} type="video/mp4" />
                )}
                Your browser does not support the video tag.
              </video>
              <div className="flex justify-center mt-2 hidden">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Change Details
                </button>
              </div>
            </div>
          </div>
          {edit && (
            <EditModal
              formData={coureseDetails}
              onClose={modalClose}
              setCourseDetails={setCourseDetails}
            />
          )}

          <div className="w-2/4 p-4">
            {/* Card headline with chapters */}
            <div className=" bg-gray-800  p-4  rounded-md">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-2  00 text-white">
                  Chapters
                </h2>
                {/* Displaying total videos */}
                <h2 className="  text-white">
                  Total videos: {chapterDetails && chapterDetails.length}
                </h2>
              </div>

              {/* Mapping chapters */}

              <div className="h-80 overflow-x-hidden flex flex-col gap-2">
                <div className="w-full  h-auto md:h-course rounded-lg  flex flex-col justify-start gap-2 p-4 ">
                  <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={chapterDetails && chapterDetails}
                      strategy={verticalListSortingStrategy}
                    >
                      {chapterDetails &&
                        chapterDetails.map((chapter) => (
                          <SortableItem
                            key={chapter.chapterIndex}
                            id={chapter}
                            courseId={course_id}
                            chapter={chapter}
                            hadleDelete={() =>
                              hadleDelete(course_id, chapter.chapterIndex)
                            }
                          />
                        ))}
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleAddChapter}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Add Chapter
                </button>
              </div>
            </div>

            {/* Modal for adding chapters */}
            {showChapterModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="bg-white rounded-lg w-3/4 md:max-w-md mx-auto p-4">
                  {/* Your modal content */}
                  <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">Add Chapter</h2>
                      <button
                        onClick={handleCloseChapterModal}
                        className="text-gray-500 hover:text-gray-700 font-bold "
                      >
                        x
                      </button>
                    </div>
                    {/* Form fields for adding a chapter */}
                    <div>
                      <label className="block font-bold mb-2">
                        Chapter Index
                      </label>
                      <input
                        type="text"
                        value={chapterIndex}
                        onChange={handleIndexChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mt-4 mb-2">
                        Upload Chapter Video
                      </label>
                      <input
                        type="file"
                        onChange={handleVideoChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        accept="video/*"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mt-4 mb-2">
                        Chapter Headline
                      </label>
                      <input
                        type="text"
                        value={chapterHeadline}
                        onChange={handleHeadlineChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mt-4 mb-2">
                        Caption
                      </label>
                      <textarea
                        value={chapterCaption}
                        onChange={handleCaptionChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                        rows="4" // You can adjust the number of rows as needed
                        required
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Add Chapter
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full p-5 ">
          <div className="p-5 bg-gray-800 text-white h-auto rounded-md">
            <h2 className="text-xl font-bold my-2">
              Course Name: {coureseDetails && coureseDetails.courseName}
            </h2>
            <div className="flex gap-2">
              <h3 className="text-lg font-semibold flex my-2">
                Description <span>:</span>
              </h3>
              <div className="overflow-y-auto max-h-40 mt-3">
                <p className="text-gray-600 whitespace-pre-line break-words">
                  {coureseDetails && coureseDetails.description}
                </p>
              </div>
            </div>
            <div className="flex gap-2 ">
              <h3 className="text-lg font-semibold my-2 flex whitespace-nowrap  ">
                Course Outline <span>:</span>
              </h3>
              <p className="text-gray-600 whitespace-pre-line break-words my-3">
                {coureseDetails && coureseDetails.courseOutLine}
              </p>
            </div>
            <div>
              Discount Price :
              <span className="text-gray-600">
                {coureseDetails && coureseDetails.DiscountPrice}
              </span>
            </div>
            <div>
              Price :
              <span className="text-gray-600">
                {coureseDetails && coureseDetails.price}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Category Name: {coureseDetails && coureseDetails.category}
            </h3>
            <div className=" p-4 mt-5 flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 "
                onClick={modalOpen}
              >
                Edit Details
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={conformCourse}
              >
                Upload Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadDetail;
