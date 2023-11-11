import React, { useState } from 'react';
import Otp from '../../../Pages/StudentPages/Otp';
import toast, { Toaster } from 'react-hot-toast';
import userAxios from '../../../Axiox/UserAxiox';
import Swal from 'sweetalert2';
import OtpVerification from '../../Test';

function Forgot() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(false);
  const[hashOtp,setHash]=useState('')

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const verifyEmail = (e) => {
    setEmail(e.target.value);
  };

  const sendOtp = async () => {
    if (!isEmailValid(email)) {
      toast.error('Invalid email format!', {
        duration: 3000,
        position: 'top-center', // Fixed typo here
        style: {
          border: '1px solid #4CAF50',
          padding: '16px',
          color: '#4CAF50',
          backgroundColor: '#f2f2f2',
          
        },
      });
      return;
    }

    try {
      console.log(email);
      const response = await userAxios.post('/forgetPassword', {email});
      console.log('Response:', response);

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
         
        });
        setOtp(true)
        // console.log(response.data.hasOtp);
        setHash(response.data.hasOtp)
      
        // setTimeout(() => {
        //   console.log(hashOtp);
        //   console.log('Clearing hasOtp');
        //   setHash("");
        // }, 1 * 60 * 1000);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };
  
  
  return (
    <>
      {!otp ? (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center pb-5">
          <div className="max-w-5xl mx-4 md:mx-auto p-4 md:p-8 rounded-lg shadow-md bg-white">
            <div className="w-full py-2 md:py-6 flex flex-col justify-center items-center">
              <h2 className="font-bold text-3xl text-[#002D74] mb-4" style={{ fontFamily: `'Roboto', sans-serif` }}>
                Forgot Password 🔐
              </h2>
              <p className="text-lg text-[#002D74] mb-8">To reset your password, enter your registered email ✉️</p>
              <form className="w-full mt-2 flex flex-col gap-4">
                <div className="flex flex-row items-center">
                  <input
                    className="flex-grow p-3 rounded-xl border"
                    type="email"
                    name="email"
                    placeholder="Registered Email"
                    onChange={verifyEmail}
                    required
                  />
                  <button
                    type="button"
                    className="bg-[#002D74] p-3 pl-4 rounded-lg text-white hover:scale-105 duration-300 ml-2"
                    onClick={sendOtp}
                  >
                    Send
                  </button>
                </div>
              </form>
              <div className="mt-8 grid grid-cols  items-center text-gray-400">
                <hr className="border-gray-400" />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <OtpVerification email={email} />
      )}
      <Toaster position="top-center" />
    </>
  );
}

export default Forgot;
