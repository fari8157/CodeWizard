const CourseRepository = require("../repository/courseModal.js");
const PaymentRepository = require("../repository/paymentModal.js");
const UserModel = require("../repository/userModel.js");
const {imageUpload }=require('../utils/cloudinery/upload.js')
const stripe = require('stripe')('sk_test_51OMTNFSB5PePlulF61kGpeJveFyVhDeHMpn8ZYZ1Hw1ibLBZKx2Wo2gzefd4qTCYn3TZFy4rvwh3NNdO0G4BGGyK00dLUCwPJ8');
const userDB = new UserModel();
const courseDB =new CourseRepository()
const paymentDB= new PaymentRepository()

const profile = async (req, res) => {
    try {
      const userData = await userDB.getUserByID(req.user.id);
      return res.json({ error: false, userData });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return res.json({ error: true, message: 'Error fetching user profile.' });
    }
  };
  
const updateProfile = async (req, res) => {
    try {
        const studentId = req.user.id;
        const editDetails = req.body;
        if (
            !editDetails.fullName || !editDetails.fullName.trim() ||
            !editDetails.username || !editDetails.username.trim() 
          
        ) {
            return res.json({ error: true, message: 'Please provide valid values for all fields' });
        }
        const student = await userDB.updateUserProfile(editDetails, studentId);
        
        console.log(student);

        if (student) {
            return res.json({ error: false, message: 'Successfully Updated', student });
        }
    } catch (error) {
        console.error(error);
        return res.json({ error: true, message: 'Error updating profile' });
    }
};
//  const updateProfilePic=async(req,res)=>{
//     const studentId=req.user.id
//     const file=req.files
//     const image=await imageUpload(file.profilePicture)
//     const student=await userDB.getUserByID(studentId)
//      await userDB.updateField(student.email,"pic",image)
//     const studentData= await userDB.getUserByID(studentId)
//     console.log(studentData);
//     return res.json({error:false,studentData})
//  }
 const updateProfilePic = async (req, res) => {
    try {
      const studentId = req.user.id;
      const file = req.files;
  
      if (!file || !file.profilePicture) {
        return res.status(400).json({ error: true, message: 'No file uploaded.' });
      }
  
      const image = await imageUpload(file.profilePicture);
  
      const student = await userDB.getUserByID(studentId);
  
      if (!student) {
        return res.status(404).json({ error: true, message: 'Student not found.' });
      }
  
      await userDB.updateField(student.email, 'pic', image);
  
      const studentData = await userDB.getUserByID(studentId);
      console.log(studentData);
  
      return res.json({ error: false, studentData });
    } catch (error) {
      console.error('Error updating profile picture:', error);
      return res.status(500).json({ error: true, message: 'Error updating profile picture.' });
    }
  };
  const getCourses=async (req,res)=>{
   const courses= await courseDB.getCourses()
   res.json({error:false,courses:courses})
  }
  const getCourseDetails = async (req, res) => {
    try {
      const courseId = req.params.id;
      const courseDetail = await courseDB.getCourseDetails(courseId);
      const allHeadlines = courseDetail.chapters.map(chapter => chapter.chapterHeadline);
      const totalVideos =allHeadlines?allHeadlines.length:0
      if (courseDetail) {
      const courseDetails={
        courseName:courseDetail.courseName,
        description:courseDetail.description,
        coverPhoto:courseDetail.coverPhoto,
        demoVideo:courseDetail.demoVideo,
        price:courseDetail.price,
        DiscountPrice:courseDetail.DiscountPrice,
        totalVideos:totalVideos,
        allHeadlines:allHeadlines,

      }
   
        return res.json({ error: false, courseDetails });
      } else {
        return res.json({ error: true, message: 'Course details not found' });
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      return res.json({ error: true, message: 'Error fetching course details' });
    }
  };

  const handlePayment = async (req, res) => {
    try {
      const userId = req.user.id;
      const { course_id } = req.body;
      console.log(course_id, userId);
  
      const course = await courseDB.getCourseDetails(course_id);
      console.log(course);
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: course.courseName,
                images: [course.coverPhoto.url],
              },
              unit_amount: course.DiscountPrice * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `http://localhost:5173/courses?success=true`,
        cancel_url: "http://localhost:5173/courses?success=false",
      
      });
      console.log(session);
      await courseDB.insertUserIdIntoUsersArray(course_id,userId)
      const paymentData = {
         stripe_id: session.id,
         course_id: course._id,
         teacher_id: course.teacher_id,
         amount: course.DiscountPrice,
         user_id: userId,
       };
       const newPayment= await paymentDB.createPayment(paymentData)
      res.json({ id: session.id });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  // const handleSuccessPayment = async (req, res) => {
  //   try {
  //     const { session_id,user_id,course_id } = req.query;
  //     console.log('hi,',session_id);
  //     const userdata = await userDB.getUserByID(user_id)
  //     const course = await courseDB.getCourseDetails(course_id)
  //     await courseDB.insertUserIdIntoUsersArray(course_id,user_id)
  //    const paymentData = {
  //       strip_id: session_id,
  //       course_id: course._id,
  //       teacher_id: course.teacher_id,
  //       amount: course.DiscountPrice,
  //       user_id: userdata._id,
  //     };
  //     const newPayment= await paymentDB.createPayment(paymentData)
      
  //     res.redirect('http://localhost:5173/courses');
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  
  
  

module.exports={
    profile,
updateProfile,
updateProfilePic,
getCourses,
getCourseDetails,
handlePayment,
// handleSuccessPayment,

}