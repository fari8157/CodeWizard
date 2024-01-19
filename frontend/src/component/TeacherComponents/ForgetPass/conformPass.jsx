
import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import teacherAxiox from '../../../Axiox/TeacherAxiox';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PasswordReset({ email }) {
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const [isPassShow, setPassShow] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const navigate=useNavigate()
  const handlePasswordChange = (e) => {
   
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === reEnteredPassword);
    setIsStrongPassword(checkPasswordStrength(e.target.value));
  };

  const handleReEnteredPasswordChange = (e) => {
    setReEnteredPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };
  const checkPasswordStrength = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };
  
const updatePass = async (e) => {
  e.preventDefault();
  if (!isStrongPassword) {
   
    toast.error('Please enter a strong password. It should contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');

    return;
  }

  try {
    Swal.fire({
      title: 'Updating Password',
      text: 'Please wait...',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      showCancelButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });

    const response = await teacherAxiox.post('/updatePassword', { password, email });
    console.log('Response:', response);

    if (response.data.error) {
      Swal.close()
      Swal.fire({
        title: 'Error',
        text: response.data.message,
        icon: 'error',
      });
    } else {
      Swal.close()
      Swal.fire({
        title: 'Success',
        text: response.data.message,
        icon: 'success',
      });

      
      setPassword('');
      setReEnteredPassword('');
      navigate('/');
    }
  } catch (error) {
    Swal.close()
    console.error('Error updating password:', error);
    Swal.fire({
      title: 'Error',
      text: 'An error occurred while updating the password. Please try again later.',
      icon: 'error',
    });
  }
};


  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center pb-5 mb-5">
      <div className="max-w-3xl w-full p-4 md:p-8">
        <div className="bg-white rounded-lg p-8 shadow-md">
          <h2 className="font-bold text-3xl text-[#002D74] mb-5" style={{ fontFamily: `'Roboto', sans-serif`, }}>Reset Password 🔏</h2>

          <form className="w-full flex flex-col gap-4">
            <div className="relative">
              <input
                className="p-3 rounded-xl border w-full"
                type={isPassShow ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {isPassShow ? (
                <BsEyeSlash
                  onClick={() => setPassShow(false)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
                />
              ) : (
                <BsEye
                  onClick={() => setPassShow(true)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
                />
              )}
            </div>

            <div className="relative">
              <input
                className="p-3 rounded-xl border w-full"
                type={isPassShow ? 'text' : 'password'}
                name="rePassword"
                placeholder="ReEnter Password"
                value={reEnteredPassword}
                onChange={handleReEnteredPasswordChange}
                required
              />
              {isPassShow ? (
                <BsEyeSlash
                  onClick={() => setPassShow(false)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
                />
              ) : (
                <BsEye
                  onClick={() => setPassShow(true)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
                />
              )}
            </div>
             
            {!passwordsMatch && (
              <p className="text-red-500">Passwords do not match. </p>
            )}
             {!isStrongPassword && (
              <p className="text-red-500 mb-2">Please enter a strong password. It should contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.</p>
            )}

            <button
              className={`bg-[#002D74] rounded-xl text-white py-3 hover:scale-105 duration-300 text-xl ${passwordsMatch ? '' : 'cursor-not-allowed opacity-50'}`}
              disabled={!passwordsMatch} onClick={updatePass}
            >
              Update
            </button>
          </form>
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default PasswordReset;
