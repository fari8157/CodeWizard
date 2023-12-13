const { generateToken } = require("../../middleWare/auth.js");
const TeacherModel =require('../../repository/teacherModel')
const OTPRepository =require("../../repository/otpModel")
const { generateOTP}= require('../../utils/otp.js')
const {sendOTP} = require('../../utils/sendEmail.js')
const { imageUpload } = require('../../utils/cloudinery/upload.js')


 const teacherDB= new TeacherModel()
 const OTPDB= new OTPRepository()
 const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (err) {
    console.log(err.message);
  }
};





 const teacherRegister= async(req,res)=>{
    const teacherData=req.body
    const  qualificationCertificate=req.files.qualificationCertificate
    const  idProof =req.files.idProof
    const certificate =await imageUpload(qualificationCertificate)
    const teacherId=await imageUpload(idProof)
    
    
    const teacher = await teacherDB.getTeacherByEmail(teacherData.email);
    
    if (teacher) {
        console.log('hi');
        return res.json({ error: true, message: 'User Already Exists' });
      }
      const newTeacher = await teacherDB.createTeacher(teacherData,certificate,teacherId);
      return res.json({ error: false, message: 'Your details submitted successfully. Your request is pending. After verification, we will send your application status to your email.' });

  
 }

 const forgetPassword = async (req, res) => {
console.log('hi');
  const { email } = req.body;
  console.log(email);
  const teacher = await teacherDB.getTeacherByEmail(email);
  console.log(teacher);
  
  if (teacher) {
    if (teacher.isTeacher) { 
      if (teacher.isApproved) {
        if (teacher.isAccess) { 
          const otp = generateOTP();
          console.log(otp);
          await OTPDB.insertOTP(teacher._id, otp, 1);
          
          console.log(otp);
          
          await sendOTP(teacher.email, otp);
          
          return res.json({ error: false, message: "The OTP sent to your email is only valid for 1 minute." });
        } else {
          return res.json({ error: true, message: "Access denied" });
        }
      } else {
        return res.json({ error: true, message: "Teacher is not approved yet" });
      }
    } else {
      return res.json({ error: true, message: "This email does not belong to a teacher" });
    }
  } else {
    return res.json({ error: true, message: 'Teacher not found' });
  }
};

const otpVerify=async (req,res)=>{
  const {enteredOtp,email}=req.body
   const teacher = await teacherDB.getTeacherByEmail(email);
   const verify= await OTPDB.verifyOtp(teacher._id,enteredOtp)
   console.log(verify);
   if(verify){
     return res.json({error:false ,message:"Sucessfully verified"})
   }else{
     return res.json({error:true ,message:"invalid otp"})
   }
   
 }


 const resedOtp = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const teacher = await teacherDB.getTeacherByEmail(email);
  if (teacher) {
    await OTPDB.deleteAllOtps(teacher._id);

    if (teacher.isTeacher) { 
      if (teacher.isApproved) { 
        if (teacher.isAccess) { 
          const otp = generateOTP();
          console.log(otp);
         await OTPDB.insertOTP(teacher._id, otp, 1);
         console.log(otp);
          await sendOTP(teacher.email, otp);
          
          return res.json({ error: false, message: "The OTP sent to your email is only valid for 1 minute." });
        } else {
          return res.json({ error: true, message: "Access denied" });
        }
      } else {
        return res.json({ error: true, message: "Teacher is not approved yet" });
      }
    } else {
      return res.json({ error: true, message: "This email does not belong to a teacher" });
    }
  } else {
    return res.status(401).json({ error: true, message: 'Teacher not found' });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await securePassword(password);

    const result = await teacherDB.teacherUpdateFeild(email, 'password', hashedPassword);

    if (result) {
       
      return res.json({ error: false, message: 'Password updated successfully.' });
    } else {
      
      return res.json({ error: true, message: 'User not found or no update needed.' });
    }
  } catch (error) {
    console.error('Error updating password:', error);
    return res.json({ error: true, message: 'Internal server error.' });
  }
};
const teacherLogin = async (req, res) => {
  try {
    const teacherData = req.body;
    const teacher = await teacherDB.getTeacherByEmail(teacherData.email);

    if (!teacher) {
      return res.status(401).json({ error: true, message: 'Teacher not found' });
    }

    if (!teacher.isTeacher) {
      return res.status(403).json({ error: true, message: 'You are not recognized as a teacher' });
    }

    if (!teacher.isApproved) {
      return res.status(403).json({ error: true, message: 'Teacher not approved' });
    }

    if (!teacher.isAccess) {
      return res.status(403).json({ error: true, message: 'Teacher access denied' });
    }

    if (teacher && (await teacher.matchPassword(teacherData.password))) {
      return res.json({
        _id: teacher._id,
        fullName: teacher.fullName,
        email: teacher.email,
        token: generateToken(teacher._id, 'teacher'),
        role: 'teacher',
        message: 'Login successful',
      });
    } else {
      return res.json({ error: true, message: 'Invalid password' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};



  module.exports={
    teacherRegister,
    forgetPassword,
    otpVerify,
    resedOtp,
    updatePassword,
    teacherLogin,
  }


  