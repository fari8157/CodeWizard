import React, { useState, useRef } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';


const TeacherLogin = () => {
  const passwordInput = useRef();
  const [isPassShow, setPassShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const anchorRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
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
    setLoading(true);

    // Replace this part with your authentication logic
    // ...

    setLoading(false);

    // Redirect the user after a successful login
    window.location.href = '/'; // Replace with your desired URL
  };

  const signupHandle = () => {
    window.location.href = '/signup'; // Replace with your desired URL
  };

  return (
    <section className="bg-gray-50  dark:bg-gray-900 min-h-screen flex items-center justify-center">
      {loading && <Spinner />} {/* If you have a Spinner component */}
      <div className="max-w-6xl flex flex-col md:flex-row">
        {/* Left Side (Image) - Hidden on Small Screens */}
        <div className="w-full md:w-1/2 p-8 md:p-16 hidden md:block ">
          <img
            className="w-full h-auto"
            src="https://images.unsplash.com/photo-1572715376701-98568319fd0b?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Login Icon"
          />
         
        </div>

        {/* Right Side (Credentials Input) */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h2 className="font-bold text-3xl text-[#002D74]  dark:text-blue-400 ">Teacher Login</h2>
          <p className="text-lg mt-4 text-[#002D74]  dark:text-blue-400 ">If you are already a member, easily log in</p>
          <form action="" className="flex flex-col gap-4" onSubmit={loginHandle}>
            <input className="p-4 rounded-xl border  dark:bg-gray-900" type="text" name="username" placeholder="Username" onChange={handleChangeForm} required />
            <div className="relative">
              <input className="p-4 rounded-xl border w-full  dark:bg-gray-900" type={isPassShow ? "text" : "password"} name="password" placeholder="Password" onChange={handleChangeForm} ref={passwordInput} required />
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
            <a href="/vendor/login" className='underline font-bold'>click here</a>
          </div>

          <div className="mt-5 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-lg">OR</p>
            <hr className="border-gray-400" />
          </div>

        

          <div className="mt-2 text-lg border-b border-[#002D74] py-7 text-[#002D74] text-center  dark:text-blue-400 ">
            <a href="/forgot-password">Forgot your password?</a>
          </div>

          <div className="mt-5 text-lg flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <button onClick={signupHandle} className="py-3 px-6 dark:bg-gray-900 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherLogin;
