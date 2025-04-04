const Story = require("../models/story");

async function getStories(req, res) {
  try {
    const { userEmail } = req.query; // Get logged-in user's email from frontend

    const stories = await Story.find(); // Fetch all stories from the database
    res.json({
      myStories: stories.filter(story => story.userEmail === userEmail) || [],
      otherStories: stories.filter(story => story.userEmail !== userEmail) || []
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addStory(req, res) {
  try {
    const { title, content, userEmail } = req.body; // Get email from request

    const newStory = new Story({
      title,
      content,
      userEmail
    });

    await newStory.save(); // Save the story to the database
    res.status(201).json(newStory); // Return the added story in the response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getStories, addStory };
