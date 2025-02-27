const express = require('express');
const { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware'); // Destructure protect
const isAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

// Admin-only routes for articles
router.post('/', protect, isAdmin, createArticle);
router.put('/:id', protect, isAdmin, updateArticle);
router.delete('/:id', protect, isAdmin, deleteArticle);

// Public routes
router.get('/', getArticles);
router.get('/:id', getArticleById);

module.exports = router;