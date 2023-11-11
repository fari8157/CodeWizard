// import React from 'react';
// import "./Profile.css"

// const ProfileNavbar = () => {
//   return (
//     <nav className="">
//         <div className="text-black p-4 flex flex-col items-center justify-center">
//       <div className="w-20 h-20 border-2 border-white rounded-full mb-2 flex justify-center  gap-3 ">
//         <img src="logo2.png" alt="Profile" className="w-full h-full object-cover border border-green-500 border-2" />
//         <div className='flex justify-center items-center'>

//         <h1 className='w-[120px]'>salmanul faris c</h1>
//         </div>
//         <div className="flex items-center space-x-2 mt-2  justify-center">
//           <button className="border border-white p-1 text-sm text-center bg-green-400 rounded-full px-3">Change</button>
//           <button className="border border-white p-1 text-sm text-center bg-red-400 rounded-full px-3">Remove</button>
//         </div>
//       </div>
//         <div className='border border-b   w-full'>

//         </div>
//         <div className="lg:flex items-center gap-8 space-x-4 hidden mt-3">
//           <span className="text-black  dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold ">

//           <span className="link  link-underline link-underline-normal dark:link-underline-dark"> About </span>
//           </span>
//           <span className="text-black dark:text-blue-600 hover:text-gray-300 dark:hover-text-red-200 font-semibold">
//          <span className="link link-underline link-underline-normal dark:link-underline-dark"> My-Enrollments </span> 
//           </span>
//           <span className="text-black dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold">
//            <span className="link link-underline link-underline-normal dark:link-underline-dark"> MY-Blogs </span>
//           </span>

//         </div>
//        </div>


//         </nav>
//   );
// };

// export default ProfileNavbar;
// import React from 'react';

// const ProfilePage = () => {
//   return (
//     <div>
//     <div className="bg-blue-950 min-h-screen flex justify-center items-center h-5">
//       <div className="relative w-64 h-64 rounded-full overflow-hidden bg-yellow-400">
//         <div className="absolute w-1/2 h-full top-0 right-0 bg-red-400"></div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ProfilePage;
// import React from 'react';
// import Tippy from 'tippy.js';
// import Navbar from '../NavBar/Nav2';
// import 'tippy.js/dist/tippy.css'; // Import Tippy CSS
// import 'tippy.js/themes/light.css'; // Import a Tippy theme

// class ProfileCard extends React.Component {
//     componentDidMount() {
//         // Initialize tooltips
//         Tippy('.link', {
//             placement: 'bottom',
//         });
//     }


    import React,{useEffect, useState} from 'react';
    import { FiEdit } from 'react-icons/fi';
    import ChangePasswordModal from '../../Modal/ChangePassModal';
import { useSelector } from 'react-redux';
import userAxios from '../../../Axiox/UserAxiox';

    
    const ProfileCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData,setUserData]= useState("")
  const {Token,role}= useSelector((state)=>state.Client)
  useEffect(() => {
    
    console.log(Token,role);
    if (Token && role) {
      userAxios.get('/profileDetail', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Token,
          'userRole': role,
        }
      })
      .then((response) => {
        // Handle the response here
        console.log(response.data);
        setUserData(response.data.userData)
      })
      .catch((error) => {
        console.error('Error fetching profile details:', error);
      });
    } else {
      console.log('Token or role not found');
    }
  }, []);







  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
      return (
        <>
        
          <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover">
            <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
              <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
                <div className="p-4 md:p-12 text-center lg:text-left">
                <div
                      className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${userData.pic})` }} >
                                                                           
                    <div className="absolute top-2 right-2">
                      <FiEdit className="text-blue-500 text-2xl hover:text-blue-700" />
                    </div>
                  </div>
    
                  <h1 className="text-3xl font-bold pt-8 lg:pt-0">{userData.fullName}</h1>
    
                  <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                  <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                    <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M21,4H3A2,2 0 0,0 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6A2,2 0 0,0 21,4M21,6L12,11L3,6H21M3,18V8L12,13L21,8V18H3Z" />
                    </svg>
                  {userData.email}
                  </p>
    
                  <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                    <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 0a7.44 7.44 0 0 1 5.3 2.2 7.48 7.48 0 0 1 2.2 5.3c0 4-3.4 7.2-7.5 7.2S2.5 11.5 2.5 7.3 5.9 0 10 0zM10 18c-4.9 0-9-3.9-9-9s4.1-9 9-9 9 3.9 9 9-4.1 9-9 9z"></path>
                      <path d="M10 4.2a4.8 4.8 0 0 0-4.8 4.8c0 2.7 2.2 4.8 4.8 4.8s4.8-2.2 4.8-4.8-2.2-4.8-4.8-4.8zm0 8.6a3.8 3.8 0 0 1-3.8-3.8 3.8 3.8 0 0 1 3.8-3.8 3.8 3.8 0 0 1 3.8 3.8 3.8 3.8 0 0 1-3.8 3.8z"></path>
                    </svg>
                    Username: {userData.userName}
                  </p>
                  <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                    <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M10 0a7.44 7.44 0 0 1 5.3 2.2 7.48 7.48 0 0 1 2.2 5.3c0 4-3.4 7.2-7.5 7.2S2.5 11.5 2.5 7.3 5.9 0 10 0zM10 18c-4.9 0-9-3.9-9-9s4.1-9 9-9 9 3.9 9 9-4.1 9-9 9z"></path>
                      <path d="M10 4.2a4.8 4.8 0 0 0-4.8 4.8c0 2.7 2.2 4.8 4.8 4.8s4.8-2.2 4.8-4.8-2.2-4.8-4.8-4.8zm0 8.6a3.8 3.8 0 0 1-3.8-3.8 3.8 3.8 0 0 1 3.8-3.8 3.8 3.8 0 0 1 3.8 3.8 3.8 3.8 0 0 1-3.8 3.8z"></path>
                    </svg>
                    Phone: {userData.phoneNumber}
                  </p>
    
                   <ChangePasswordModal isOpen={isModalOpen} onRequestClose={closeModal} /> 
                  <div className="pt-12 pb-8 flex justify-between">
                    <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"  onClick={openModal}>Change password</button>
                    <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">Edit details</button>
                    
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-semibold'>My-Courses</p>
                    <span>My-Blogs</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-2/5">
              <FiEdit className="text-blue-500 text-2xl hover:text-blue-700  hidden lg:block"   />
                <img src={userData.pic} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" alt="Profile" />
              </div>
            </div>
          </div>
        </>
      );
    }
    
    export default ProfileCard;
    