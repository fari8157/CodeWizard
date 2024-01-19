import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";

function CourseShowing() {
  const { userAxiosInstance } = useAxiosPrivate();
  const [course, setCourse] = useState({});
  const [selectedChapter, setSelectedChapter] = useState(null);
  const location = useLocation();
  const [reviews, setReviews] = useState(null);
  const [fetch, setFetch] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const { Token, role, userId } = useSelector((state) => state.Client);
  const [values, setValues] = useState({
    rating: null,
    review: "",
    courseId: location.state.course._id,
    userId: userId,
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("uggr", location.state.course._id);
      try {
        const response = await userAxiosInstance.get(
          `getMycourse/${location.state.course._id}`
        );
        console.log(response);
        setCourse(response.data);
        setReviews(response.data.reviews);
        console.log("review", location.state.course.reviews);
        setSelectedChapter(response.data.chapters[0]);
        setIsReviewed(
          response.data?.reviews?.some((obj) => obj.user._id === userId)
        );
        setFetch(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        // Handle errors as needed
      }
    };

    fetchData(); // Call the async function
  }, [fetch, location.state.course._id]);

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    console.log("chapter", chapter);
  };
  const submitReview = async () => {
    if (values.rating === null || values.review.trim() === "") {
      toast.error("please give the review and rating");
      return;
    }
    const response = await userAxiosInstance.post("addRating", values);
    setFetch(true);
  };

  console.log("Selected Chapter:", selectedChapter);

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full h-full">
        <Toaster />
        {/* Video Section */}
        <div className="lg:w-3/4">
          <div className="w-full h-full flex flex-col justify-around items-center  mt-2">
            {/* <video  className="w-5/6 h-1/2 md:h-4/6" controls>
              {selectedChapter && (
                <source src={selectedChapter.chapterVideo.url} type="video/mp4" />
              )}
              Your browser does not support the video tag.
            </video> */}
            <video
              src={selectedChapter?.chapterVideo?.url || "nothing"}
              type="video/mp4"
              className="w-5/6 h-full md:h-4/6"
              controls
            >
              Your browser does not support the video tag.
            </video>

            {/* /////////////////////Review///////////////////////////// */}
            <div className="bg-gray-100 rounded-lg w-full mt-6 p-3">
              <h1 className="text-2xl font-bold p-5">Caption:</h1>
              <div className="font-medium pb-3 pl-1 text-lg h-40 overflow-auto ">
                {selectedChapter?.caption}
              </div>

              <h1 className="text-2xl font-bold p-5">Course Review:</h1>
              <div className="w-full p-3 flex flex-col gap-2">
                {/* /////////////// */}
                {!isReviewed && (
                  <div>
                    <div className="font-medium text-xl p-2">Rating:</div>
                    <Rating
                      name="rating"
                      onChange={(event, newValue) =>
                        setValues({ ...values, rating: newValue })
                      }
                    />
                    <div className="w-full mx-auto px-1">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-xl font-bold text-gray-700">
                          write your review: {isReviewed}
                        </h2>
                      </div>
                      <div className="mb-6">
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-300">
                          <label className="sr-only">Your Review</label>
                          <textarea
                            name="comment"
                            rows="6"
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                            placeholder="Write a review..."
                            value={values.review}
                            onChange={(e) =>
                              setValues({ ...values, review: e.target.value })
                            }
                            required
                          ></textarea>
                        </div>
                        <button
                          onClick={submitReview}
                          className="inline-flex items-center py-2.5 px-4 font-semibold text-base text-center rounded-lg border border-gray-300 hover:bg-gray-400"
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* ///////// */}
                <div>
                  <div className="font-medium pb-3 pl-1 text-lg">
                    What People have to say: {isReviewed}
                  </div>
                  {reviews?.length > 0 ? (
                    reviews?.map((review, i) => (
                      <article
                        key={i}
                        className="p-6 text-base bg-white rounded-lg mb-3"
                      >
                        <footer className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-700 font-semibold">
                              <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={review?.user?.pic?.url || "img"}
                                alt="Michael Gough"
                              />
                              {review?.user?.fullName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <time>
                                {new Date(review?.createdAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </time>
                            </p>
                          </div>
                        </footer>
                        <Rating name="rating" value={review?.rating} readOnly />
                        <p className="text-gray-500">{review?.review}</p>
                      </article>
                    ))
                  ) : (
                    <article className="p-5 text-base bg-white rounded-lg mb-3">
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center"></div>
                      </footer>
                      <p className="text-orange-400 text-xl font-semibold">
                        Be the first to Review the Course
                      </p>
                    </article>
                  )}
                </div>
              </div>
            </div>
            {/* ////////////////////////////////////////////////// */}
          </div>
        </div>

        {/* Chapters Section */}
        <div className="lg:w-2/4 lg:border-l lg:border-black pb-8 overflow-y-auto">
          <div className="p-6 py-5">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Chapters</h2>
            <div className="overflow-y-auto">
              <div className="flex flex-col">
                {course.chapters &&
                  course.chapters.map((chapter, index) => (
                    <div
                      key={index}
                      onClick={() => handleChapterClick(chapter)}
                      className={`mb-4 p-3 border border-gray-300 rounded shadow-md hover:shadow-lg transition duration-300 ${
                        selectedChapter === chapter ? "bg-gray-200" : ""
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-2 cursor-pointer">
                        {chapter.chapterHeadline}
                      </h3>
                      {/* Add other chapter details here */}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseShowing;
