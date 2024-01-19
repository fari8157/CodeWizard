import React from "react";
import { useNavigate } from "react-router-dom";

function EnrollmentCard({ course }) {
  console.log(course);
  const navigate = useNavigate();
  const handleContinue = () => {
    const courseId = course && course._id; // Assuming course._id contains the courseId
    if (courseId) {
      navigate(`/myEntrollments/chapters`, { state: { course } });
    }
  };
  return (
    <div className="w-1/4 flex gap-4 p-2 flex-col items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="h-64 w-full cursor-pointer hvr-grow shadow-lg">
          <div
            className="h-2/3 bg-cover bg-center"
            style={{
              backgroundImage: `url(
              ${course?.coverPhoto?.url && course.coverPhoto.url}
            )`,
            }}
          ></div>
          <div className="h-1/3 flex flex-col gap-2 items-start justify-center pl-6">
            <div className="text-verySmall md:text-xs font-medium w-full ">
              {course?.courseName
                ? course.courseName
                : "Cyber Security Training for Absolute Beginners"}
            </div>
            <div className="text-verySmall md:text-xs">
              {course?.category && course.category}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleContinue}
          >
            Continue
          </button>
          {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Chat
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default EnrollmentCard;
