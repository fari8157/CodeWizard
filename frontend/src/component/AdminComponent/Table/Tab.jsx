import React, { useEffect,useState } from 'react';
import adminAxios from '../../../Axiox/AdminAxiox'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Dashboard = () => {

  const [searchInput, setSearch] = useState('');
  const [users, setUsers] = useState([]);
   const [filterdata, setFilterData] = useState([]);
   const [itemsPerPage,setItemsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1);
    const{Token,role}=useSelector((state)=>state.Client)
  

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };
 useEffect(()=>{
  adminAxios.get("/students" ,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':Token,
      'userRole':role,
    }
  }).then((response)=>{
    console.log(response.data);
    setUsers(response.data.students)
  })
 },[setUsers])
  
  
  const handleSearch = (value) => {
    // Implement your search logic here
    console.log(value);
  };

  

  const acessChange = (email,isAccess) => {
    console.log(isAccess);
    adminAxios.put("/updateAccess" ,{email,isAccess},
    {
      headers:{
        'Content-Type':'application/json',
        'Authorization':Token,  
        'userRole':role,
      }
    }).then((response)=>{
      console.log(response.data);
      setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === response.data.email ? { ...user,isAccess: response.data.isAccess } : user
      )
    );
   
    })
   
  };

  return (
    <div className="bg-opacity-50 bg-white text-black p-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-4">
          <div className="flex justify-end items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded-md w-full md:w-64"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <table className="min-w-full divide-y divide-gray-200 mx-auto">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sl No
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Img
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fullname
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{index + 1}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <img src={user.pic} alt="User" className="h-8 w-8 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{user.fullName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{user.userName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className={user.isAccess ? "text-green-600 hover:text-green-900" : "text-red-600 hover:text-red-900"}>{user.isAccess?"Active":"Disable"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {/* Add action buttons here */}
                  <button
                  className={user.isAccess ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                   onClick={() =>acessChange(user.email,user.isAccess)}
                     >
                    {user.isAccess ? "Block" : "Unblock"}
                   </button>
                </td>
                <td className="px-6 py-4 flex justify-center whitespace-nowrap text-center">
                <button
            type="button"
            className="hidden md:flex inline-block rounded-full border border-red-900 text-blue-500 dark:bg-yellow-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal hover:text-white dark:text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-red-900 dark:hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-cyan-600 dark:focus-bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus-outline-none focus-ring-0 active-bg-cyan-700 dark:active-bg-neutral-200 active-shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)]"
          >
            View Details
          </button>
                </td>
              </tr>
             ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
