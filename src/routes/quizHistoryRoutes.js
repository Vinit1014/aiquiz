const express = require('express');
const { getQuizHistory } = require('../controllers/quizHistoryController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /quiz/history:
 *   get:
 *     summary: Get quiz history based on filters
 *     tags: [Quiz History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: grade
 *         required: false
 *         schema:
 *           type: integer
 *         description: Grade filter for the quiz history
 *       - in: query
 *         name: subject
 *         required: false
 *         schema:
 *           type: string
 *         description: Subject filter for the quiz history
 *       - in: query
 *         name: marks
 *         required: false
 *         schema:
 *           type: integer
 *         description: Marks filter for the quiz history
 *       - in: query
 *         name: from
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date filter for quiz submissions
 *       - in: query
 *         name: to
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: End date filter for quiz submissions
 *     responses:
 *       200:
 *         description: A list of quiz history entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   quizId:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       grade:
 *                         type: integer
 *                       subject:
 *                         type: string
 *                   responses:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         questionId:
 *                           type: string
 *                         userResponse:
 *                           type: string
 *                         _id:
 *                           type: string
 *                   marks:
 *                     type: integer
 *                   retry:
 *                     type: boolean
 *                   submittedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       400:
 *         description: Bad request, invalid input data
 */

// GET endpoint to retrieve quiz history based on filters
router.get('/history', authenticateToken, getQuizHistory);

module.exports = router;
