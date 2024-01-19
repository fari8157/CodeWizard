
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

