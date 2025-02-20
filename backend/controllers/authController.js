const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

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
        console.log('User registered successfully:', newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Error registering user' });
    }
};

const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    console.log('Login attempt for email:', email);
  
    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        console.log('User found:', user);
  
        if (!user) {
            console.log('No user found with that email');
            return res.status(400).json({ message: 'Invalid email or password' });
        }
  
        // Compare password with hashed password in database
        const match = await bcrypt.compare(password, user.password);
        console.log('Password match:', match);
  
        if (!match) {
            console.log('Password does not match');
            return res.status(400).json({ message: 'Invalid email or password' });
        }
  
        // Check if the user role is set
        console.log('User role:', user.role);
  
        // Generate a JWT token if password matches
        const token = generateToken(user);
        console.log('Generated token:', token);
  
        // Send the token and user data back to the frontend
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error logging in:', error); 
        res.status(500).json({ message: 'Error logging in' });
    }
};

module.exports = { registerUser, loginUser };