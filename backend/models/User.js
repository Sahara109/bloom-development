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
    role: {
        type: String,
        enum: ['user', 'admin'], // The role can either be 'user' or 'admin'
        default: 'user' // Default to 'user' if not specified
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Hash password before saving if password is modified
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip hashing if password is not modified
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (err) {
        next(err); // Pass error to the next middleware if something goes wrong
    }
});

// Method to compare passwords (for login)
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); // Compare input password with hashed password
};

// Create the model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;