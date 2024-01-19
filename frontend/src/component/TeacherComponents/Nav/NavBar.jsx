import React, { useState } from "react";
import "./Nav.css";
import { Spin as Hamburger } from "hamburger-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clientLogout } from "../../../store/UserAuth";




const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const  dispatch=useDispatch()
  const navigate=useNavigate()
  const logoutHandler = () => {
    dispatch(clientLogout());
    navigate('/')
  };


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
    <nav className="navbar fixed w-full z-40 ">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="logo w-16 md:w-20">
          <img src="" alt="" />
        </div>
        <div className="hidden md:flex space-x-8">
          <Link to='/teacher/Dashboard'>
          <span className="nav-link">
            DASHBOARD
          </span>
            </Link>
            <Link to='/teacher/uploadCourse'>
          <span  className="nav-link">
            UPLOAD CLASS
          </span>
          </Link>
          <Link to="/teacher/courses">
          <span className="nav-link">
            MY COURSES
          </span>
          </Link>
          <Link to="/teacher/chat">
          <span className="nav-link">
            CHATS
          </span>
          </Link>
          <Link to='/teacher/profile'>
          <span className="nav-link">
            PROFILE
          </span>
          </Link>
          <Link to='/teacher/payments'>
          <span className="nav-link">
            TRANSACTIONS
          </span>
          </Link>
          
        </div>
        <div className="md:hidden" onClick={toggleMobileMenu}>
        <Hamburger />

        </div>
        {isMobileMenuOpen && (
          <div className="mobile-menu md:hidden flex flex-col gap-5">
             <span className="nav-link">
            DASHBOARD
          </span>
          <span  className="nav-link">
          UPLOAD CLASS
          </span>
          <span className="nav-link">
          MY COURSES
          </span>
          <span className="nav-link">
          CHATS
          </span>
          <span className="nav-link">
          TRANSACTIONS
          </span>
         <span className="logbutton signinandsignup  "  onClick={ logoutHandler}>
            LOGOUT
          </span>
          </div>
        )}
        <div
          className="hidden signinandsignup md:flex space-x-4"
         
        >
          <span  className="logbutton"  onClick={ logoutHandler}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            LOGOUT
          </span>
        </div>
      </div>
    </nav>
    <nav className="navbar  w-full"></nav>
    </>
  );
};

export default Navbar;
