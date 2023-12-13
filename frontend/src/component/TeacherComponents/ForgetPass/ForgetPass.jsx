import React, { useState } from 'react';
import {ToastContainer,toast} from 'react-toastify';
import teacherAxios from '../../../Axiox/TeacherAxiox';
import Swal from 'sweetalert2';
import OtpVerification from './Otp';
import Spinner from '../../Spinner/Spinner';

function Forgot() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(false);
  const [loading, setLoading] = useState(false);

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
        position: 'top-center',
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
      setLoading(true);
      const response = await teacherAxios.post('/forgot', { email });
      console.log('Response:', response);

      if (response.data.error) {
        setLoading(false);
        toast.error(response.data.message);
      } else {
        setLoading(false);
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
        });
        setOtp(true);
      }
    } catch (error) {
        setLoading(false);
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? ( // Show spinner if loading is true
        <Spinner />
      ) : (
        <>
          {!otp ? ( // Show content if not OTP
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
            <OtpVerification email={email}  />
          )}
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default Forgot;
