const mongoose = require("mongoose");
const schema = mongoose.Schema;

const chatSchema = new schema(
  {
    conversationId: {
      type: String,
      required: true,
      unique: true,
    },
    participants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      {
        type: mongoose.Schema.ObjectId,
        ref: "Teacher",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.ObjectId,
      ref: "message",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Chat", chatSchema);