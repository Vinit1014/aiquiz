
const { Quiz, Submission } = require("../models/quizModel");
const { sendEmail } = require('../services/emailService');
const { generateSuggestions } = require('../services/GroqResponses/suggestions');
const { generateQuizQuestions } = require('../services/GroqResponses/quizQuestions');

const createNewQuiz = async (quizData) => {
    const { grade, subject, totalQuestions, maxScore, difficulty } = quizData;
    
    const questions = await generateQuizQuestions(grade, subject, totalQuestions, difficulty);

    const quiz = new Quiz({
        grade,
        subject,
        totalQuestions,
        maxScore,
        difficulty,
        questions,
    });

    await quiz.save();
    return quiz;
};

const submitUserQuiz = async (quizId, userId, responses, username) => {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
        throw new Error("Quiz not found");
    }

    let correctAnswers = 0;
    const incorrectResponses = [];

    // Analyze responses to find correct and incorrect answers
    responses.forEach((response) => {
        const question = quiz.questions.find(
            (q) => q.questionId === response.questionId
        );
        if (question && question.correctAnswer === response.userResponse) {
            correctAnswers++;
        } else {
            incorrectResponses.push({ question, userResponse: response.userResponse });
        }
    });

    // Calculate marks
    const marks = correctAnswers;

    // Save the submission to the database
    const submission = new Submission({
        quizId,
        userId,
        responses,
        marks,
    });
    await submission.save();

    // Use Groq AI to generate suggestions based on incorrect responses
    const suggestions = await generateSuggestions(incorrectResponses);

    // Prepare the email content
    const subject = 'Your Quiz Results and Suggestions for Improvement';
    const text = `You scored ${marks} in the quiz!\n\nHere are two suggestions to improve your skills:\n\n${suggestions}`;
    
    // Send email with the score and AI-generated suggestions
    await sendEmail(username, subject, text);

    return { submission, marks };
};

module.exports = { createNewQuiz, submitUserQuiz };
