import React, { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const [dark,setDark]=useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed flex justify-between dark:bg-gray-900 bg-gray-100 p-4 shadow-lg z-50 border-b w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo2.png" alt="Logo" className="h-8 w-8 object-cover" />
            <span className="dark:text-blue-400 text-blue-950  md:1xl font-bold">CodeWizard</span>
          </div>
          <div className="lg:flex gap-2 space-x-6 hidden">
            <span className="text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold  link-underline link-underline-normal dark:link-underline-dark">
            DASHBOARD
            </span>
            <span className="text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold link-underline link-underline-normal dark:link-underline-dark">
            STUDENTS
            </span>
            <span className="text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold link-underline link-underline-normal dark:link-underline-dark">
            TEACHERS
            </span>
            <span className="text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold link-underline link-underline-normal dark:link-underline-dark">
            TEACHERS_REQUEST
            </span>
            <span className="text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold link-underline link-underline-normal dark:link-underline-dark">
            ALL COURSE
            </span>
            <span className="text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold link-underline link-underline-normal dark:link-underline-dark">
            REPORT COURSE
            </span>
            <span className="text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold link-underline link-underline-normal dark:link-underline-dark">
           TRANSACTION
            </span>

            
          </div>
          <div className="flex gap-3">
            <div className="space-x-4 flex items-center text-blue-600 dark:text-blue-400">
              <button >
                { dark? <FiSun size={24} /> : <FiMoon size={24} />}
              </button>
             
              
          
                <button
                  type="button"
                   className="hidden md:flex inline-block rounded-full bg-cyan-800 dark:bg-yellow-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white dark:hover:text-white dark:text-neutral-800 shadow-[0_4px_9px_-4px_#54b4d3] transition-duration-150 ease-in-out hover:bg-cyan-600 dark:hover:bg-cyan-700 hover-shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-cyan-600 dark-focus-bg-neutral-100 focus-shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus-outline-none focus-ring-0 active-bg-cyan-700 dark:active-bg-neutral-200 active-shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)]"
                >
                  <span className="flex items-center gap-1">logout <BiLogOut /></span>
                </button>
           
            </div>
            <div className={`lg:hidden`}>
              <button
                onClick={toggleMenu}
                className="text-blue-4 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200"
              >
                {isMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={isDarkMode ? "blue" : "black"}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                   
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden absolute top-16 left-0 w-full dark:bg-gray-900 bg-gray-100 p-4 rounded-b-md z-10">
              <span className="block font-bold text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover-text-blue-200 my-5">
                DASHBOARD
              </span>
              <span className="block font-bold text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-5">
                STUDENTS
              </span>
              <span className="block font-bold text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-5">
                TEACHERS
              </span>
              <span className="block font-bold text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-5">
                TEACHERS_REQUEST
              </span>
              <span className="block font-bold text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover-text-blue-200 my-5">
                ALL COURSE
              </span>
              <span className="block font-bold text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover-text-blue-200 my-5">
                REPORT COURSE
              </span>
              <span className="block font-bold text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover-text-blue-200 my-5">
                TRANSACTION
              </span>
              {Token ? (
                <button className="bg-yellow-500 px-5 py-2 rounded-lg">
                  Logout
                </button>
              ) : null}
            </div>
          )}
        </div>
      </nav>
      <nav className="flex justify-between dark:bg-gray-900 bg-gray-100 p-4 shadow-lg z-50 border-b w-full h-14"></nav>
    </>
  );
}

export default Navbar;
