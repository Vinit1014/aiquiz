const { fetchQuizHistory } = require('../services/quizHistoryService');

const getQuizHistory = async (req, res) => {
    const { grade, subject, marks, from, to, completedDate } = req.body; // Accept filters as query parameters
    try {
        const history = await fetchQuizHistory({ grade, subject, marks, from, to, completedDate });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getQuizHistory };
