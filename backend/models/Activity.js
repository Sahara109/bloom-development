const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,  // optional 
  },
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
