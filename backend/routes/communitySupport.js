const express = require("express");
const asyncHandler = require("express-async-handler");
const { getStories, addStory } = require("../controllers/storyController");
const { registerUser, loginUser, getUserProfile, getUser, updateUser, deleteUser } = require("../controllers/usercontroller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/stories', asyncHandler(getStories));
router.post('/stories', asyncHandler(addStory));

router.post('/sign', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));
router.get("/profile", protect, asyncHandler(getUserProfile));
router.get("/:id", protect, asyncHandler(getUser));
router.put("/:id", protect, asyncHandler(updateUser));
router.delete("/:id", protect, asyncHandler(deleteUser));

// Mock user data for demonstration purposes
const userData = {
  profileImage: 'http://localhost:5001/uploads/default-avatar.png',
};

router.get('/getUserData', (req, res) => {
  try {
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;