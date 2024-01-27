const express = require("express");
const { UserModel } = require("../models/userModel");
const jwt = require('jsonwebtoken');
const router = express.Router();

// verify the token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token not provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'key');
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const tokenStore = {};

/* Login route */
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await UserModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, 'key', { expiresIn: '20m' });

    // Save the token 
    const tokenId = user._id.toString();
    tokenStore[tokenId] = token;

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get("/token", verifyToken, (req, res) => {
  // Access the user ID from the decoded token
  const userId = req.user;

  // Retrieve the token 
  const token = tokenStore[userId];

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  res.json({ message: 'Welcome.' });
});


router.post("/logout", verifyToken, (req, res) => {
  const userId = req.user;

  // Remove the token 
  delete tokenStore[userId];

  res.json({ message: 'Logout successful' });
});
module.exports = router;