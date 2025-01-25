const express = require('express');
const { createJournal, getJournals, getJournalById, updateJournal, deleteJournal } = require('../controllers/journalController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Journal routes
router.post('/create', authenticateUser, createJournal);
router.get('/', getJournals);
router.get('/:id', getJournalById);
router.put('/:id', authenticateUser, updateJournal);
router.delete('/:id', authenticateUser, deleteJournal);

module.exports = router;
