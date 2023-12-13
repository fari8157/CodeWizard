const UserModel = require("../repository/userModel.js");
const TeacherModel =require('../../backend/repository/teacherModel.js');
const {  sendTeacherConfirmaion } = require("../utils/sendEmail.js");
const userDB = new UserModel();
const teacherDB= new TeacherModel()
const getStudents= async(req,res)=>{
const students=await userDB.getAllUsers()

return res.json({students})
}

const updateAccess=async(req,res)=>{
    const{email,isAccess}=req.body
    const updateAccess=!isAccess
    console.log(updateAccess);
    const result=await userDB.updateAccess(email,"isAccess",updateAccess)
    console.log(result.email,result.isAccess);
    return res.json({ email: result.email, isAccess: result.isAccess });
   
    
}

const requestedTeachers=async(req,res)=>{
    
    const teachers= await teacherDB.getTeacherByRequested()
    console.log(teachers);
   return res.json({teachers})

}

const teacherApprovel=async(req,res)=>{
    const{email,isApprovel }=req.body
    console.log(email,isApprovel );
    if(isApprovel){
        const approved= await teacherDB.teacherUpdateFeild(email,"isApproved",isApprovel)
        const content="your teacher request  accepted upload your videos"
        sendTeacherConfirmaion(approved.email,approved.fullName,content)
        return res.json({error:false,email:approved.email,message:"Applicati Approved successfully"})
        
    }else{
        const teacherDetails = await teacherDB.getTeacherByEmail(email)
       console.log(teacherDetails);
       const declined= await teacherDB.teacherDelete(email)
       console.log(declined);
       
       const content="your request rejected resubmit your details again"
       sendTeacherConfirmaion(email,teacherDetails.fullName,content)
       return res.json({error:false,email:teacherDetails.email,message:"Application Rejected"})
    }
}

const getTeachers= async(req,res)=>{
    const teachers=await teacherDB.getAllTeachers()
    
    return res.json({teachers})
    }


module.exports={
    getStudents,
    updateAccess,
    requestedTeachers,
    teacherApprovel,
    getTeachers,
}