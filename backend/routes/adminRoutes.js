const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isAdmin = require("../middleware/adminMiddleware");
const Activity = require("../models/Activity");


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

// Get stats
router.get("/stats", isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const admins = await User.countDocuments({ role: "admin" });
    const activeUsers = await User.countDocuments({ /* your active criteria here */ });
    const newUsers = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    res.json({ totalUsers, admins, activeUsers, newUsers });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get recent activities
router.get("/activities", isAdmin, async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ date: -1 })
      .limit(10);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get growth data (example: user registrations per day last 7 days)
router.get("/growth", isAdmin, async (req, res) => {
  try {
    const today = new Date();
    const dates = [];
    const counts = [];

    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(day.getDate() - i);

      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);

      const count = await User.countDocuments({
        createdAt: { $gte: day, $lt: nextDay },
      });

      dates.push(day.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
      counts.push(count);
    }

    res.json({ dates, counts });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;