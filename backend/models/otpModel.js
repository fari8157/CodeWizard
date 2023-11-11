// models/otp.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  otp_value: { type: String, required: true },
  expires_at: { type: Date, required: true },
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
