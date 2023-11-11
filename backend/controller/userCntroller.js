const UserModel = require("../reposetory/userModel.js");


const userDB = new UserModel();

const profile=async(req,res)=>{
    
    const userData=await userDB.getUserByID(req.user.id)
    return res.json({error:false,userData})
    
}




module.exports={
    profile
}