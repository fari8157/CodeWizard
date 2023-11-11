const  express = require( 'express');
const {verify} =require("../middleWare/auth.js")
const  {
    userRegister,
    userLogin,
    googleLogin,
    forgetPassword,
    otpVerify,
    resedOtp,
    updatePassword,
    verifyPass,
                  } = require( "../controller/authController");
 const {profile}= require('../controller/userCntroller')                 

const router=express.Router();



router.post("/register", userRegister)
router.post("/login",userLogin)
router.post('/login/google',googleLogin)
router.post('/forgetPassword',forgetPassword)
router.post('/otpVerify',otpVerify)
router.post('/resendOtp',resedOtp)
router.post('/updatePassword',updatePassword)
router.get('/profileDetail',verify,profile)
router.post('/verifyPass',verify,verifyPass)
module.exports = router