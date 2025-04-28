const User = require("../models/User");

const updateLastActive = async (req, res, next) => {
  if (req.user) {
    try {
      await User.findByIdAndUpdate(req.user._id, { lastActiveAt: new Date() });
    } catch (err) {
      console.error('Failed to update last active:', err);
    }
  }
  next();
};

module.exports = updateLastActive;
