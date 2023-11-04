const mongoose= require('mongoose');
const bcrypt = require ('bcrypt')


const userSchema = mongoose.Schema(
    {
     fullName:{
        type:String,
        required:true,
     },
     email:{
        type:String,
        required:true,
        unique:true,
     },
     password:{
        type:String,
        required:true,

     },
     isAdmin:{
        type:Boolean,
        default:false
     },
     isAccess:{
        type:Boolean,
        default:true
     },
     phoneNumber:{
        type:Number,
        required:true,
     },
     pic: {
        type: String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
      created: {
        type: Date,
        default: Date.now(),
    }
    }
)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // will encrypt password everytime its saved
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  userSchema.methods.matchPassword=async function (enteredPassword){
      return await bcrypt.compare(enteredPassword,this.password)
  }
  
  const User = mongoose.model("User", userSchema);
  
  module.exports= User;