// FILE: backend/app.js
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// MongoDB connection string
const url = process.env.MONGO_URL;

// ✅ Allowed origins (local + production)
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://yuvaduty-project-ibuj.vercel.app" // production
];

// ✅ CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. Postman, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ MongoDB connection
mongoose
  .connect(url)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
  });

// ✅ Routes
app.use("/users", require("./routes/user.routes"));
app.use("/posts", require("./routes/post.routes"));
// Test route
app.get("/", (req, res) => {
  res.send("CivicConnect API Server");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
