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
                  } = require( "../controller/AuthController/userAuthController.js");
 const {profile, updateProfile, updateProfilePic, getCourses, getCourseDetails,handlePayment}= require('../controller/userCntroller')                 

const router=express.Router();


//auth
router.post("/register", userRegister)
router.post("/login",userLogin)
router.post('/login/google',googleLogin)
router.post('/forgetPassword',forgetPassword)
router.post('/otpVerify',otpVerify)
router.post('/resendOtp',resedOtp)
//profile
router.post('/updatePassword',updatePassword)
router.get('/profileDetail',verify,profile)
router.post('/verifyPass',verify,verifyPass)
router.post('/editProfileDetail',verify,updateProfile)
router.post('/updateProfilePic',verify,updateProfilePic)
router.get('/courses',getCourses)
router.get('/courses/:id',getCourseDetails)
router.post('/create-payment-session',verify,handlePayment)
// router.get('/successpayment',handleSuccessPayment)
module.exports = router