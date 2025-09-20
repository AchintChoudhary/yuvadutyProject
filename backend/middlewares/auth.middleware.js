// FILE: backend/middlewares/auth.middleware.js
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Check if token is blacklisted
    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token invalid. Please login again." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Token invalid. User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token. Please login again." });
    }
    
    console.error('Auth middleware error:', err);
    res.status(500).json({ message: "Server error during authentication" });
  }
};