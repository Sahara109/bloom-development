const express = require("express");
const asyncHandler = require("express-async-handler");
const { registerUser, loginUser, getUserProfile, getUser, updateUser, deleteUser } = require("../controllers/usercontroller");
const { protect } = require("../middleware/authMiddleware");
const { verifyOTP } = require('../controllers/usercontroller');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User'); 
const sendEmail = require('../utils/sendEmail');
require('dotenv').config();



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

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';

  const resetLink = `${frontendURL}/#/reset-password/${token}`;

  const emailContent = `
    <h1>Password Reset Request</h1>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>This link will expire in 1 hour.</p>
  `;

  try {
    await sendEmail(email, 'Password Reset Request', emailContent);
    res.status(200).json({ message: 'Reset link sent to your email!' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending email' });
  }
});

// Reset Password Route
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Hash the token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find the user
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log('Invalid or expired token:', token); // Debugging
      return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    // Generate salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user
    await user.save({ validateBeforeSave: false }); // Skip validation for password reset

    console.log('Password reset successfully for user:', user.email); // Debugging
    res.status(200).json({ message: 'Password has been reset successfully!' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
});



module.exports = router;