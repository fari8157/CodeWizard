const OTP =require('../models/otpModel')




class OTPRepository {
  async insertOTP(userId, otp, expirationMinutes) {
    const otpValue = otp
    const expiresAt = new Date(Date.now() + expirationMinutes * 60000);

    const otpDocument = new OTP({
      user_id: userId,
      otp_value: otpValue,
      expires_at: expiresAt,
    });

    await otpDocument.save();
    return otpValue;
  }
 
  
    async deleteAllOtps(user_id) {
      try {
        const result = await OTP.deleteMany({user_id });
        if (result.deletedCount > 0) {
          console.log(`All OTPs  deleted successfully.`);
        } else {
          console.log(`No matching OTPs found for email ${email}.`);
        }
      } catch (error) {
        console.error('Error deleting OTPs:', error);
      }
    }
 
  
    async verifyOtp(user_id, otpValue) {
        try {
            const otpDocument = await OTP.findOne({ user_id, otp_value: otpValue });
      
          if (otpDocument) {
            const currentTime = new Date();
            const otpExpiration = otpDocument.expires_at;
      
            if (currentTime <= otpExpiration) {
              console.log(`OTP for user ${user_id} with value ${otpValue} is valid.`);
              this.deleteAllOtps(user_id);
              return true;
            } else {
              console.log(`OTP for user ${user_id} with value ${otpValue} has expired.`);
              this.deleteAllOtps(user_id);
              return false;
            }
          } else {
            console.log(`No matching OTP found for user ${user_id} and value ${otpValue}.`);
           
            return false;
          }
        } catch (error) {
          console.error('Error verifying OTP:', error);
          return false;
        }
      }
      
}


module.exports = OTPRepository
