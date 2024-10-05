const express = require('express');
const { createQuiz, submitQuiz } = require('../controllers/quizController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Quiz:
 *       type: object
 *       required:
 *         - grade
 *         - subject
 *         - totalQuestions
 *         - maxScore
 *         - difficulty
 *       properties:
 *         grade:
 *           type: integer
 *           description: The grade level for the quiz
 *         subject:
 *           type: string
 *           description: The subject of the quiz
 *         totalQuestions:
 *           type: integer
 *           description: Total number of questions in the quiz
 *         maxScore:
 *           type: integer
 *           description: Maximum score for each question
 *         difficulty:
 *           type: string
 *           description: Difficulty level (EASY, MEDIUM, HARD)
 *       example:
 *         grade: 7
 *         subject: Science
 *         totalQuestions: 3
 *         maxScore: 1
 *         difficulty: EASY
 *
 *     Question:
 *       type: object
 *       properties:
 *         questionId:
 *           type: string
 *           description: Unique identifier for the question
 *         questionText:
 *           type: string
 *           description: The text of the question
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: List of possible answers
 *         correctAnswer:
 *           type: string
 *           description: Index of the correct answer in options array
 *       example:
 *         questionId: "q1"
 *         questionText: "Which planet in our solar system is known as the Red Planet?"
 *         options: ["Mercury", "Mars", "Jupiter", "Venus"]
 *         correctAnswer: "2"
 *
 *     QuizResponse:
 *       type: object
 *       properties:
 *         grade:
 *           type: integer
 *         subject:
 *           type: string
 *         totalQuestions:
 *           type: integer
 *         maxScore:
 *           type: integer
 *         difficulty:
 *           type: string
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Question'
 *         _id:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         __v:
 *           type: integer
 *       example:
 *         grade: 7
 *         subject: GK
 *         totalQuestions: 3
 *         maxScore: 1
 *         difficulty: EASY
 *         questions: 
 *           - questionId: "q1"
 *             questionText: "Which planet in our solar system is known as the Red Planet?"
 *             options: ["Mercury", "Mars", "Jupiter", "Venus"]
 *             correctAnswer: "2"
 *           - questionId: "q2"
 *             questionText: "Which of the following rivers is the longest in South America?"
 *             options: ["Amazon River", "Rio Grande", "Orinoco River", "Nile River"]
 *             correctAnswer: "1"
 *           - questionId: "q3"
 *             questionText: "What is the world's largest desert?"
 *             options: ["Sahara Desert", "Gobi Desert", "Mongolian Desert", "Arctic Desert"]
 *             correctAnswer: "1"
 *         _id: "66efdeb195f1619a62d02077"
 *         createdAt: "2024-09-22T09:09:05.928Z"
 *         __v: 0
 */

/**
 * @swagger
 * /quiz/create:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Quiz'
 *     responses:
 *       200:
 *         description: Quiz created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QuizResponse'
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       400:
 *         description: Bad request, invalid input data
 */


router.post('/create', authenticateToken, createQuiz);

/**
 * @swagger
 * /quiz/submit:
 *   post:
 *     summary: Submit a quiz
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quizId:
 *                 type: string
 *                 description: The ID of the quiz being submitted
 *               username:
 *                 type: string
 *                 description: The username of the user submitting the quiz
 *               responses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                       description: The ID of the question
 *                     userResponse:
 *                       type: string
 *                       description: The user's response to the question
 *     responses:
 *       201:
 *         description: Quiz submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 submission:
 *                   type: object
 *                   properties:
 *                     quizId:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     responses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           questionId:
 *                             type: string
 *                           userResponse:
 *                             type: string
 *                           _id:
 *                             type: string
 *                     marks:
 *                       type: number
 *                     retry:
 *                       type: boolean
 *                     _id:
 *                       type: string
 *                     submittedAt:
 *                       type: string
 *                       format: date-time
 *                 marks:
 *                   type: number
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       400:
 *         description: Bad request, invalid input data
 */


router.post('/submit', authenticateToken, submitQuiz);

module.exports = router;
