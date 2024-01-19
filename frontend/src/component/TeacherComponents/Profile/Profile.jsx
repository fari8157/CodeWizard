import React, { useEffect, useState } from "react";
import ThreeDotMenu from "./ThreeDotMenu";
import ProfileIcon from "./ProfileIcon";
import { FaMailBulk, FaMailchimp, FaPhone } from "react-icons/fa";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { useSelector } from "react-redux";
import EditDetailsModal from "./editProfileDetails";
import { IoCameraReverse } from "react-icons/io5";
import { Toaster, toast } from "react-hot-toast";
const profilePic =
  "https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A74af890a-f81d-4b6b-9d70-61117d5ef84e?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1";

const Profile = () => {
  const { teacherAxiosInstance } = useAxiosPrivate();
  const [teacherData, setTeacherData] = useState("");
  const { userId } = useSelector((state) => state.Client);
  const [showModal, setShowModal] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [showCameraIcon, setShowCameraIcon] = useState(false);
  const [editedData, setEditedData] = useState({
    fullName: "",
    bankAccountNumber: "",
    ifscCode: "",
    phoneNumber: "",
    // Add other fields as needed
  });

  const openModal = () => {
    setShowModal(true);
    setEditedData({
      fullName: teacherData.fullName || "",
      bankAccountNumber: teacherData.bankAccountNo || "",
      ifscCode: teacherData.ifcCode || "",
      phoneNumber: teacherData.phoneNumber || "",
      // Initialize other fields with existing data
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await teacherAxiosInstance.put(
        `/editTeacherDetails/${userId}`,
        {
          ...editedData, // Spread the editedData object
        }
      );
      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }
      toast.success(response.data.message);

      setFetch(true);
      closeModal();
    } catch (error) {
      console.error("Error occurred while updating:", error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userId);
        const response = await teacherAxiosInstance.get(
          `/teacherDetails/${userId}`
        );
        if (response.data.error) {
          return toast.error(response.data.error);
        }
        setTeacherData(response.data.teacher);
        setFetch(false);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
        // Handle error here
      }
    };

    fetchData();
  }, [userId, fetch]);

  const handleMouse = () => {
    setShowCameraIcon((prev) => !prev);
  };
  const handleImage = async (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const imageData = reader.result;

          setTeacherData((prevData) => ({
            ...prevData,
            pic: imageData,
          }));
          const formData = new FormData();
          formData.append("profilePic", imageFile);

          const response = await teacherAxiosInstance.put(
            `/updateProfilePic/${userId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.error) {
            return toast.error(response.data.message);
          }
          t;

          console.log("Profile picture updated:", response.data);
        } catch (error) {
          console.error("Error updating profile picture:", error);
        }
      };

      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <div className="w-screen h-screen+50 md:h-screen overflow-hidden ">
      <Toaster />
      <div className="w-full h-full bg-gray-300 py-5 px-10 flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="w-full md:w-3/4 h-full flex flex-col gap-4">
          <div className="h-1/2 flex flex-col relative">
            <div className="bg-profile-card-color h-1/3 rounded-tl-md rounded-tr-md"></div>
            <div className="bg-white h-2/3 rounded-bl-md rounded-br-md">
              <div className="h-1/4 flex justify-end pr-5">
               
              </div>
              <div className="h-1/4 pl-5 text-2xl font-semibold flex items-center">
                {teacherData && teacherData.fullName}
              </div>
              <div className="h-2/4 flex flex-col md:flex-row pl-5">
                <div className="w-1/2 h-full flex items-center">
                  <ProfileIcon
                    Icon={<FaMailBulk />}
                    title="email"
                    subtitle={teacherData && teacherData.email}
                  />
                </div>
                <div className="w-1/2 h-full flex items-center">
                  <ProfileIcon
                    Icon={<FaPhone />}
                    title="phone"
                    subtitle={teacherData && teacherData.phoneNumber}
                  />
                </div>
              </div>
            </div>
            <div
              className="bg-white w-24 md:w-28 h-24 md:h-28 rounded-full absolute top-14 md:top-8 left-4 flex items-center justify-center"
              onMouseEnter={handleMouse}
              onMouseLeave={handleMouse}
            >
              <div
                style={{
                  backgroundImage: `url(${teacherData && teacherData.pic})`,
                }}
                className="bg-black bg-cover bg-center w-20 md:w-24 h-20 md:h-24 rounded-full relative" // Ensure relative positioning for the parent container
              >
                {showCameraIcon && (
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    <IoCameraReverse className="text-3xl text-white" />
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      className="hidden"
                      name="image"
                      onChange={(e) => handleImage(e)}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white h-1/2 rounded-md">
          <div className="h-2/3 flex flex-col justify-center gap-2 pl-5 md:flex-row md:items-center">
  <div className="font-bold flex justify-center md:justify-start gap-4">
    Bank Account Information :
  </div>
  <div className="text-sm flex flex-col md:flex-row md:justify-between md:items-center px-5">
    <div className="mb-2 md:mb-0">
      <strong>Account Number:</strong>
      <input
        type="text"
        readOnly
        value={teacherData && teacherData.bankAccountNo}
        className="border border-gray-300 rounded-md p-1 ml-2 w-full md:w-auto"
      />
    </div>
    <div>
      <strong>IFSC Code:</strong>
      <input
        type="text"
        readOnly
        value={teacherData && teacherData.ifcCode}
        className="border border-gray-300 rounded-md p-1 ml-2 w-full md:w-auto"
      />
    </div>
  </div>
</div>

            <div className="h-1/6 flex flex-col justify-center gap-2 pl-5">
              {/* <div className='font-semibold text-lg'>Expertise:</div>
    <input
      type='text'
      readOnly
      value={teacherData&&teacherData.expertise} 
      className='border border-gray-300 rounded-md p-1 ml-5'
    /> */}
            </div>
            <div className="h-1/6 flex justify-center items-center mb-3">
              {/* <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mr-4'>
      Add Expertise
    </button> */}
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={openModal}
              >
                Edit Details
              </button>
              {showModal && (
                <EditDetailsModal
                  closeModal={closeModal}
                  teacherData={editedData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
        </div>
        {/* <div className='bg-grey-500 w-full md:w-1/4 h-1/2 flex flex-col gap-2'>
          <div className='bg-white rounded-md h-1/4 flex flex-col justify-center pl-5'>
            <div className='text-sm font-semibold capitalize'>Recent uploads</div>
            <div className='text-verySmall'>Thursday, 10th April , 2022</div>
          </div>
          <div className='bg-white rounded-md h-2/4'>
            <div className='h-1/2 flex flex-col justify-center pl-5'>
                <div className='text-sm font-medium'>Osint</div>
                <div className='text-verySmall-1'>Lessons: 14</div>
              </div>
              <div className='h-1/2 flex'>
                <div className='w-2/3 flex flex-col justify-center pl-5'>
                  <div className='text-verySmall-1'>July 20, 2023</div>
                  <div className='text-verySmall-1'>Students : 3</div>
                </div>
                <div className='w-1/3 flex justify-center items-center'>
                  <div style={{backgroundImage:`url(${profilePic})`}} className='w-12 h-12 bg-center bg-cover rounded-full'></div>
                </div>
              </div>
          </div>
          <div className='bg-profile-card-color bg-opacity-10 hover:bg-opacity-100 rounded-3xl h-1/6 flex justify-center items-center text-sm text-profile-color hover:text-white cursor-pointer'>View More</div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
