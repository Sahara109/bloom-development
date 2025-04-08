const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Utility to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Controller function for registering user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
  }
  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }
      const newUser = new User({
          name,
          email,
          password,
      });
      await newUser.save();

      // Generate token and return user data
      const token = generateToken(newUser._id);
      res.status(201).json({
          message: 'User registered successfully',
          token,
          user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email,
          },
      });
  } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ message: 'Error registering user' });
  }
};


// Controller function for logging in user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt for email:', email);

  try {
      const user = await User.findOne({ email });
      console.log('User found:', user);

      if (!user) {
          console.log('No user found with that email');
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check hashed password
      const match = await bcrypt.compare(password, user.password);
      console.log('Password match:', match);

      if (!match) {
          console.log('Password does not match');
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate token if password matches
      const token = generateToken(user._id);
      console.log('Generated token:', token);

      res.status(200).json({
          message: 'Login successful',
          token,
          user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role 
          },
      });
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in' });
  }
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

const getUser = async (req, res) => {
  console.log('getUser called');
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Update user profile
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUser,
  updateUser,
  deleteUser,
};
