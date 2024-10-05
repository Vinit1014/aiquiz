
const mongoose = require('mongoose');

// Define schema for individual questions in the quiz
const questionSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

// Define quiz schema
const quizSchema = new mongoose.Schema({
  grade: { type: Number, required: true },
  subject: { type: String, required: true },
  totalQuestions: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'], required: true },
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now },
});

// Define submission schema
const submissionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  responses: [
    {
      questionId: { type: String, required: true },
      userResponse: { type: String, required: true },
    },
  ],
  marks: { type: Number, required: true },
  submittedAt: {
    type: Date,
    default: () => {
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    },
  },
  
  retry: { type: Boolean, default: false },
});

const Quiz = mongoose.model('Quiz', quizSchema);
const Submission = mongoose.model('Submission', submissionSchema);

module.exports = { Quiz, Submission };
