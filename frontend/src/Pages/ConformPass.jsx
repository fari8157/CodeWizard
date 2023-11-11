// import React, { useState } from 'react';
// import { BsEye, BsEyeSlash } from 'react-icons/bs';

// function PasswordReset({email}) {
//   const [isPassShow, setPassShow] = useState(false);

//   return (
//     <div className="bg-gray-50 min-h-screen flex items-center justify-center pb-5 mb-5">
//       <div className="max-w-3xl w-full p-4 md:p-8">
//         <div className="bg-white rounded-lg p-8 shadow-md">
//           <h2 className="font-bold text-3xl text-[#002D74] mb-5" style={{ fontFamily: `'Roboto', sans-serif`, }}>Reset Password 🔏</h2>

//           <form className="w-full flex flex-col gap-4">
//             <div className="relative">
//               <input
//                 className="p-3 rounded-xl border w-full"
//                 type={isPassShow ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Password"
//                 required
//               />
//               {isPassShow ? (
//                 <BsEyeSlash
//                   onClick={() => setPassShow(false)}
//                   className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
//                 />
//               ) : (
//                 <BsEye
//                   onClick={() => setPassShow(true)}
//                   className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
//                 />
//               )}
//             </div>

//             <div className="relative">
//               <input
//                 className="p-3 rounded-xl border w-full"
//                 type={isPassShow ? 'text' : 'password'}
//                 name="rePassword"
//                 placeholder="ReEnter Password"
//                 required
//               />
//               {isPassShow ? (
//                 <BsEyeSlash
//                   onClick={() => setPassShow(false)}
//                   className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
//                 />
//               ) : (
//                 <BsEye
//                   onClick={() => setPassShow(true)}
//                   className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800"
//                 />
//               )}
//             </div>

//             <button className="bg-[#002D74] rounded-xl text-white py-3 hover:scale-105 duration-300 text-xl">
//               Update
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PasswordReset;
import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import userAxios from '../Axiox/UserAxiox';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PasswordReset({ email }) {
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const [isPassShow, setPassShow] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate=useNavigate()
  const handlePasswordChange = (e) => {
   
    setPassword(e.target.value);
    // Check if passwords match
    setPasswordsMatch(e.target.value === reEnteredPassword);
  };

  const handleReEnteredPasswordChange = (e) => {
    setReEnteredPassword(e.target.value);
    // Check if passwords match
    setPasswordsMatch(e.target.value === password);
  };
//   const updatePass= async()=>{
//     try {
//       const response = await userAxios.post('/updatePassword',{ password,email});
//       console.log('Response:', response);
//       if (response.data.error) {
//           toast.error(response.data.message);
//         }else {
//           Swal.fire({
//             title: 'Success',
//             text: response.data.message,
//             icon: 'success',
//           })
         
//       }
//   } catch (error) {
      
//   }
//   console.log("Verifying OTP:", enteredOtp);
// };
  
const updatePass = async (e) => {
e.preventDefault()
  try {
    console.log(password);
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

      // Clear password and re-entered password
      setPassword('');
      setReEnteredPassword('');
      navigate('/')
    }
  } catch (error) {
    console.error('Error updating password:', error);
  }
}

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
