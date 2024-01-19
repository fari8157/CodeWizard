const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  stripe_id: {
    type: String,
    required: true
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', 
    required: true
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', 
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }, 
  isTeacherPay:{
    type:Boolean,
    default:false,
   },
  created: {
    type: Date,
    default: Date.now(),
}
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
