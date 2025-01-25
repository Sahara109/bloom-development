require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');  // Import User model
const authenticateUser = require('./middleware/authMiddleware');  // Import authentication middleware
const userRoutes = require('./routes/userRoutes');  // Import user routes 
const articleRoutes = require('./routes/articleRoutes');  // Import article routes
const videoRoutes = require('./routes/videoRoutes');  // Import video routes
const journalRoutes = require('./routes/journalRoutes');  // Import journal routes

const app = express();
app.use(express.static('public')); // Serve static files from the "public" directory

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to BLOOM API');
});

// MongoDB Connection
const PORT = process.env.PORT || 5001;
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('MONGO_URI is not defined in .env file. Please add it.');
    process.exit(1);
}

mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(async () => {
        console.log('MongoDB connected successfully');
        
        const adminUser = await User.findOne({ email: 'admin@admin.com' });
        
        if (!adminUser) {
            const admin = new User({
                name: 'Admin',
                email: 'admin@admin.com',
                password: 'password123', // Make sure to hash this password
                role: 'admin',
            });

            await admin.save();
            console.log('Admin user created!');
        } else {
            console.log('Admin user already exists.');
        }
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Apply authentication middleware to routes that require it
app.use('/api/users', userRoutes);  // Apply userRoutes (this is correct)
app.use('/api/articles', authenticateUser, articleRoutes);  // Protected routes
app.use('/api/videos', authenticateUser, videoRoutes);  // Protected routes
app.use('/api/journals', authenticateUser, journalRoutes);  // Protected routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Generic Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
