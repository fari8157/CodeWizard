const  express = require( 'express');
const router=express.Router();
const{teacherRegister, forgetPassword, otpVerify, resedOtp, updatePassword, teacherLogin}=require('../controller/AuthController/teacherAuthController')
const{  uploadCourseDetails, getUploadCourses, editCourseDetails,addChapters, confirmCourse }=require('../controller/teacherController')
const{verify}=require('../middleWare/auth')
router.post('/register',teacherRegister)
router.post ('/forgot',forgetPassword)
router.post('/otpVerify',otpVerify)
router.post('/resendOtp',resedOtp)
router.post('/updatePassword',updatePassword)
router.post('/login',teacherLogin)
router.post('/uploadCourse/videos',uploadCourseDetails)
router.get('/uploadCourse/details',verify,getUploadCourses)
router.post('/edititCourseDetails',editCourseDetails)
router.post('/uploadChapters',verify,addChapters)
router.post('/confirmCourse',confirmCourse)
module.exports = router