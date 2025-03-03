const express = require('express');
const Story = require('../models/story');
const router = express.Router();

// Route to fetch all stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Route to create a new story
router.post('/stories', async (req, res) => {
  const { name, story, image } = req.body;

  if (!name || !story) {
    return res.status(400).json({ msg: 'Name and story are required' });
  }

  try {
    const newStory = new Story({
      name,
      story,
      image
    });

    await newStory.save();
    res.json(newStory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
