import React from "react";

import { FaMailBulk, FaMailchimp, FaPhone } from "react-icons/fa";
import ProfileIcon from "../../TeacherComponents/Profile/ProfileIcon";
import TransactionTable from "../../UserComponent/TransactionTable/Table";
import TeacherHistory from "./TeacherHistory";
const dummyPayments = [
    {
      _id: '61125f601e3f8d2408a1e1a0',
      user_id: { fullName: 'John Doe' },
      course_id: { courseName: 'Mathematics' },
      amount: 100,
      isTeacherPay: true,
    },
    {
      _id: '61125f601e3f8d2408a1e1a1',
      user_id: { fullName: 'Jane Smith' },
      course_id: { courseName: 'Science' },
      amount: 75,
      isTeacherPay: false,
    },
    // Add more dummy payment objects as needed
  ];
  const bankAccount = {
    accountNumber: '1234567890', // Replace with actual account number
    ifscCode: 'ABCD1234567', // Replace with actual IFSC code
  };
const profilePic =
  "https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A74af890a-f81d-4b6b-9d70-61117d5ef84e?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1";

const Profile = () => {
  return (
    <div className="w-screen h-screen+50 md:h-screen overflow-x-hidden  ">
      <div className="w-full h-full bg-gray-300 py-5 px-10 flex flex-col md:flex-row gap-4  items-center justify-center">
        <div className="w-full md:w-3/4 h-full flex flex-col gap-4">
          <div className="h-1/2 flex flex-col relative">
            <div className="bg-profile-card-color h-1/3 rounded-tl-md rounded-tr-md"></div>
            <div className="bg-white h-2/3 rounded-bl-md rounded-br-md">
              <div className="h-1/4 flex justify-end pr-5"></div>
              <div className="h-1/4 pl-5 text-2xl font-semibold flex items-center">
                Maria Historia
                
              
              </div>
              <div className="h-2/4 flex flex-col md:flex-row pl-5">
                <div className="w-1/2 h-full flex items-center">
                  <ProfileIcon
                    Icon={<FaMailBulk />}
                    title="email"
                    subtitle="kingkaiser@gmail.com"
                  />
                </div>
                <div className="w-1/2 h-full flex items-center">
                  <ProfileIcon
                    Icon={<FaPhone />}
                    title="phone"
                    subtitle="909876883"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white w-24 md:w-28 h-24 md:h-28 rounded-full absolute top-14 md:top-8 left-4 flex items-center justify-center">
              <div
                style={{ backgroundImage: `url(${profilePic})` }}
                className="bg-black bg-cover bg-center w-20 md:w-24 h-20 md:h-24 rounded-full "
              ></div>
            </div>
          </div>
          <div className="bg-white h-1/2 rounded-md">
            <div className="h-2/3 flex flex-col justify-center gap-2 pl-5">
                
                <TeacherHistory payments={dummyPayments}/>
              {/* <div className="font-bold">About</div> */}
              {/* <div className="text-sm w-3/4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div> */}
            </div>
            {/* <div className="h-1/3 flex flex-col justify-center gap-2 pl-5">
              <div className="font-semibold text-lg">Expertise:</div>
              <div className="text-sm">Bug Bounty</div>
            </div> */}
           {/* <TeacherHistory payments={dummyPayments}/> */}
          </div>
        </div>
        {/* <div className="bg-grey-500 w-full md:w-1/4 h-1/2 flex flex-col gap-2">
          <div className="bg-white rounded-md h-1/4 flex flex-col justify-center pl-5">
            <div className="text-sm font-semibold capitalize">
              Recent uploads
            </div>
            <div className="text-verySmall">Thursday, 10th April , 2022</div>
          </div>
          <div className="bg-white rounded-md h-2/4">
            <div className="h-1/2 flex flex-col justify-center pl-5">
              <div className="text-sm font-medium">Osint</div>
              <div className="text-verySmall-1">Lessons: 14</div>
            </div>
            <div className="h-1/2 flex">
              <div className="w-2/3 flex flex-col justify-center pl-5">
                <div className="text-verySmall-1">July 20, 2023</div>
                <div className="text-verySmall-1">Students : 3</div>
              </div>
              <div className="w-1/3 flex justify-center items-center">
                <div
                  style={{ backgroundImage: `url(${profilePic})` }}
                  className="w-12 h-12 bg-center bg-cover rounded-full"
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-profile-card-color bg-opacity-10 hover:bg-opacity-100 rounded-3xl h-1/6 flex justify-center items-center text-sm text-profile-color hover:text-white cursor-pointer">
            View More
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
