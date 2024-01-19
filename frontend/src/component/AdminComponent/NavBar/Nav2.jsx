import React, { useState } from "react";
import "./Nav2.css";
import { Spin as Hamburger } from "hamburger-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clientLogout } from "../../../store/UserAuth";




const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const  dispatch=useDispatch()
  // const navigate=useNavigate()
  const logoutHandler = () => {
    dispatch(clientLogout());
    // navigate('/login')
  };


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
    <nav className="navbar fixed w-full z-40">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="logo w-16 md:w-20">
          <img src="" alt="" />
        </div>
        <div className="hidden md:flex space-x-8">
        <Link to='/admin/dashboard'>
          <span className="nav-link">
            DASHBOARD
          </span>
          </Link>
          <Link to='/admin/students'>
          <span  className="nav-link">
            STUDENTS

          </span>
          </Link>
          <Link to='/admin/teachers'>
          <span className="nav-link">
            TEACHERS
          </span>
          </Link>
          <Link to='/admin/teacherApprovel'>
          <span className="nav-link">
            TEACHER REQUEST
          </span>
          </Link>
          <Link to='/admin/categories'>
          <span className="nav-link">
            CATEGORIES
          </span>
          </Link>
          <span className="nav-link">
            ALL COURSE
          </span>
          {/* <span className="nav-link">
            REPORTED COURSE
          </span> */}
          <Link to='/admin/transaction'>
          <span className="nav-link">
            TRANSACTION
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
            STUDENTS
          </span>
          <span className="nav-link">
            TEACHERS
          </span>
          <span className="nav-link">
            TEACHER REQUEST
          </span>
          <span className="nav-link">
            ALL COURSE
          </span>
          <span className="nav-link">
            REPORTED COURSE
          </span>
          <span className="nav-link">
            TRANSACTION
          </span>
          <span className="logbutton signinandsignup ">
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
