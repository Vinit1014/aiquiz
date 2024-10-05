const {Quiz} = require('../models/quizModel');
const { generateHint } = require('../services/hintService');

const getHint = async (req, res) => {
    const { quizId, questionId } = req.body;
    console.log(quizId);

    if (!quizId || !questionId) {
        return res.status(400).json({ message: 'quizId and questionId are required' });
    }
    
    try {
        // Find the quiz by quizId
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Find the specific question by questionId
        const question = quiz.questions.find(q => q.questionId === questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found in the quiz' });
        }

        // Extract the question text
        const questionText = question.questionText;
        
        // Generate hint using AI
        const hint = await generateHint(questionText);

        res.status(200).json({ hint });
    } catch (error) {
        console.error('Error fetching hint:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getHint };
