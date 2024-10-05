require('dotenv').config();
const jwt = require("jsonwebtoken");
 
const generateToken = (payload) => {
  return jwt.sign( payload , process.env.JWT_SECRET, { expiresIn: "8h" });
  // return jwt.sign( payload , '123456', { expiresIn: "8h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
  // return jwt.verify(token, '123456');
};

module.exports = { generateToken, verifyToken }
