const express = require("express");
const { getUser, updateUser, deleteUser } = require("../controllers/usercontroller");
const { protect } = require("../middleware/authMiddleware");
const { loginUser } = require("../controllers/usercontroller"); // Import the loginUser controller


const router = express.Router();

console.log(getUser, updateUser, deleteUser);
console.log(protect);

// POST /api/users/login
router.post("/login", loginUser);

// GET /api/user-management/:id - Get user details
router.get("/:id", protect, getUser);

// PUT /api/user-management/:id - Update user profile
router.put("/:id", protect, updateUser);

// DELETE /api/user-management/:id - Delete user
router.delete("/:id", protect, deleteUser);



module.exports = router;