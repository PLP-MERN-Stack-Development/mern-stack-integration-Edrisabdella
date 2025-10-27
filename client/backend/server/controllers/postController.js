import Post from '../models/Post.js';
import { validationResult } from 'express-validator';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const skip = (page - 1) * limit;

    let query = { isPublished: true };
    if (category && category !== 'all') {
      query.category = category;
    }

    const posts = await Post.find(query)
      .populate('author', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      posts,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('category', 'name')
      .populate('comments.user', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment view count
    post.viewCount += 1;
    await post.save();

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postData = {
      ...req.body,
      author: req.user.id,
    };

    if (req.file) {
      postData.featuredImage = req.file.filename;
    }

    const post = await Post.create(postData);
    await post.populate('author', 'name email');
    await post.populate('category', 'name');

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to update this post' });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.featuredImage = req.file.filename;
    }

    post = await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate('author', 'name email').populate('category', 'name');

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      user: req.user.id,
      content,
    };

    post.comments.push(comment);
    await post.save();

    await post.populate('comments.user', 'name');

    res.status(201).json({
      success: true,
      comments: post.comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Search posts
// @route   GET /api/posts/search
// @access  Public
export const searchPosts = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const posts = await Post.find({
      isPublished: true,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { excerpt: { $regex: q, $options: 'i' } },
      ],
    })
      .populate('author', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};