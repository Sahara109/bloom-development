const bcrypt = require('bcryptjs'); // Using bcryptjs for better compatibility
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the path is correct

// Sign-up handler
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Save hashed password
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login handler
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    console.log('User found:', user); // Add this log to see the user fetched

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password with hashed password in database
    const match = await bcrypt.compare(password, user.password);
    console.log('Password entered:', password);
    console.log('Password in DB:', user.password);
    console.log('Do they match?', match);

    if (!match) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token if password matches
    const token = generateToken(user);

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};


module.exports = { registerUser, loginUser };
