const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isAdmin = require("../middleware/adminMiddleware");

// Get all users
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(200).json({ message: "No users found" });
    }
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Delete a user
router.delete("/users/:id", isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Update user role
router.put("/users/:id", isAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User role updated" });
  } catch (err) {
    console.error('Error updating user role:', err);
    res.status(500).json({ message: "Error updating user role" });
  }
});

module.exports = router;