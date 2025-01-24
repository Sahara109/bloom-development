require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.static('public')); // Serve static files from the "public" directory

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests

// Use the user routes
app.use('/api/users', userRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to BLOOM API');
});

// MongoDB Connection
const PORT = process.env.PORT || 5001; // Use the port from the .env file or default to 5001
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/bloom';

mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process if DB connection fails
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Generic Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
