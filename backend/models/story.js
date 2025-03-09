const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: String,
    content: String,
    userEmail: { type: String, required: true }, // Associate story with a user
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storySchema);
