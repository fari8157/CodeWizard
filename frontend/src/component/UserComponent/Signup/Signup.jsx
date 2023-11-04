import React, { useState } from "react";
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorFields, setErrorFields] = useState([]);
  const [isPassShow, setPassShow] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    username: "",
    password: "",
    rePassword: ""
  });

  const handleChangeForm = (e) => {
    setIsError(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const registerHandle = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.rePassword) {
      // Handle password mismatch
      return;
    }

    setLoading(true);

    try {
      // Perform registration
      // ...

      setLoading(false);
    } catch (error) {
      // Handle registration error
      // ...
    }
  };

  const passwordShowHandler = () => {
    setPassShow(!isPassShow);
  };

  const fieldBgColor = (field) => {
    return errorFields.includes(field) ? "bg-red-200 placeholder:text-red-900" : "";
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-5">
      <div className="max-w-screen-xl w-full flex items-center flex-col md:flex-row">
        {/* Left Side with Image (Visible on Medium and Larger Screens) */}
        <div className="w-full md:w-1/2 p-4 hidden md:block">
          <div className="rounded-lg shadow-sm p-10">
            <img
              className="w-full h-auto"
              src="public/logo2.png"
              alt="Signup Image"
            />
          </div>
        </div>

        {/* Right Side with Input Fields */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="font-bold text-2xl md:text-3xl text-[#002D74] dark:text-blue-400">Student Registration</h2>
          <div className="mt-2 text-sm py-1 text-[#002D74] dark:text-blue-400">
            <span className="mr-2 font-semibold text-[#1f3e71] dark:text-blue-400">Register as Teacher?</span>
            <a href="/vendor/signup" className="underline font-bold">click here</a>
          </div>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <input
                className={`p-3 rounded-lg border ${fieldBgColor("fullname")} dark:bg-gray-900`}
                type="text"
                name="fullname"
                placeholder={`${fieldBgColor("fullname") ? "Invalid Fullname" : "Fullname"} `}
                onChange={handleChangeForm}
                required
              />
              <input
                className={`p-3 rounded-lg border ${fieldBgColor("mobile")}  dark:bg-gray-900`}
                type="text"
                name="mobile"
                placeholder={`${fieldBgColor("mobile") ? "Invalid Mobile" : "Mobile"} `}
                onChange={handleChangeForm}
                required
              />
              <input
                className={`p-3 rounded-lg border ${fieldBgColor("email")} dark:bg-gray-900`}
                type="email"
                name="email"
                placeholder={`${fieldBgColor("email") ? "Invalid Email" : "Email"} `}
                onChange={handleChangeForm}
                required
              />
              <input
                className={`p-3 rounded-lg border ${fieldBgColor("username")} dark:bg-gray-900`}
                type="text"
                name="username"
                placeholder={`${fieldBgColor("username") ? "Invalid Username" : "Username"} `}
                onChange={handleChangeForm}
                required
              />
            </div>
            <div className="relative p-3 rounded-lg border dark:bg-gray-900">
              <input
              className=' dark:bg-gray-900'
                type={isPassShow ? "text" : "password"}
                name="password"
                placeholder={`${fieldBgColor("password") ? "Invalid Password" : "Password"}  `}
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
            <div className="relative p-3 rounded-lg border dark-bg-gray-900">
              <input
               className=' dark:bg-gray-900'
                type={isPassShow ? "text" : "password"}
                name="rePassword"
                placeholder={`${fieldBgColor("rePassword") ? "Invalid ReEnter Password" : "ReEnter Password"}  `}
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
          
            <button className="bg-[#002D74] mt-3 rounded-lg text-white py-3 hover:scale-105 duration-300 dark:bg-blue-400">
              Register
            </button>
          </form>
          <div className="mt-6 items-center text-gray-400">
            <hr className="border-gray-400" />
          </div>
          <div className="mt-3 text-sm flex flex-col md:flex-row justify-between items-center text-[#002D74] dark-text-blue-400">
            <p>Already have an account?</p>
            <button className="py-3 px-6 bg-white border rounded-lg hover:scale-110 duration-300   dark:bg-gray-900">
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
