const UserModel = require("../reposetory/userModel.js");
const userDB = new UserModel();
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



module.exports={
    getStudents,
    updateAccess
}