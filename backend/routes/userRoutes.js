const express = require("express");
const asyncHandler = require("express-async-handler");
const { registerUser, loginUser, getUserProfile, getUser, updateUser, deleteUser } = require("../controllers/usercontroller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register user route
router.post('/sign', asyncHandler(registerUser));

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

module.exports = router;