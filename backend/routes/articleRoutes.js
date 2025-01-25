const express = require('express');
const { createArticle, getArticles, getArticleById, updateArticle, deleteArticle } = require('../controllers/articleController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Article routes

router.post('/', authenticateUser, createArticle);
router.get('/', getArticles);
router.get('/:id', getArticleById);
router.put('/:id', authenticateUser, updateArticle);
router.delete('/:id', authenticateUser, deleteArticle);

module.exports = router;
