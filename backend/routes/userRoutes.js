const express = require("express");
const asyncHandler = require("express-async-handler");
// In routes/userRoutes.js
const { registerUser, loginUser, getUserProfile, getUser, updateUser, deleteUser } = require("../controllers/usercontroller");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register user route
router.post('/sign', asyncHandler(registerUser));

// Login route
router.post('/login', asyncHandler(loginUser));

// Get User Profile (Protected Route)
router.get("/profile", protect, asyncHandler(getUserProfile)); // Wrap the controller with asyncHandler


// Additional routes
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
