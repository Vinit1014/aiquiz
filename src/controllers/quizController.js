const { createNewQuiz, submitUserQuiz } = require('../services/quizService');
const User = require('../models/userModel');

const createQuiz = async (req, res) => {
    const quizData = req.body;
    const quiz = await createNewQuiz(quizData);
    res.status(201).json(quiz);
};

const submitQuiz = async (req, res) => {
    const { quizId, username, responses } = req.body; // Change userId to username
    
    try {
        // Fetch the user based on username
        const user = await User.findOne({ username }); // Search by username
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Pass the user._id along with the other details
        const submission = await submitUserQuiz(quizId, user._id, responses, user.username);

        res.status(201).json(submission);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting quiz', error: error.message });
    }
}

module.exports = { createQuiz, submitQuiz};
