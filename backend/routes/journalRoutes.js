const express = require('express');
const { createJournal, getJournals, getJournalById, updateJournal, deleteJournal } = require('../controllers/journalController');
const protect = require('../middleware/authMiddleware'); // Update the import to use 'protect' middleware

const router = express.Router();

// Journal routes
router.post('/create', protect, createJournal); // Use 'protect' middleware here
router.get('/', getJournals);
router.get('/:id', getJournalById);
router.put('/:id', protect, updateJournal); // Use 'protect' middleware here
router.delete('/:id', protect, deleteJournal); // Use 'protect' middleware here

module.exports = router;
