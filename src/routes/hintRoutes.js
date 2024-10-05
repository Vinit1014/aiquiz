const express = require('express');
const { getHint } = require('../controllers/hintController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /quiz/hint:
 *   post:
 *     summary: Get a hint for a specific question in a quiz
 *     tags: [Hints]
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
 *                 description: The ID of the quiz
 *               questionId:
 *                 type: string
 *                 description: The ID of the question for which to retrieve a hint
 *     responses:
 *       200:
 *         description: A hint for the specified question
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hint:
 *                   type: string
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       400:
 *         description: Bad request, invalid input data
 */

// POST endpoint to retrieve a hint for a specific question
router.post('/hint', authenticateToken, getHint);

module.exports = router;
