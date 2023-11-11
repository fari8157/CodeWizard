import React, { useState } from 'react';
import Modal from 'react-modal';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import userAxios from '../../Axiox/UserAxiox';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Add custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px', // Set the width
    height: '350px', // Set the height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center align the content
  },
};

function ChangePasswordModal({ isOpen, onRequestClose }) {
  const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = useState(false);
  const [isPassShow, setPassShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const {Token,role}= useSelector((state)=>state.Client)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
   const {email}=useSelector((state)=>state.Client)
   const navigate=useNavigate()
  const handleVerify = async () => {
    try {
      console.log(currentPassword);
  
      const response = await userAxios.post('/verifyPass', 
        { currentPassword }, // Pass data as the first argument
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Token,
            'userRole': role,
          }
        }
      );
  
      console.log(response);
  
      if (!response.data.error) {
        // Verification successful
        Swal.fire({
          icon: 'success',
          title: 'Password Verified!',
          text: response.data.message,
        });
        setIsCurrentPasswordVerified(true);
      } else {
        // Verification failed
        Swal.fire({
          icon: 'error',
          title: 'Verification Failed',
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error('Error in handleVerify:', error);
      // Handle error (e.g., show an error message to the user)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'check your password',
      });
    }
  };
  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const passwordShowHandler = () => {
    setPassShow(!isPassShow);
  };
  const handleSubmit= async (e)=>{
    e.preventDefault()
   try {
    if (passwordsMatch) {
      const response = await userAxios.post('/updatePassword', {password, email });
      console.log('Response:', response);
  
      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          icon: 'success',
        });
        setIsCurrentPasswordVerified(false)
        onRequestClose()
    }
   }
   } catch (error) {
    
   }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Change Password Modal"
      style={customStyles} // Apply custom styles
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        < ToastContainer/>
        {isCurrentPasswordVerified ? (
          <>
            <h2 className='font-bold text-3xl text-[#002D74] mb-5'>Update Password</h2>
            <div className="relative " style={{ marginTop: '20px' }}>
              <input
                className="p-3 rounded-xl border w-full"
                type={isPassShow ? 'text' : 'password'}
                placeholder="New Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                onClick={passwordShowHandler}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800"
              >
                {isPassShow ? <BsEyeSlash /> : <BsEye />}
              </span>
            </div>
            <div className="relative " style={{ marginTop: '20px' }}>
              <input
                className="p-3 rounded-xl border w-full"
                type={isPassShow ? 'text' : 'password'}
                placeholder="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <span
                onClick={passwordShowHandler}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800"
              >
                {isPassShow ? <BsEyeSlash /> : <BsEye />}
              </span>
            </div>
            {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button
            
            className="bg-[#002D74] text-white p-3 rounded-xl border w-full px-5 "
            onClick={handleSubmit}
          >
            Confirm 
          </button>
          <button
            onClick={onRequestClose}
            className="bg-red-500 text-white p-3 rounded-xl border w-full px ml-3 "
          >
            Close
          </button>
        </div>
          </>
        ) : (
          <>
            <h2 className='font-bold text-3xl text-[#002D74] mb-5 mt-10 '>Verify Current Password</h2>
            <div className="relative">
            <input
                className="p-3 rounded-xl border w-full px-5"
                type={isPassShow ? 'text' : 'password'}
                placeholder="current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              
              />
              <span
                onClick={passwordShowHandler}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800"
              >
                {isPassShow ? <BsEyeSlash /> : <BsEye />}
              </span>
            </div>
          </>
        )}
      </div>
      {!isCurrentPasswordVerified && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button
            onClick={handleVerify}
            className="bg-[#002D74] text-white p-3 rounded-xl border w-full px-5"
          >
            Verify
          </button>
          <button
            onClick={onRequestClose}
            className="bg-red-500 text-white p-3 rounded-xl border w-full px ml-3"
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  );
}

export default ChangePasswordModal;
