const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to user
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // Optional image
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storySchema);
