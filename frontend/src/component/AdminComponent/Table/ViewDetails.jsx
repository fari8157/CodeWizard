import React from "react";
import { FaMailBulk, FaPhone } from "react-icons/fa";
import ProfileIcon from "../../TeacherComponents/Profile/ProfileIcon";
import TransactionTable from "../../UserComponent/TransactionTable/Table";

const dummyTransactionData = [
  {
    _id: '61125f601e3f8d2408a1e1a0',
    created: '2023-09-01T12:00:00Z',
    course_id: { courseName: 'Dummy Course 1' },
    teacher_id: { fullName: 'John Doe' },
    amount: 50,
  },
  {
    _id: '61125f601e3f8d2408a1e1a1',
    created: '2023-09-05T12:00:00Z',
    course_id: { courseName: 'Dummy Course 2' },
    teacher_id: { fullName: 'Jane Smith' },
    amount: 75,
  },
  // Add more dummy data objects as needed
];

const profilePic =
  "https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A74af890a-f81d-4b6b-9d70-61117d5ef84e?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300">
      <div className="container mx-auto flex items-center justify-center">
        <div className="w-full md:w-3/4 bg-white md:rounded-lg overflow-hidden shadow-lg">
          <div className="bg-profile-card-color h-1/3 flex items-center justify-center">
            <div
              style={{ backgroundImage: `url(${profilePic})` }}
              className="bg-black bg-cover bg-center w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white"
            ></div>
          </div>
          <div className="bg-white p-6">
            <div className="text-3xl font-semibold mb-2">Maria Historia</div>
            <div className="flex flex-col md:flex-row mb-4">
              <div className="w-full md:w-1/2">
                <ProfileIcon Icon={<FaMailBulk />} title="Email" subtitle="kingkaiser@gmail.com" />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <ProfileIcon Icon={<FaPhone />} title="Phone" subtitle="909876883" />
              </div>
            </div>
           
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
              <div className="flex justify-center items-center">
                <h1 className="text-3xl font-bold">Transactions</h1>
              </div>
              
           
      <div className="flex justify-center items-center">
                <table className=" divide-gray-200 border-2 border-gray-400 bg-black text-white">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase ">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Course Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Teacher Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-black divide-y divide-gray-200">
                    {dummyTransactionData.map((trans, index) => {
                      const createdDate = new Date(trans.created);
                      const options = { year: 'numeric', month: 'long', day: 'numeric' };
                      const formattedDate = createdDate.toLocaleDateString(undefined, options);
                      const last10Digits = trans._id.slice(-10);
                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{formattedDate}</td>
                          <td className="px-6 py-4">{last10Digits}</td>
                          <td className="px-6 py-4">{trans.course_id?.courseName}</td>
                          <td className="px-6 py-4">{trans.teacher_id?.fullName}</td>
                          <td className="px-6 py-4">{trans.amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              </div>
    </div>
  );
};

export default Profile;
