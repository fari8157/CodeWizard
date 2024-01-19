import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import userAxiosInstance from '../../Axiox/UserAxiox';
import Swal from 'sweetalert2';

// Add custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

function EditDetailsModal({ isOpen, onRequestClose, userData, setUserData}) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const {Token,role,userId}=useSelector((state)=>state.Client)
  useEffect(() => {
    // Initialize state based on userData when it changes
    setFullName(userData.fullName || '');
    setUsername(userData.userName || '');
    setPhoneNumber(userData.phoneNumber || '');
  }, [userData]);

  const handleUpdate = () => {
    if (!fullName.trim() || !username.trim() ) {
       Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please provide valid values for all fields',
      });
      return; 
    }
    const editDetails={
      fullName,username,phoneNumber
    }
    console.log('Updating details:', editDetails ,);
    userAxiosInstance.put(`/editProfileDetail/${userId}`,editDetails, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Token,
        'userRole': role,
      }
    })
    .then((response) => {
      if(response.data.error){
        Swal.fire({
          icon: 'failed',
          title: 'Updated',
          text:response.data.message,
        });
        return
      }
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text:response.data.message,
      });
      console.log(response.data);
      setUserData(response.data.student)
      console.log(userData);
      onRequestClose()
    })
    .catch((error) => {
      Swal.fire({
        icon: 'failed',
        title: 'failed',
        text:"Not Updated Try After Sometime",
      });
      console.error('Error fetching profile details:', error);
      onRequestClose()
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Details Modal"
      style={customStyles}
    >
      <h2 className="font-bold text-3xl text-[#002D74] mb-5">Edit Details</h2>
      <label htmlFor="fullName" className="mb-2 text-[#002D74] font-semibold">
        Full Name:
      </label>
      <input
        id="fullName"
        className="p-3 rounded-xl border w-full mb-3"
        type="text"
        placeholder="Enter your full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <label htmlFor="username" className="mb-2 text-[#002D74] font-semibold">
        Username:
      </label>
      <input
        id="username"
        className="p-3 rounded-xl border w-full mb-3"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="phoneNumber" className="mb-2 text-[#002D74] font-semibold">
        Phone Number:
      </label>
      <input
        id="phoneNumber"
        className="p-3 rounded-xl border w-full mb-3"
        type="text"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button
          className="bg-[#002D74] text-white p-3 rounded-xl border w-full"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          onClick={onRequestClose}
          className="bg-red-500 text-white p-3 rounded-xl border w-full ml-3"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default EditDetailsModal;
