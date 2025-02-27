const Article = require('../models/Article');

// Create a new article
const createArticle = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newArticle = new Article({
            title,
            content,
        });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating article', error });
    }
};

// Get all articles
const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
};

// Get a single article by ID
const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching article', error });
    }
};

// Update an article
const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: 'Error updating article', error });
    }
};

// Delete an article
const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        await Article.findByIdAndDelete(id);
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
};

module.exports = {
    createArticle,
    getArticles,
    getArticleById, 
    updateArticle,
    deleteArticle,
};