import React, { useState, useRef } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import {teacherAxios} from '../../../Axiox/TeacherAxiox';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { clientLogin } from '../../../store/UserAuth';
import Swal from 'sweetalert2';

const TeacherLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const passwordInput = useRef();
  const [isPassShow, setPassShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const anchorRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  const passwordShowHandler = () => {
    setPassShow(!isPassShow);
  };

  const loginHandle = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: 'Checking',
      text: 'Please wait...',
      icon: '',
      allowOutsideClick: false,
      showConfirmButton: false,
      showCancelButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
    console.log(formData);
   try {
    
    const response =await teacherAxios.post('/login',formData);
    if(response.data.error){
      toast.error(response.data.message)
      
    }else{
     
      dispatch(
        clientLogin({
          token: response.data.token,
          email: response.data.email,
          userName: response.data.userName,
          role: response.data.role
        })
      );
       navigate('/teacher/Dashboard');
    }
   } catch (error) {
    console.error(error);
    toast.error(error.response.data.message);
   }finally{
    Swal.close();
     
   }

  };

  const signupHandle = () => {
    window.location.href = '/register'; // Replace with your desired URL
  };

  return (
    <>
    {loading? <Spinner/>:(
    <section className="bg-gray-50  dark:bg-gray-900 min-h-screen flex items-center justify-center">
     <div className="max-w-6xl flex flex-col md:flex-row">
      <ToastContainer/>
        {/* Left Side (Image) - Hidden on Small Screens */}
        <div className="w-full md:w-1/2 p-8 md:p-16 hidden md:block ">
          <img
            className="w-full h-auto"
            src="/teacher1.png"
            alt="Login Icon"
          />
         
        </div>

        {/* Right Side (Credentials Input) */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h2 className="font-bold text-3xl text-[#002D74]  dark:text-blue-400 ">Teacher Login</h2>
          <p className="text-lg mt-4 text-[#002D74]  dark:text-blue-400 ">If you are already a member, easily log in</p>
          <form action="" className="flex flex-col gap-4" onSubmit={loginHandle}>
            <input className="p-4 rounded-xl border  dark:bg-gray-900" type="text" name="email" placeholder="Email" value={formData.email}   onChange={handleChangeForm} required />
            <div className="relative">
              <input className="p-4 rounded-xl border w-full  dark:bg-gray-900" type={isPassShow ? "text" : "password"} name="password" value={formData.password} placeholder="Password" onChange={handleChangeForm} ref={passwordInput} required />
              {!isPassShow ?
                <BsEye onClick={passwordShowHandler} className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800" />
                :
                <BsEyeSlash onClick={passwordShowHandler} className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800" />
              }
            </div>

            <button className="bg-[#002D74] rounded-xl dark:text-blue-400 text-white py-3 hover:scale-105 duration-300">Login</button>
          </form>

          <div className="mt-2 text-lg py-5  dark:text-blue-400 text-[#002D74] text-center">
            <span className='mr-2 font-semibold dark:text-blue-400 text-[#1f3e71]'>Login as Student ?</span>
            <Link to='/login'>
            <span className='underline font-bold'>click here</span>
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-lg">OR</p>
            <hr className="border-gray-400" />
          </div>

        

          <div className="mt-2 text-lg border-b border-[#002D74] py-7 text-[#002D74] text-center  dark:text-blue-400 ">
           <Link to='/teacher/forgot'>
           
            <span >Forgot your password?</span>
            </Link>
          </div>

          <div className="mt-5 text-lg flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <button onClick={signupHandle} className="py-3 px-6 dark:bg-gray-900 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
          </div>
        </div>
      </div>
    </section>)}
    </>
  );
};

export default TeacherLogin;
