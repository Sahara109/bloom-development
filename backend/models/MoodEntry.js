const mongoose = require('mongoose');

const MoodEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mood: { type: String, required: true }, // e.g., '😊', '😞'
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoodEntry', MoodEntrySchema);
