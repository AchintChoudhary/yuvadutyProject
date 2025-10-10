// FILE: backend/controllers/post.controller.js
const Post = require("../models/post.model");
const { validationResult } = require("express-validator");
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// Create a new post
module.exports.createPost = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { title, description, category, location, tags, localAuthority, isPublic } = req.body;
    
    // Handle image upload to Cloudinary from memory storage
    const imageUploads = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        imageUploads.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    }

    const post = await Post.create({
      title,
      description,
      category,
      location,
      author: req.user._id,
      images: imageUploads,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      localAuthority,
      isPublic: isPublic !== 'false'
    });

    // Populate author details
    await post.populate('author', 'firstName lastName email');

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error while creating post' });
  }
};

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'civicconnect/posts',
        resource_type: 'image'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// Get all posts with pagination and filtering
module.exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filter = {};
    
    // Filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    // Filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    // Filter by author
    if (req.query.author) {
      filter.author = req.query.author;
    }

    // Only show public posts unless it's the author
    if (!req.user || req.query.author !== req.user._id.toString()) {
      filter.isPublic = true;
    }

    const posts = await Post.find(filter)
      .populate('author', 'firstName lastName')
      .populate('comments.user', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(filter);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error while fetching posts' });
  }
};

// Get single post
module.exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'firstName lastName')
      .populate('comments.user', 'firstName lastName');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if post is public or user is author
    if (!post.isPublic && (!req.user || post.author._id.toString() !== req.user._id.toString())) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error while fetching post' });
  }
};

// Add comment to post
module.exports.addComment = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try {
    const { content } = req.body;
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      user: req.user._id,
      content
    };

    post.comments.push(comment);
    await post.save();

    await post.populate('comments.user', 'firstName lastName');

    res.status(201).json({
      message: 'Comment added successfully',
      comment: post.comments[post.comments.length - 1]
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error while adding comment' });
  }
};

// Like/unlike post
module.exports.toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
      await post.save();
      res.status(200).json({ message: 'Post unliked', liked: false });
    } else {
      // Like
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: 'Post liked', liked: true });
    }
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({ message: 'Server error while toggling like' });
  }
};

// Upvote post
module.exports.upvotePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id;
    const upvoteIndex = post.upvotes.indexOf(userId);

    if (upvoteIndex > -1) {
      // Remove upvote
      post.upvotes.splice(upvoteIndex, 1);
      await post.save();
      res.status(200).json({ message: 'Upvote removed', upvoted: false });
    } else {
      // Add upvote
      post.upvotes.push(userId);
      await post.save();
      res.status(200).json({ message: 'Post upvoted', upvoted: true });
    }
  } catch (error) {
    console.error('Upvote post error:', error);
    res.status(500).json({ message: 'Server error while upvoting post' });
  }
};

// Update post status
module.exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    post.status = status;
    await post.save();

    res.status(200).json({ message: 'Post status updated', post });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error while updating status' });
  }
};

// Delete post
module.exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete images from Cloudinary
    if (post.images.length > 0) {
      for (const image of post.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error while deleting post' });
  }
};