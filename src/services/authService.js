const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken } = require('../utils/jwt');

const saltRounds = 10; 

const loginUser = async (username, password) => {
    let user = await User.findOne({ username });
    if (!user) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user = new User({ username, password: hashedPassword });
        await user.save();
    } else {
        // Compare the stored hashed password with the provided password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new Error('Invalid username or password');
        }
    }

    const token = generateToken({ userId: user._id, username: user.username });
    return token;
}

module.exports = {loginUser}