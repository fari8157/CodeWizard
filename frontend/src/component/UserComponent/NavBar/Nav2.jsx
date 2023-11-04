import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import './NavBar.css'
import { themeActions } from "../../../store/them_slice";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const isLoggedIn = false; // Set this to true if the user is logged in
  // const isDarkMode = useSelector((state)=> state.theme.isDarkMode);
  const {isDarkMode} = useSelector((state)=> state.theme);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleThemeToggle = () => {
    dispatch(themeActions.toggleTheme())
  };

  const registerHandler = () => {
    // Implement registration logic here
  }

  const loginHandler = () => {
    // Implement login logic here
  }

  const logoutHandler = () => {
    // Implement logout logic here
  }
useEffect(() => {
    // Add the 'dark' class to the HTML's documentElement when dark mode is active
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  return (
    <nav className={` flex justify-between dark:bg-gray-900 bg-gray-100 p-4 shadow-lg z-50 border-b w-full`}>
      <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
          <img src="public/logo2.png" alt="Logo" className="h-8 w-8 object-cover" />
          <span className="dark:text-blue-400 text-blue-950 lg:text-2xl md:1xl  font-bold">CodeWizard</span>

        </div>     
        <span to="/" className="dark:text-blue-400 text-blue-950 text-2xl  font-bold ">
          
        </span>
        <div className="lg:flex gap-8 space-x-4 hidden">
          <span className="text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold ">
            <span className="link link-underline link-underline-normal dark:link-underline-dark"> Home </span>
          </span>
          <span className="text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover-text-red-200 font-semibold">
            <span className="link link-underline link-underline-normal dark:link-underline-dark"> Course </span>
          </span>
          <span className="text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold">
            <span className="link link-underline link-underline-normal dark:link-underline-dark"> About Us </span>
          </span>
          <span className="text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold">
            <span className="link link-underline link-underline-normal dark:link-underline-dark"> Blog </span>
          </span>
          <span className="text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-red-200 font-semibold">
            <span className="link link-underline link-underline-normal dark:link-underline-dark"> Profile </span>
          </span>
        </div>
        <div className="flex gap-3">

        
        <div className=" space-x-4 flex items-center text-blue-600 dark:text-blue-400">
          <button onClick={handleThemeToggle}>
            {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>

          {!isLoggedIn && (
            <button
              type="button"
              onClick={registerHandler}
              className="hidden md:flex inline-block rounded-full bg-cyan-700 dark:bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white dark:text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-cyan-600 dark:hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-cyan-600 dark:focus-bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus-outline-none focus-ring-0 active-bg-cyan-700 dark-active-bg-neutral-200 active-shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark-shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark-hover-shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark-focus-shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark-active-shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
            >
              <span className="flex items-center gap-1">register <FaRegUser /></span>
            </button>
          )}

          <button
            type="button"
            onClick={isLoggedIn ? logoutHandler : loginHandler}
            className=" hidden md:flex inline-block rounded-full bg-cyan-800 dark-bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white dark-text-neutral-800 shadow-[0_4px_9px_-4px_#54b4d3] transition-duration-150 ease-in-out hover-bg-cyan-600 dark-hover-bg-neutral-100 hover-shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus-bg-cyan-600 dark-focus-bg-neutral-100 focus-shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus-outline-none focus-ring-0 active-bg-cyan-700 dark-active-bg-neutral-200 active-shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark-shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark-hover-shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark-focus-shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark-active-shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
          >
            {isLoggedIn ? 
              <span className="flex items-center gap-1">logout <BiLogOut /></span>
              : 
              <span className="flex items-center gap-1">login <BiLogIn /></span>
            }
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
    className="w-6 h-6 "
    fill="none"
    viewBox="0 0 24 24"
    stroke={isDarkMode ? "blue" : "black"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
) : (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke={isDarkMode ? "blue" : "black"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
)}

          </button>
        </div>
        </div>
       
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full dark:bg-gray-900 bg-gray-100 p-4 rounded-b-md z-10 ">
            <span className="block font-bold text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-5">
              Home
            </span>
            <span className="block font-bold text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-5">
             Course
            </span>
            <span className="block font-bold text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-5">
             About Us
            </span>
            <span className="block font-bold text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-5">
              Blog
            </span>
            <span className="block font-bold text-blue-400 dark:text-blue-600 hover:text-gray-300 dark:hover:text-blue-200 my-5">
              Profile
            </span>
            <div className="flex gap-3">
              <button className="bg-yellow-500 px-5 py-2 rounded-lg">Login</button>
              <button className="bg-yellow-500 px-5 py-2 rounded-lg">Register</button>
            </div>
          </div>
        )}
       
      </div>
     
    </nav>
  );
}

export default Navbar;