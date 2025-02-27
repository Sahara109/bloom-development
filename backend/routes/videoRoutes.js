const express = require('express');
const { createVideo, getVideos, getVideoById, updateVideo, deleteVideo } = require('../controllers/videoController');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

// Video routes
router.post('/', protect, createVideo);
router.get('/', getVideos);
router.get('/:id', getVideoById);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);

module.exports = router;
