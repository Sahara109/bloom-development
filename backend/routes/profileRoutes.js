const express = require("express");
const asyncHandler = require("express-async-handler");
const { getUserProfile, updateUserProfile } = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, asyncHandler(getUserProfile));
router.put("/profile", protect, asyncHandler(updateUserProfile));

module.exports = router;