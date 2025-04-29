const express = require('express');
const router = express.Router();
const MoodEntry = require('../models/MoodEntry');

// POST mood check-in (only once per day per user)
router.post('/checkin', async (req, res) => {
  const { userId, mood } = req.body;

  if (!userId || !mood) {
    return res.status(400).json({ msg: 'Missing userId or mood.' });
  }

  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Check if a mood entry already exists for today
    const existing = await MoodEntry.findOne({
      userId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (existing) {
      return res.status(400).json({ msg: 'Mood already checked in today' });
    }

    // Create new mood entry
    const newEntry = new MoodEntry({
      userId,
      mood,
      date: new Date()
    });

    await newEntry.save();
    res.status(201).json({ msg: 'Mood logged successfully!', entry: newEntry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// GET mood history for a user (sorted oldest to newest)
router.get('/:userId/history', async (req, res) => {
  const { userId } = req.params;

  try {
    const entries = await MoodEntry.find({ userId }).sort({ date: 1 }); // ascending by date
    res.status(200).json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching mood history', error: err.message });
  }
});

module.exports = router;
