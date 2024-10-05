require("dotenv").config();

const express = require("express");
const app = express();
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Quizzer Backend APIs",
        description:
        "I am Vinit Prajapati. Here is Quizzer API application made with Express and documented with Swagger",
        version: "0.1",
      },
      servers: [
        {
          url: "http://34.227.100.139:3000/",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./src/routes/*.js"], 
  };
  
  
const specs = swaggerJsdoc(options);
app.use(
"/api-docs",
swaggerUi.serve,
swaggerUi.setup(specs)
);

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const hintRoutes = require("./routes/hintRoutes");
const quizHistoryRoutes = require("./routes/quizHistoryRoutes");

const connectDB = require("./utils/db");

// Middleware
app.use(express.json());

connectDB();
// Routes
app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/api/quizzes", quizHistoryRoutes);
app.use("/quiz", hintRoutes);

app.get("/test", (req, res) => {
  res.send("Hello from server");
});

app.listen(3000, (req, res) => {
  console.log("Running on port 3000");
});
module.exports = app;
