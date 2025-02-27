const User = require('../models/User');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Assuming you're attaching the user ID to the request
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, not an admin' });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = isAdmin;