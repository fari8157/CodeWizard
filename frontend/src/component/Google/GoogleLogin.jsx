// import React from 'react'
// import { GoogleLogin } from '@react-oauth/google'
// import { decodeJwt } from 'jose'
// import userAxios from '../../Axiox/UserAxiox';
// import Swal from 'sweetalert2';
// import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
// async function Login () {
//   return (
//     <>
      
//       {/* <GoogleLogin 
//   onSuccess={(credentialResponse) => {
//     console.log(credentialResponse);
//     const {credential} = credentialResponse
//     const payload = credential ? decodeJwt(credential) : undefined
//     if(payload){
//         console.log(payload);}
//         userAxios.post('/login/google',{payload,google:true}).then((response)=>{
//           const response = res.data.response
//           console.log(result);
//           if (response.data.error) {
//             toast.error(response.data.message);
//           } else {
//             Swal.fire({
//               title: 'Success',
//               text: response.data.message,
//               icon: 'success',
//             }).then(() => {
//               // setShowAnimation(true);
//               // setTimeout(() => {
//                 navigate('/');
//               // }, 5000); // 5000 milliseconds (5 seconds)
//             });
//           }
//         } catch (error) {
//           console.error(error);
//           toast.error(error.response.data.message);
//         }
//         })

//   }}
//   onError={() => {
//     console.log('Login Failed');
//   }}
// /> */}
// <GoogleLogin 
 
//   onSuccess={(credentialResponse) => {
//     console.log(credentialResponse);
//     const { credential } = credentialResponse;
//     const payload = credential ? decodeJwt(credential) : undefined;
//     if (payload) {
//       console.log(payload);
//      const response= await userAxios.post('/login/google', { payload, google: true })
//              console.log(response);
//              if (response.data.error) {
//               toast.error(response.data.message);
//             } else {
//               Swal.fire({
//                 title: 'Success',
//                 text: response.data.message,
//                 icon: 'success',
//               }).then(() => {
//                 // setShowAnimation(true);
//                 // setTimeout(() => {
//                   navigate('/');
//                 // }, 5000); // 5000 milliseconds (5 seconds)
//               });
//           }
      
//         .catch((error) => { // Added catch block
//           console.error(error);
//           toast.error(error.response.data.message);
//         });
//     }
//   }}
//   onError={() => {
//     console.log('Login Failed');
//   }}
// />

// <ToastContainer/>

//     </>
//   )
// }




// export default Login
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { decodeJwt } from 'jose';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import userAxios from '../../Axiox/UserAxiox';
import { useDispatch, useSelector } from 'react-redux';
import { clientLogin } from '../../store/UserAuth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const payload = credential ? decodeJwt(credential) : undefined;
  
      if (payload) {
        const response = await userAxios.post('/login/google', { payload, google: true });
        console.log(response);
  
        if (response.data.error) {
          toast.error(response.data.message);
        } else {
          Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
          }).then(() => {
            dispatch(
              clientLogin({
                token: response.data.token,
                email: response.data.email,
                userName: response.data.userName,
                role: response.data.role
              })
            );
            navigate('/');
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };
  
  return (
    <>
      <GoogleLogin
     
        onSuccess={handleGoogleLogin}
        onError={() => {
          console.log('Login Failed');
        }}
      />

      <ToastContainer />
    </>
  );
}

export default Login;

