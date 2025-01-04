// models/User.js
const mongoose = require('mongoose');

// Create a schema for the user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures the email is unique
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'default-profile.jpg' // Placeholder for the profile picture
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
