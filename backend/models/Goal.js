const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  targetFrequency: {
    type: Number,
    required: true,
  },
  progressCount: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  endDate: {
    type: Date,
  }
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);
