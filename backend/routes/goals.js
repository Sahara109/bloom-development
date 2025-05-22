const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// Create a new goal
router.post('/create', async (req, res) => {
  const { userId, title, targetFrequency, endDate } = req.body;

  if (!userId || !title || !targetFrequency) {
    return res.status(400).json({ msg: 'Missing required fields.' });
  }

  try {
    const newGoal = new Goal({
      userId,
      title,
      targetFrequency,
      endDate: endDate ? new Date(endDate) : undefined,
    });

    await newGoal.save();
    res.status(201).json({ msg: 'Goal created successfully!', goal: newGoal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Update progress (increment progressCount)
router.post('/progress', async (req, res) => {
  const { userId, goalId } = req.body;

  if (!userId || !goalId) {
    return res.status(400).json({ msg: 'Missing userId or goalId.' });
  }

  try {
    const goal = await Goal.findOne({ _id: goalId, userId });
    if (!goal) return res.status(404).json({ msg: 'Goal not found' });

    if (!goal.completed) {
      goal.progressCount += 1;
      if (goal.progressCount >= goal.targetFrequency) {
        goal.completed = true;
      }
      await goal.save();
    }

    res.json({ msg: 'Progress updated', goal });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get all goals for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const goals = await Goal.find({ userId });
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching goals', error: err.message });
  }
});

module.exports = router;
