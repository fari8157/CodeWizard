const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
 
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastQualification: {
    type: String,
    required: true,
  },
  bankAccountNo: {
    type: String,
    required: true,
  },
  ifcCode: {
    type: String,
    required: true,
  },
  idProof: {
    type: String,
    required: true,
  },
  certificate: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    default: "",
  },
  isApproved:{
    type:Boolean,
    default:false,
  },

  isAccess: {
    type: Boolean,
    default: true,
  },
  isTeacher:{
   type:Boolean,
   default:false,
  },
  pic: {
    type: String,
    required: true,
    default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

teacherSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
