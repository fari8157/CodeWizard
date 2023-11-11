import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "tailwindcss/tailwind.css";
import userAxios from '../Axiox/UserAxiox';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import PasswordReset from "../Pages/ConformPass";

const OtpVerification = ({email}) => {
  const [otpInputs, setOtpInputs] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [otpVerify,setVerify]=useState(false)
  const inputRefs = useRef([]);
 const navigate= useNavigate()
  
  useEffect(() => {
    let interval;

    if (isResending) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isResending]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1);
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);

    if (value !== "") {
      // Move to the next field
      focusNextInput(index);
    } else {
      // Move to the previous field
      focusPrevInput(index);
    }
  };
  console.log(otpInputs);
  const handleResendOtp =async () => {
    const response = await userAxios.post('/resendOtp',{ email});
    if (response.data.error) {
        toast.error(response.data.message);
      }else {
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
        })}
    setTimer(60);
    setIsResending(true);
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otpInputs.join("");
    console.log(enteredOtp);
    try {
        const response = await userAxios.post('/otpVerify',{ enteredOtp,email});
        console.log('Response:', response);
        if (response.data.error) {
            toast.error(response.data.message);
          }else {
            Swal.fire({
              title: 'Success',
              text: response.data.message,
              icon: 'success',
            })
            setVerify(true)
        }
    } catch (error) {
        
    }
    console.log("Verifying OTP:", enteredOtp);
  };

  useEffect(() => {
    if (timer === 0) {
      setIsResending(false);
      setTimer(60);
    }
  }, [timer]);

  const focusNextInput = (index) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const focusPrevInput = (index) => {
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
    {!otpVerify ?(
    <div className="flex justify-center items-center min-h-screen">
        <ToastContainer/>
      <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-md">
        <h2 className="font-bold text-3xl text-[#002D74]" style={{ fontFamily: `'Roboto', sans-serif` }}>
          OTP Verification 🔑
        </h2>
        <p className="text-base mt-4 text-[#002D74]">
          OTP sent to your registered email ✉️
          <br />
          Please check your email
        </p>
        <label className="block text-sm font-medium text-gray-600 mt-4">Enter OTP:</label>
        <div className="flex mt-2 space-x-4">
          {otpInputs.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleOtpChange(e, index)}
              maxLength={1}
              className="w-16 h-16 p-4 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-lg"
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-center items-center space-x-8">
          {isResending ? (
            <>
              <div className="mt-4 flex justify-center items-center space-x-4"></div>
              <p className="text-gray-600">Resend OTP in {timer} seconds</p>
              <button
                onClick={handleVerifyOtp}
                className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none text-xl"
              >
                Verify
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleVerifyOtp}
                className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none text-xl"
              >
                Verify
              </button>
              <button
                onClick={handleResendOtp}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none text-xl"
                disabled={isResending}
              >
                Resend OTP
              </button>
            </>
          )}
        </div>
      </div>
    </div>):(
        <PasswordReset email={email}/>
    )
          }
    </>
  );
};

export default OtpVerification;
