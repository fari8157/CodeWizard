const nodemailer=require('nodemailer')


async function sendOTP(email, otp) {
    try {
      // Configure the email transport settings
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'salmanulfarisc13@gmail.com',
          pass: 'jzbiiuvgblokcard',
        },
        tls: {
    rejectUnauthorized: false
        }
      });
  
      // Compose the email message
      const mailOptions = {
        from: 'salmanulfarisc13@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP: ${otp}`
      };
  
      // Send the email
      const info = await transporter.sendMail(mailOptions);
     
    } catch (error) {
     
    }
  }

  module.exports ={
    sendOTP
  }
  