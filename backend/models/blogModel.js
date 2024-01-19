const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blogSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: Object,
    required: true,
  },
   
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogComment",
    },
  ],
  isAccess: {
    type: Boolean,
    default: true,
  }
});


module.exports = mongoose.model("Blog",blogSchema)