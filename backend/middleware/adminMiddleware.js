const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Get user from DB

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, not an admin" });
    }

    next(); // Proceed if admin
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = isAdmin;
