const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Create the model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
