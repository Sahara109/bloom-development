const express = require('express');
const { createVideo, getVideos, getVideoById, updateVideo, deleteVideo } = require('../controllers/videoController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Video routes
router.post('/create', authenticateUser, createVideo);
router.get('/', getVideos);
router.get('/:id', getVideoById);
router.put('/:id', authenticateUser, updateVideo);
router.delete('/:id', authenticateUser, deleteVideo);

module.exports = router;
