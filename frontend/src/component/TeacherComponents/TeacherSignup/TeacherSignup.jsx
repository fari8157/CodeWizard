import React, { useState } from "react";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Navbar from "../../UserComponent/NavBar/Nav2";
import teacherAxiosInstance from "../../../Axiox/TeacherAxiox";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Spinner from "../../Spinner/Spinner";

const Signup = () => {
  const navigate=useNavigate()
  const [isPassShow, setPassShow] = useState(false);
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bankAccNumber: "",
    ifcCode: "",
    lastQualification: "",
    password: "",
    rePassword: "",
    idProof: null,
    qualificationCertificate: null,
  });

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload an image file (JPEG, PNG, GIF).');
      e.target.value = '';
      return;
    }

    // Check the name attribute to update the correct field in formData
    if (e.target.name === 'idProof') {
      setFormData({
        ...formData,
        idProof: file
      });
    } else if (e.target.name === 'qualificationCertificate') {
      setFormData({
        ...formData,
        qualificationCertificate: file
      });
    }
  };

  const handlePasswordToggle = () => {
    setPassShow(!isPassShow);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
  
    // Check if passwords match
    if (formData.password !== formData.rePassword) {
      alert('Passwords do not match');
      return;
    }
  
    const requiredFields = [
      'fullName',
      'email',
      'phoneNumber',
      'bankAccNumber',
      'ifcCode',
      'lastQualification',
      'password',
      'rePassword'
      // Add other field names here
    ];
    
    const trimmedFormData = {};
    for (const key in formData) {
      if (typeof formData[key] === 'string') {
        trimmedFormData[key] = formData[key].trim();
      } else {
        trimmedFormData[key] = formData[key];
      }
    }
    
    const emptyFields = [];
    for (const key of requiredFields) {
      if (typeof trimmedFormData[key] === 'string' && !trimmedFormData[key]) {
        emptyFields.push(key);
      }
    }
    
    if (emptyFields.length > 0) {
      const errorMessage = `Please fill in the following fields: ${emptyFields.join(', ')}`;
      alert(errorMessage);
      return;
    }
    
    
    
  
    const teacherData = trimmedFormData;
    console.log(teacherData);
  
    try {
      setLoading(true);
      const response = await teacherAxiosInstance.post('/register', teacherData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
  
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
      console.error('Error occurred during form submission:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
    {loading ?<Spinner/> :( 
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-5">
        <div className="max-w-screen-xl w-full flex items-center flex-col md:flex-row">
          {/* Left Side with Image */}
          <div className="w-full md:w-1/2 p-4 hidden md:block">
            <div className="rounded-lg shadow-sm ">
              <img
                className="w-full h-auto"
                src="/teach.svg"
                alt="Signup Image"
              />
            </div>
          </div>
         <ToastContainer/>
          {/* Right Side with Input Fields */}
          <div className="w-full md:w-1/2 p-4">
            <h2 className="font-bold text-2xl md:text-3xl text-[#002D74] dark:text-blue-400">Teacher Registration</h2>
            <div className="mt-2 text-sm py-1 text-[#002D74] dark:text-blue-400">

              <span className="mr-2 font-semibold text-[#1f3e71] dark:text-blue-400">Register as Student?</span>

              <Link to="/register">
                <span className="underline font-bold">click here</span>
              </Link>
            </div>
            {/* Additional fields */}
            <form className="flex flex-col gap-3" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <input
                  className="p-3 rounded-lg border dark:bg-gray-900"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  placeholder="Fullname"
                  onChange={handleChangeForm}
                  required
                />
                <input
                  className="p-3 rounded-lg border dark:bg-gray-900"
                  type="text"
                  name="email"
                  value={formData.email}
                  placeholder="email"
                  onChange={handleChangeForm}
                  required
                />
                <input
                  className="p-3 rounded-lg border dark:bg-gray-900"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  placeholder="Phone Number"
                  onChange={handleChangeForm}
                  required
                />
                <input
                  className="p-3 rounded-lg border dark:bg-gray-900"
                  type="text"
                  name="bankAccNumber"
                  value={formData.bankAccNumber}
                  placeholder="Bank Account Number"
                  onChange={handleChangeForm}
                  required
                />
                <input
                  className="p-3 rounded-lg border dark:bg-gray-900"
                  type="text"
                  name="ifcCode"
                  value={formData.ifcCode}
                  placeholder="IFC Code"
                  onChange={handleChangeForm}
                  required
                />
                <input
                  className="p-3 rounded-lg border dark:bg-gray-900"
                  type="text"
                  name="lastQualification"
                  value={formData.lastQualification}
                  placeholder="Highest Qualification"
                  onChange={handleChangeForm}
                  required
                />
              </div>
              <div className="relative">
                <input
                  className="p-4 rounded-xl border w-full dark:bg-gray-900"
                  type={isPassShow ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChangeForm}
                  required
                />
                {!isPassShow ? (
                  <BsEye
                    onClick={handlePasswordToggle}
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
                  />
                ) : (
                  <BsEyeSlash
                    onClick={handlePasswordToggle}
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
                  />
                )}
              </div>
              <div className="relative">
                <input
                  className="p-4 rounded-xl border w-full dark:bg-gray-900"
                  type={isPassShow ? 'text' : 'password'}
                  name="rePassword"
                  placeholder="ReEnter Password"
                  value={formData.rePassword}
                  onChange={handleChangeForm}
                  required
                />
                {!isPassShow ? (
                  <BsEye
                    onClick={handlePasswordToggle}
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
                  />
                ) : (
                  <BsEyeSlash
                    onClick={handlePasswordToggle}
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
                  />
                )}
              </div>
             
              <div className="p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center">
                  <input
                    className='border-none text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4 file:rounded-md
                    file:border-0 file:text-sm file:font-semibold
                    file:bg-pink-50 file:text-pink-700
                    hover:file:bg-pink-100'
                    type="file"
                    name="idProof"
                    accept="image/jpeg, image/png, image/gif" 
                    onChange={handleFileChange}
                    required
                  />
                  <span className="md:ml-4 sm:mt-2 dark:text-white">Attach ID Proof (Image)</span>
                </div>
            
                <div className="p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center">
                  <input
                    className='border-none text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4 file:rounded-md
                    file:border-0 file:text-sm file:font-semibold
                    file:bg-pink-50 file:text-pink-700
                    hover:file:bg-pink-100 '
                    type="file"
                    name="qualificationCertificate"
                    accept="image/jpeg, image/png, image/gif" 
                    onChange={handleFileChange}
                    required
                  />
                  <span className="sm:mt-2 dark:text-white">Highest Qualification Certificate (Image)</span>
                </div>


              <button className="bg-[#002D74] mt-3 rounded-lg text-white py-3 hover:scale-105 duration-300 dark:bg-blue-400">
                Register
              </button>
            </form>
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
      </section>)}
    </>
  );
};

export default Signup;
