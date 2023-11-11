import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import userAxios from '../../../Axiox/UserAxiox';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import AnimationWindow from '../Animated';
import GoogleLogin from "../../Google/GoogleLogin"
import { useDispatch, useSelector } from 'react-redux';
import { clientLogin } from '../../../store/UserAuth';


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const passwordInput = useRef();
  const [isPassShow, setPassShow] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [showAnimation, setShowAnimation] = useState(false);
  const client=useSelector((state)=>state.Client) 

  
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordShowHandler = () => {
    setPassShow(!isPassShow);
  };

 const loginHandle = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    console.log('Form Data:', formData);

    const response = await userAxios.post('/login', formData);
    console.log('Response:', response);

    if (response.data.error) {
      toast.error(response.data.message);
    } else {
      Swal.fire({
        title: 'Success',
        text: response.data.message,
        icon: 'success',
      }).then(() => {
        if (response.data.isAdmin) {
          dispatch(
            clientLogin({
              token: response.data.token,
              email: response.data.email,
              userName: response.data.userName,
              role: response.data.role,
              isAdmin: response.data.isAdmin
            })
          );
          navigate('/admin/dashbord');
        } else {
          dispatch(
            clientLogin({
              token: response.data.token,
              email: response.data.email,
              userName: response.data.userName,
              role: response.data.role
            })
          );
          console.log(client);
          navigate('/');
        }
      });
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.message);
  }
};




  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center ">
      <div className="max-w-6xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8 md:p-16 hidden md:block">
          <ToastContainer />
          <img className="w-full h-auto" src="public/logo2.png" alt="Login Icon" />
          <p className="text-lg text-[#002D74] dark:text-blue-400 mt-4 font-bold text-center">
            Learn To Code Like Magic
          </p>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h2 className="font-bold text-3xl text-[#002D74] dark:text-blue-400">Login</h2>
          <p className="text-lg mt-4 text-[#002D74] dark:text-blue-400">If you are already a member, easily log in</p>
          <form action="" className="flex flex-col gap-4" onSubmit={loginHandle}>
            <input
              className="p-4 rounded-xl border dark:bg-gray-900"
              type="text"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChangeForm}
              required
            />
            <div className="relative">
              <input
                className="p-4 rounded-xl border w-full dark:bg-gray-900"
                type={isPassShow ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChangeForm}
                ref={passwordInput}
                required
              />
              {!isPassShow ? (
                <BsEye
                  onClick={passwordShowHandler}
                  className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
                />
              ) : (
                <BsEyeSlash
                  onClick={passwordShowHandler}
                  className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
                />
              )}
            </div>

            <button className="bg-[#002D74] rounded-xl dark:text-blue-400 text-white py-3 hover:scale-105 duration-300">
              Login
            </button>
          </form>

          <div className="mt-2 text-lg py-5 dark:text-blue-400 text-[#002D74] text-center">
            <span className="mr-2 font-semibold dark:text-blue-400 text-[#1f3e71]">Login as Teacher ?</span>
            <a href="" className="underline font-bold">
              click here
            </a>
          </div>

          <div className="mt-5 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-lg">OR</p>
            <hr className="border-gray-400" />
          </div>
          <button
        
  className="dark:bg-gray-900  py-3 w-full rounded-xl mt-5 flex justify-center items-center text-lg hover:scale-105 duration-300"
>
  {/* <FcGoogle className="mr-4 w-8 h-8" /> */}
  <GoogleLogin/>
  
  
</button>

          <div className="mt-2 text-lg border-b border-[#002D74] py-7 text-[#002D74] text-center dark:text-blue-400">
            <Link to='/forgotPassword'>   Forgot your password?</Link> 
          </div>

          <div className="mt-5 text-lg flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <Link to="/register">
              <button className="py-3 px-6 dark:bg-gray-900 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
            </Link>
          </div>
        </div>
      </div>
      {/* {showAnimation && <AnimationWindow />} */}
    </section>
  );
};

export default Login;
