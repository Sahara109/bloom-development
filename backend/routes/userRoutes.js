const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');
const { registerUser, loginUser } = require('../controllers/authController'); // Import the controller
const router = express.Router();

router.post('/create-user', isAdmin, async (req, res) => {
    // Only an admin can create a new user
    const { name, email, password } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Route for user registration (using the controller)
router.post('/register', registerUser);

// POST route to login a user
router.post('/login', loginUser);

// POST route to logout a user
router.post('/logout', (req, res) => {
    // Optionally invalidate token on the client side
    res.status(200).json({ message: 'Logged out successfully' });
});

// GET route to fetch the user profile
// Profile route to get user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude the password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);  // Return the user data without the password
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
});

module.exports = router;