const express = require("express");
const asyncHandler = require("express-async-handler");
const { getUserProfile, updateUserProfile } = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");
const { uploadProfilePicture } = require('../controllers/profileController');

const router = express.Router();

router.post('/upload', protect, uploadProfilePicture);
router.get("/profile", protect, asyncHandler(getUserProfile));
router.put("/profile", protect, asyncHandler(updateUserProfile));

module.exports = router;