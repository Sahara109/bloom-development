const express = require('express');
const { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } = require('../controllers/articleController');
const authenticateUser = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

// Admin-only routes for articles
router.post('/', authenticateUser, isAdmin, createArticle);
router.put('/:id', authenticateUser, isAdmin, updateArticle);
router.delete('/:id', authenticateUser, isAdmin, deleteArticle);

// Public routes
router.get('/', getArticles);
router.get('/:id', getArticleById);

module.exports = router;
