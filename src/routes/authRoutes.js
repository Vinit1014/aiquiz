const express = require("express");
const { login } = require("../controllers/authController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's email or username
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         username: "v10@gmail.com"
 *         password: "123"
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token
 *       example:
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmVlOWY3YzkwNGMwNzU0ODBjOWRjMTIiLCJ1c2VybmFtZSI6InYxbjF0czAwMTBAZ21haWwuY29tIiwiaWF0IjoxNzI2OTkwMDMxLCJleHAiOjE3MjcwMzF9.rKC9KhuafNWdM_eoOyuUI1iXNEiBEuiZ0QvhACYwzDk"
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid credentials
 */


router.post("/login", login);

module.exports = router;
