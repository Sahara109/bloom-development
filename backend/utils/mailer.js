const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: `"Bloom Mental Care" <${process.env.EMAIL_USER}>`, // Friendly sender name
    to,
    subject: 'Your Bloom Mental Care OTP Code',
    text: `Hello,

Your OTP code for Bloom Mental Care registration is: ${otp}

This code will expire in 10 minutes.

If you did not request this code, please ignore this email.

To ensure you receive our emails in your inbox, please add ${process.env.EMAIL_USER} to your contacts or safe sender list.

Thank you,
Bloom Mental Care Team`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #2E86C1;">Bloom Mental Care</h2>
        <p>Hello,</p>
        <p>Your OTP code for Bloom Mental Care registration is:</p>
        <h1 style="color: #27AE60;">${otp}</h1>
        <p>This code will expire in <strong>10 minutes</strong>.</p>
        <p>If you did not request this code, please ignore this email.</p>
        <hr />
        <p style="font-size: 0.9em; color: #777;">
          To ensure you receive our emails in your inbox, please add <strong>${process.env.EMAIL_USER}</strong> to your contacts or safe sender list.
        </p>
        <p>Thank you,<br />Bloom Mental Care Team</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('OTP email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw error;
  }
};

module.exports = sendOTPEmail;
