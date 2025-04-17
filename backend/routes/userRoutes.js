const express = require("express");
const asyncHandler = require("express-async-handler");
const { registerUser, loginUser, getUserProfile, getUser, updateUser, deleteUser } = require("../controllers/usercontroller");
const { protect } = require("../middleware/authMiddleware");
const { verifyOTP } = require('../controllers/usercontroller');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User'); 



const router = express.Router();

// Register user route
router.post('/sign', asyncHandler(registerUser));

// OTP verification route
router.post('/verify-otp', asyncHandler(verifyOTP));


// Login route
router.post('/login', asyncHandler(loginUser));

// Get User Profile (Protected Route)
router.get("/profile", protect, asyncHandler(getUserProfile));

// Additional routes
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

// Mock user data for demonstration purposes
const userData = {
  profileImage: 'http://localhost:5001/uploads/default-avatar.png', // Default image path
  // Add other user data fields as needed
};

// Route to fetch user data
router.get('/getUserData', (req, res) => {
  try {
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const token = crypto.randomBytes(32).toString('hex'); // Generate a token
  user.resetPasswordToken = token;  // Store token in user model
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
  await user.save();

  // Send reset email using Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',  // Replace with your Gmail
      pass: 'your-email-password',   // Replace with your email password
    },
  });

  const mailOptions = {
    to: email,
    from:  process.env.EMAIL_USER,
    subject: 'Password Reset Request',
    text: `You are receiving this email because you (or someone else) have requested a password reset. Please click the link below to reset your password:\n\nhttp://localhost:3000/reset-password/${token}\n\nIf you did not request this, please ignore this email.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.status(200).json({ message: 'Reset link sent to your email!' });
  });
});

// Reset Password Route
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

  if (!user) {
    return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
  }

  user.password = newPassword;  // Hash password here if necessary (e.g., using bcrypt)
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: 'Password has been reset successfully!' });
});

module.exports = router;