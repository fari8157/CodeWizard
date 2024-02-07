import React, { useState  } from "react";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import {userAxios} from '../../../Axiox/UserAxiox';
import Spinner from "../../Spinner/Spinner";

const Signup = () => {
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const [isPassShow, setPassShow] = useState(false);
  const [errorFields, setErrorFields] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    userName: "",
    password: "",
    rePassword: ""
  });

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const isStrongPassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };


  const isEmailValid = (email) => {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const registerHandle = async (event) => {
    event.preventDefault();
    if (
      !formData.fullName.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.email.trim() ||
      !formData.userName.trim() ||
      !formData.password.trim() ||
      !formData.rePassword.trim()
    ) {
      const missingFields = [];
      if (!formData.fullName.trim()) {
        missingFields.push('Full Name');
      }
      if (!formData.phoneNumber.trim()) {
        missingFields.push('Phone Number');
      }
      if (!formData.email.trim()) {
        missingFields.push('Email');
      }
      if (!formData.userName.trim()) {
        missingFields.push('Username');
      }
      if (!formData.password.trim()) {
        missingFields.push('Password');
      }
      if (!formData.rePassword.trim()) {
        missingFields.push('Re-enter Password');
      }
    
      const errorMessage = `The following fields are required: ${missingFields.join(', ')}`;
      toast.error(errorMessage);
      return;
    }
    if (!isStrongPassword(formData.password)) {
      alert('Please enter a strong password. It should contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    if (formData.password !== formData.rePassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!isEmailValid(formData.email)) {
      toast.error('Invalid email format');
      return;
    }

    setLoading(true);

    try {
      const response = await userAxios.post('/register', formData);

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
        }).then(() => {
          navigate('/login');
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const passwordShowHandler = () => {
    setPassShow(!isPassShow);
  };

 

  return (
    <>
    {loading&&<Spinner/>}
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-5">
      <div className="max-w-screen-xl w-full flex items-center flex-col md:flex-row">
      <ToastContainer />
        <div className="w-full md:w-1/2 p-4 hidden md:block">
          <div className="rounded-lg shadow-sm p-10">
            <img
              className="w-full h-auto"
              src="/logo2.png"
              alt="Signup Image"
            />
          </div>
        </div>

        {/* Right Side with Input Fields */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="font-bold text-2xl md:text-3xl text-[#002D74] dark:text-blue-400">Student Registration</h2>
          <div className="mt-2 text-sm py-1 text-[#002D74] dark:text-blue-400">
           
            <span className="mr-2 font-semibold text-[#1f3e71] dark:text-blue-400">Register as Teacher?</span>
           
            <Link to ="/teacher/register">
            <span className="underline font-bold">click here</span>
            </Link>
          </div>
          <form className="flex flex-col gap-3" onSubmit={registerHandle}>
            <div className="flex flex-col gap-3">
              <input
                className={`p-3 rounded-lg border  dark:bg-gray-900`}
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder='fullname'
                onChange={handleChangeForm}
                required
              />
              <input
                className={`p-3 rounded-lg border   dark:bg-gray-900`}
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder='mobile'
                onChange={handleChangeForm}
                required
              />
              <input
                className={`p-3 rounded-lg border  dark:bg-gray-900`}
                type="email"
                name="email"
                value={formData.email}
                placeholder='email'
                onChange={handleChangeForm}
                required
              />
              <input
                className={`p-3 rounded-lg border  dark:bg-gray-900`}
                type="text"
                name="userName"
                value={formData.userName}
                placeholder='username'
                onChange={handleChangeForm}
                required
              />
            </div>
            <div className="relative ">
              <input
                className='p-4 rounded-xl border w-full dark:bg-gray-900'
                type={isPassShow ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder='password'
                onChange={handleChangeForm}
                required
              />
              {!isPassShow ? (
                <BsEye
                  onClick={passwordShowHandler}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-5 h-5 text-gray-500 hover:text-gray-800"
                />
              ) : (
                <BsEyeSlash
                  onClick={passwordShowHandler}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-5 h-5 text-gray-500 hover:text-gray-800"
                />
              )}
            </div>
            <div className="relative ">
              <input
                className='p-4 rounded-xl border w-full dark:bg-gray-900'
                type={isPassShow ? "text" : "password"}
                name="rePassword"
                value={formData.rePassword}
                placeholder='Re-password'
                onChange={handleChangeForm}
                required
              />
              {!isPassShow ? (
                <BsEye
                  onClick={passwordShowHandler}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-5 h-5 text-gray-500 hover:text-gray-800"
                />
              ) : (
                <BsEyeSlash
                  onClick={passwordShowHandler}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-5 h-5 text-gray-500 hover:text-gray-800"
                />
              )}
            </div>
            {formData.password.length !== 0 && formData.password.length < 8 && (
                  <p className="text-red-500 mt-2">
                    Please enter a strong password. It should contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.
                  </p>
                )}
            <button className="bg-[#002D74] mt-3 rounded-lg text-white py-3 hover:scale-105 duration-300 dark:bg-blue-400">
              Register
            </button>
          </form>
          <div className="mt-6 items-center text-gray-400">
            <hr className="border-gray-400" />
          </div>
          <div className="mt-3 text-sm flex flex-col md:flex-row justify-between items-center text-[#2a2a2b] dark:text-blue-400">
            <p>Already have an account?</p>
            <Link to="/login">
              <button className="py-3 px-6 bg-white border rounded-lg hover:scale-110 duration-300 dark:bg-gray-900">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Signup;
