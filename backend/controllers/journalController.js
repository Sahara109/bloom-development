// controllers/journalController.js
const Journal = require('../models/Journal');

// Create a new journal entry
const createJournal = async (req, res) => {
    const { title, content, date } = req.body;
    try {
        const newJournal = new Journal({
            title,
            content,
            date,
        });
        await newJournal.save();
        res.status(201).json(newJournal);
    } catch (error) {
        res.status(500).json({ message: 'Error creating journal entry', error });
    }
};

// Get all journal entries
const getJournals = async (req, res) => {
    try {
        const journals = await Journal.find();
        res.status(200).json(journals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching journal entries', error });
    }
};

// Get a single journal entry by ID
const getJournalById = async (req, res) => {
    const { id } = req.params;
    try {
        const journal = await Journal.findById(id);
        if (!journal) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }
        res.status(200).json(journal);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching journal entry', error });
    }
};

// Update a journal entry
const updateJournal = async (req, res) => {
    const { id } = req.params;
    const { title, content, date } = req.body;
    try {
        const updatedJournal = await Journal.findByIdAndUpdate(
            id,
            { title, content, date },
            { new: true }
        );
        res.status(200).json(updatedJournal);
    } catch (error) {
        res.status(500).json({ message: 'Error updating journal entry', error });
    }
};

// Delete a journal entry
const deleteJournal = async (req, res) => {
    const { id } = req.params;
    try {
        await Journal.findByIdAndDelete(id);
        res.status(200).json({ message: 'Journal entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting journal entry', error });
    }
};

module.exports = {
    createJournal,
    getJournals,
    getJournalById,  
    updateJournal,
    deleteJournal,
};
