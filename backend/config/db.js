require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = (req, res) => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connected to mongoDB");
    })
    .catch(() => {
      console.log("Error connecting to mongoDB");
    });
};

module.exports = connectDB