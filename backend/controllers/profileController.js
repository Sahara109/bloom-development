const User = require("../models/User");
const upload = require('../middleware/uploadImage'); 


const uploadProfilePicture = async (req, res) => {
  upload.single('profileImage')(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const imagePath = `/images/${req.file.filename}`;
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      user.profilePicture = imagePath;
      await user.save();

      res.json({ profileImage: imagePath });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving profile picture' });
    }
  });
};


// Get User Profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  const { name, email, profilePicture } = req.body;
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.profilePicture = profilePicture || user.profilePicture;

    const updatedUser = await user.save();
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  uploadProfilePicture,
  getUserProfile,
  updateUserProfile,
};