const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isAdmin = require("../middleware/adminMiddleware");


// Get all users
router.get("/users", isAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Delete a user
router.delete("/users/:id", isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
});

// Update user role
router.put("/users/:id", isAdmin, async (req, res) => {
  const { role } = req.body;
  await User.findByIdAndUpdate(req.params.id, { role });
  res.json({ message: "User role updated" });
});

module.exports = router;
