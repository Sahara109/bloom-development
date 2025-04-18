const express = require('express');
const Story = require('../models/story');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// POST request to create a new story
router.post('/stories', protect, async (req, res) => {
  try {
    const { title, content, image } = req.body;

    // Make sure all fields are provided
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Create a new story in the database
    const newStory = await Story.create({
      title,
      content,
      image,
      user: req.user._id, // User id from the decoded token
    });

    // Return the created story as response
    res.status(201).json(newStory);
  } catch (error) {
    console.error('Error posting story:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET request to fetch all stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find(); // Fetch all stories from the database
    res.json(stories); // Send the stories as a response
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this route to your existing router
router.get('/stories/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id); // Find a story by its ID
    if (!story) {
      return res.status(404).json({ message: 'Story not found' }); // Return 404 if the story is not found
    }
    res.json(story); // Send the story as a response
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ message: 'Server error' }); // Handle any other errors
  }
});


module.exports = router;
