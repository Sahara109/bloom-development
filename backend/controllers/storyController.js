const Story = require("../models/story");

const getStories = async (req, res) => {
  const stories = await Story.find({});
  res.json(stories);
};

const addStory = async (req, res) => {
  const { name, story } = req.body;
  let image = '';

  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  const newStory = new Story({
    name,
    story,
    image,
  });

  const savedStory = await newStory.save();
  res.status(201).json(savedStory);
};

module.exports = { getStories, addStory };