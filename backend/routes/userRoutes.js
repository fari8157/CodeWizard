const  express = require( 'express');
const {verify} =require("../middleWare/auth.js")
const  {
    userRegister,
    userLogin,
    googleLogin,
    forgetPassword,
    otpVerify,
    resetOtp,
    updatePassword,
    verifyPass,
                  } = require( "../controller/AuthController/userAuthController.js");
 const {profile, updateProfile, updateProfilePic, getCourses, getCourseDetails,handlePayment, getMyEntrollments, newBlog, myBlog, editBlog, deleteBlog, allBlogs, blogDetails, addComment, addRating, getMyCourse, deleteComment, getCategories, handleSuccessPayment, homeBlog}= require('../controller/userCntroller')                 

const router=express.Router();


//auth
router.post("/register", userRegister)
router.post("/login",userLogin)
router.post('/login/google',googleLogin)
router.post('/forgetPassword',forgetPassword)
router.post('/otpVerify',otpVerify)
router.post('/resendOtp',resetOtp)
//profile
router.post('/updatePassword',updatePassword)
router.get('/profileDetail',verify,profile)
router.post('/verifyPass',verify,verifyPass)
router.put('/editProfileDetail/:id',verify,updateProfile)
router.put('/updateProfilePic/:id',verify,updateProfilePic)
//courses
router.get('/courses',getCourses)
router.get('/courses/:id',getCourseDetails)
router.get('/myEntrollments/:id',verify,getMyEntrollments)
router.get('/getMycourse/:courseId',verify,getMyCourse)
//payment
router.post('/create-payment-session',verify,handlePayment)
router.get('/successpayment',handleSuccessPayment)
//blog
router.post('/newBlog',verify,newBlog)
router.get('/myBlog/:userId',verify,myBlog)
router.put('/editBlog/:id',verify,editBlog)
router.delete('/deleteBlog/:id',verify,deleteBlog)
router.get('/blogs',allBlogs)
router.get('/blogDetails',blogDetails)
router.get('/homeBlogs',homeBlog)
//comment
router.post('/addComment',verify,addComment)
router.delete('/deleteComment',verify,deleteComment)
//rating
router.post('/addRating',verify,addRating)
//category
router.get('/getCategories',getCategories)

module.exports = router