// FILE: backend/routes/post.routes.js
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const uploadMiddleware = require('../middlewares/upload.middleware');

// All routes require authentication
router.use(authMiddleware.authUser);

// Create post with image upload
router.post("/", 
  uploadMiddleware.array('images', 5), // Max 5 images
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("location").notEmpty().withMessage("Location is required")
  ],
  postController.createPost
);

// Get all posts (with optional filtering)
router.get("/", postController.getPosts);

// Get single post
router.get("/:id", postController.getPost);

// Add comment to post
router.post("/:id/comments",
  [
    body("content").notEmpty().withMessage("Comment content is required")
  ],
  postController.addComment
);

// Like/unlike post
router.post("/:id/like", postController.toggleLike);

// Upvote post
router.post("/:id/upvote", postController.upvotePost);

// Update post status
router.patch("/:id/status",
  [
    body("status").isIn(['pending', 'in_progress', 'resolved', 'closed']).withMessage("Invalid status")
  ],
  postController.updateStatus
);

// Delete post
router.delete("/:id", postController.deletePost);

module.exports = router;