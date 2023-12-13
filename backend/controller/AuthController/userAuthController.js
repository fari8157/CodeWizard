const { generateToken } = require("../../middleWare/auth.js");
const UserModel = require("../../repository/userModel.js");
const OTPRepository =require("../../repository/otpModel.js")
const { generateOTP}= require('../../utils/otp.js')
const {sendOTP} = require('../../utils/sendEmail.js')
const bcrypt = require ('bcrypt')


const userDB = new UserModel();
const OTPDB= new OTPRepository()

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (err) {
    console.log(err.message);
  }
};



const userRegister = async (req, res) => {
  try {
    const studentData = req.body;
    const userData = await userDB.getUserByEmail(studentData.email);
    if (userData) {
      return res.status(400).json({ error: true, message: 'User Already Exists' });
    }
    const newUser = await userDB.createUser(studentData);
    return res.json({ error: false, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

const userLogin = async (req, res) => {
  try {
    
    const userData = req.body;
    const user = await userDB.getUserByEmail(userData.email);
   
    if (!user) {
      return res.status(401).json({ error: true, message: 'User not found' });
    }
    if (user && (await user.matchPassword(userData.password))) {
      if (user.isAccess) {
        if(user.isAdmin){
          return res.json({
        
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            token: generateToken(user._id,'student'),
            role:"admin",
            message: "Login successfully",
            isAdmin:user.isAdmin
          });
        }
        return res.json({
        
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          token: generateToken(user._id,'student'),
          role:"student",
          message: "Login successfully",
        });
      } else {
        return res.json({ error: true, message: "Access denied" });
      }
    } else {
      return res.json({ error: true, message: "Invalid password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};


const googleLogin = async (req, res) => {
  try {
    if (req.body.google) {
      const email = req.body.payload.email;
      const user = await userDB.getUserByEmail(email);

      if (user) {
        if (user.isAccess) {
          return res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            token: generateToken(user._id),
            message: "Login successfully",
          });
        } else {
          return res.json({ error: true, message: "Access denied" });
        }
      } else {
        const { name, email, picture } = req.body.payload;
        const studentData = {
          fullName: name,
          email: email,
          userName: name,
          pic:picture,
          
        };
        
        return res.json({ error: false, message: "User registered successfully",
        _id: user._id,
          fullName: newUser.fullName,
          email: newUser.email,
          userName:newUser.userName,
          token: generateToken(user._id,'student'),
          role:"student",
         
      });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

const forgetPassword= async(req,res)=>{
  const {email}= req.body
  console.log(email);
  const user = await userDB.getUserByEmail(email);
  if(user){
    if(!user.isGoogle){
      if(user.isAccess){
        const otp =generateOTP()
        console.log(otp);
         await OTPDB.insertOTP(user._id,otp,1)
        
        console.log(otp);
      
        await sendOTP(user.email, otp);
        return res.json({error:false ,message:"The OTP sent to your email is only valid for 1 minute."})
    }else{
      return res.json({ error: true, message: "Access denied" });
   

    }
    }else{
      return res.json({ error: true, message: "you can login with google" });
    }
  }else{
    return res.status(401).json({ error: true, message: 'User not found' });
  }
}

const otpVerify=async (req,res)=>{
 const {enteredOtp,email}=req.body
  const user = await userDB.getUserByEmail(email);
  const verify= await OTPDB.verifyOtp(user._id,enteredOtp)
  console.log(verify);
  if(verify){
    return res.json({error:false ,message:"Sucessfully verified"})
  }else{
    return res.json({error:true ,message:"invalid otp"})
  }
  
}

const resedOtp= async (req,res)=>{
  const {email}= req.body
  console.log(email);
  const user = await userDB.getUserByEmail(email);
  await OTPDB.deleteAllOtps(user._id)
  if(user){
    if(!user.isGoogle){
      if(user.isAccess){
        const otp =generateOTP()
        console.log(otp);
         await OTPDB.insertOTP(user._id,otp,1)
        
        console.log(otp);
      
        await sendOTP(user.email, otp);
        return res.json({error:false ,message:"The OTP sent to your email is only valid for 1 minute."})
    }else{
      return res.json({ error: true, message: "Access denied" });
   

    }
    }else{
      return res.json({ error: true, message: "you can login with google" });
    }
  }else{
    return res.json({ error: true, message: 'User not found' });
  }
}

const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await securePassword(password);

    const result = await userDB.updateField(email, 'password', hashedPassword);

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


const verifyPass = async (req, res) => {
  try {
    const userData = await userDB.getUserByID(req.user.id);
    const { currentPassword } = req.body;
    const result=(await userData.matchPassword(currentPassword))
    console.log(result);
   
    if (result) {
      console.log("hello");
      if (userData.isAccess) {
        return res.json({
          error: false,
          message: 'Password verification successful',
          // Add any additional data you want to send in the response
        });
      } else {
        return res.status(403).json({
          error: true,
          message: 'Acess Denied',
        });
      }
    } else {
      return res.status(401).json({
        error: true,
        message: ' Incorrect password',
      });
    }
  } catch (error) {
    console.error('Error in verifyPass:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};








module.exports = {
  userRegister,
  userLogin,
  googleLogin,
  forgetPassword,
  otpVerify,
  resedOtp,
  updatePassword,
  verifyPass,
  
};
