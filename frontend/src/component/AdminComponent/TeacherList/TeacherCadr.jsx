import React from "react";
import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const profilePic =
  "https://akademi.dexignlab.com/react/demo/static/media/8.0ec0e6b47b83af64e0c9.jpg";

const TeacherCard = ({ teacher, acessChange }) => {
  const { fullName, isAccess, pic } = teacher;
  const navigate = useNavigate();

  return (
    <div className="bg-teacher-card-bg w-64 h-56 rounded-md">
      <div className="w-full h-2/3">
        <div className="h-2/3 flex justify-center py-3">
          <img className="w-1/3 h-full" src={pic} alt="" />
        </div>
        <div className="h-2/3 text-white flex flex-col items-center gap-1 capitalize">
          <div className="text-sm">{fullName}</div>
          <div className="text-verySmall">
            Status:{" "}
            <span className={isAccess ? "text-green-500" : "text-red-500"}>
              {isAccess ? "Active" : "Block"}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-1/3 flex justify-evenly items-center">
        {/* <Button
          className="bg-profile-color"
          onClick={() =>
            navigate("/admin/teacherDetails", {
              state: { teacherId: teacher._id },
            })
          }
        >
          Profile
        </Button> */}

        <Button
          className={isAccess ? "text-red-500" : "text-green-500"}
          onClick={() => acessChange(teacher.email, isAccess, teacher._id)}
        >
          {isAccess ? "Block" : "Active"}
        </Button>
      </div>
    </div>
  );
};

TeacherCard.propTypes = {
  teacher: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    isAccess: PropTypes.bool.isRequired,
    pic: PropTypes.string.isRequired,
  }).isRequired,
};

export default TeacherCard;
