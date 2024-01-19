const mongoose = require("mongoose");
const schema = mongoose.Schema;

const messageSchema = new schema(
  {
    sender: {
      type: {
        type: String,
        required: true,
        enum: ['User','Teacher']
      },
      refId: {
        type: mongoose.Types.ObjectId,
        refPath: 'sender.type',
      }
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.ObjectId,
      ref: "Chat",
    },
    timestamps: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model("message", messageSchema);