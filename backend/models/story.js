const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  story: { type: String, required: true },
  image: { type: String, default: '' }, // You can store image URLs if provided
  createdAt: { type: Date, default: Date.now }
});

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;
