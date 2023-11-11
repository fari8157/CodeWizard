import React, { useRef, useState, useEffect } from "react";
import toast from 'react-hot-toast';
function Otp() {
 

  const [otpInput, setOtpInput] = useState({
    one: "",
    two: "",
    three: "",
    four: ""
  });

  const [resendTimer, setResendTimer] = useState(60); // Initial timer value in seconds
  const [isResending, setIsResending] = useState(false);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isResending && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => {
        clearTimeout(timer);
      };
    } else if (isResending && resendTimer === 0) {
      setIsResending(false); // Set isResending to false when the timer is complete.
    }
  }, [isResending, resendTimer]);  
 
    const handleOtpChangeHandler = (e) => {
        setIsError(false);
        if (e.target.value.length > 1 || !/^[0-9]$/.test(e.target.value)) {
          e.target.value = e.target.value.slice(0, -1);
          return;
        }
        if (e.target.value.length === 1 && /^[0-9]$/.test(e.target.value)) {
          setOtpInput({
            ...otpInput,
            [e.target.name]: e.target.value
          });
          console.log(otpInput);
          const inputNames = ["one", "two", "three", "four"];
          const currentIndex = inputNames.indexOf(e.target.name);
          if (currentIndex < 3) {
            const nextInputName = inputNames[currentIndex + 1];
            inputRef.current.querySelector(`[name=${nextInputName}]`).focus();
          }
        }
      };
      useEffect(() => {
        const handleArrowKey = (e) => {
          const inputNames = ['one', 'two', 'three', 'four'];
          const currentIndex = inputNames.indexOf(e.target.name);
    
          if (e.key === 'ArrowLeft' && currentIndex > 0) {
            const prevInputName = inputNames[currentIndex - 1];
            inputRef.current.querySelector(`[name=${prevInputName}]`).focus();
          } else if (e.key === 'ArrowRight' && currentIndex < 3) {
            const nextInputName = inputNames[currentIndex + 1];
            inputRef.current.querySelector(`[name=${nextInputName}]`).focus();
          }
        };
    
        const inputs = inputRef.current.querySelectorAll('input');
    
        inputs.forEach((input) => {
          input.addEventListener('keydown', handleArrowKey);
        });
    
        return () => {
          inputs.forEach((input) => {
            input.removeEventListener('keydown', handleArrowKey);
          });
        };
      }, []);
  
      const handleVerify = () => {
        const isOtpComplete = Object.values(otpInput).every(value => /^\d$/.test(value));
      
        if (isOtpComplete && Object.values(otpInput).join('').length === 4) {
          toast.success('OTP verified successfully');
        } else {
          toast.error('Please enter a complete 4-digit OTP');
        }
      };
      
      
      
      

  const handleResendOtp = () => {
    // Add your resend OTP logic here

    // Set the timer back to 60 seconds
    setResendTimer(60);
    setIsResending(true);
  };

  return (
    
    <section className="min-h-screen flex items-center justify-center pb-5">
      <div className="max-w-3xl">
        <div className="bg-gray-200 p-8 rounded-lg shadow-md">
          <h2 className="font-bold text-3xl text-[#002D74]" style={{ fontFamily: `'Roboto', sans-serif` }}>OTP Verification 🔑</h2>
          <p className="text-base mt-4 text-[#002D74]">OTP sent to your registered email ✉️
            <br />
            Please check your email</p>
          <form action="" className="flex flex-col gap-4" ref={inputRef}>
            <div className="flex flex-row gap-4">
              <input
                className={`p-4 rounded-xl text-center border font-bold border-gray-500 focus:bg-violet-200`}
                style={{ width: "60px", fontFamily: `'Orbitron', sans-serif`, caretColor: 'transparent' }}
                type="text"
                inputMode="numeric"
                name="one"
                value={ setOtpInput.one}
                placeholder="-"
                onChange={handleOtpChangeHandler}
                autoFocus
                required
                autoComplete="off"
              />
              <input
                className={`p-4 rounded-xl text-center border font-bold border-gray-500 focus:bg-violet-200`}
                style={{ width: "60px", fontFamily: `'Orbitron', sans-serif`, caretColor: 'transparent' }}
                type="text"
                name="two"
                value={ setOtpInput.two}
                inputMode="numeric"
                placeholder="-"
                onChange={handleOtpChangeHandler}
                required
                autoComplete="off"
              />
              <input
                className={`p-4 rounded-xl text-center border font-bold border-gray-500 focus:bg-violet-200`}
                style={{ width: "60px", fontFamily: `'Orbitron', sans-serif`, caretColor: 'transparent' }}
                type="text"
                inputMode="numeric"
                name="three"
                value={ setOtpInput.three}
                placeholder="-"
                onChange={handleOtpChangeHandler}
                required
                autoComplete="off"
              />
              <input
                className={`p-4 rounded-xl text-center border font-bold border-gray-500 focus-bg-violet-200`}
                style={{ width: "60px", fontFamily: `'Orbitron', sans-serif`, caretColor: 'transparent' }}
                type="text"
                inputMode="numeric"
                name="four" 
                value={ setOtpInput.four}
                placeholder="-"
                onChange={handleOtpChangeHandler}
                required
                autoComplete="off"
              />
            </div>
            <button
              type="button"
              className="bg-[#002D74] rounded-xl text-white py-3 hover:scale-105 duration-300"
              onClick={handleVerify}
            >
              Verify
            </button>
          </form>
          <div className="mt-6 grid grid-cols items-center text-gray-400">
            <hr className="border-gray-400" />
          </div>
          <div className="mt-4 text-base flex justify-between items-center text-[#002D74]">
            <p className="mx-2">{isResending ? `Resend OTP in ${resendTimer} seconds` : "Did not receive OTP?"}</p>
            <button
              onClick={handleResendOtp}
              className="py-3 px-6 bg-white border rounded-xl hover:scale-110 duration-300 cursor-pointer"
              disabled={isResending}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Otp;
