const payment=require('../models/paymentModel')


class PaymentRepository{
    async createPayment(paymentData) {
        try {
          const newPayment = await payment.create(paymentData);
          return newPayment;
        } catch (error) {
            console.error(error);
          throw new Error('Failed to create a payment');
        }
      }
}


module.exports= PaymentRepository