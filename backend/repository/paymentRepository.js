const Payment = require('../models/paymentModel');
const { ObjectId } = require('mongodb');


class PaymentRepository{
    async createPayment(paymentData) {
        try {
          console.log(paymentData);
          const newPayment = await Payment.create(paymentData);
          return newPayment;
        } catch (error) {
            console.error(error);
          throw new Error('Failed to create a payment');
        }
      }
    
      
      async  getUserPayments(userId) {
        try {
          const payments = await Payment.find({ user_id: userId })
          
          .populate('teacher_id') 
          .populate('course_id'); 
          payments.forEach(payment => {
            if (payment.course_id && payment.course_id.courseName) {
              const courseName = payment.course_id.courseName;
              console.log('Course Name:', courseName);
            } else {
              console.log('Course details not found for payment:', payment._id);
            }
          });
          return payments;
        } catch (err) {
          console.error('Error fetching payments:', err);
          throw err;
        }
      }
      async  getAllPayments() {
        try {
          const payments = await Payment.find()
          .populate('user_id')
          .populate('teacher_id') 
          .populate('course_id'); 
          payments.forEach(payment => {
            if (payment.course_id && payment.course_id.courseName) {
              const courseName = payment.course_id.courseName;
              console.log('Course Name:', courseName);
            } else {
              console.log('Course details not found for payment:', payment._id);
            }
          });
          return payments;
        } catch (err) {
          console.error('Error fetching payments:', err);
          throw err;
        }
      }

      async UpdateFeild(paymentId,fieldName, fieldValue){
        try {
        
          const result = await Payment.findOneAndUpdate(
            {_id:paymentId },
            { $set: { [fieldName]: fieldValue } },
            
          );

          console.log(result);
          return result;
        } catch (error) {
          
        }

      }
      async  getTeacherPayments(teacherId) {
        try {
          const payments = await Payment.find({teacher_id:teacherId})
          .populate('user_id')
          .populate('teacher_id') 
          .populate('course_id'); 
          payments.forEach(payment => {
            if (payment.course_id && payment.course_id.courseName) {
              const courseName = payment.course_id.courseName;
              console.log('Course Name:', courseName);
            } else {
              console.log('Course details not found for payment:', payment._id);
            }
          });
          return payments;
        } catch (err) {
          console.error('Error fetching payments:', err);
          throw err;
        }
      }

      async  getTeacherDashboardPayments(teacherId) {
        try {
          const payments = await Payment.find({ teacher_id: teacherId })
            .populate('user_id')
            .populate('teacher_id')
            .populate('course_id')
            .sort({ created: -1 }) 
            .limit(5); 
      
          payments.forEach((payment) => {
            if (payment.course_id && payment.course_id.courseName) {
              const courseName = payment.course_id.courseName;
              
            } else {
              console.log('Course details not found for payment:', payment._id);
            }
          });
      
          return payments;
        } catch (err) {
          console.error('Error fetching payments:', err);
          throw err;
        }
      }
      
      async  getTeacherRevenue(teacherId) {
        try {
          const payments = await Payment.find({ teacher_id: new ObjectId(teacherId) });
         const count = payments.length;
         const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
         return { count, totalAmount };
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      }
    async getTotalRevenue(){
      try{
      const payments= await Payment.find ()
      const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
      return totalAmount
    }catch (error) {
      console.error('Error fetching total revenue:', error);
      
    }
  }
      
}


module.exports= PaymentRepository