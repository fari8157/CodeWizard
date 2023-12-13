
const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
    },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      price:{
        type:Number,
        required:true,
      },
    DiscountPrice:{
        type:Number,
        required:true,
      },
      courseOutLine:{
        type:String,
        required:true
      },
      coverPhoto:{
        type: Object,
        required: true,
      },
      demoVideo: {
        type: Object,
        required: true,
      },
      chapters:{
        type:Array,
        default:[]
      },
      users:{
        type:Array,
        default:[]
      },
      isUpload:{
        type:Boolean,
        default:false,
      },
      created: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model("course", courseSchema);