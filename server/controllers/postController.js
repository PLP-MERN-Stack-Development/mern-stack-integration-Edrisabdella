const Post = require('../models/Post');
const Category = require('../models/Category');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;

    let query = {};
    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    const posts = await Post.find(query)
      .populate('author', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalPosts: count,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('category', 'name')
      .populate('comments.user', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment view count
    post.viewCount += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, category, tags, featuredImage } = req.body;

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const post = new Post({
      title,
      content,
      excerpt,
      category,
      tags,
      featuredImage,
      author: req.user._id, // from auth middleware
    });

    const createdPost = await post.save();
    await createdPost.populate('author', 'name email');
    await createdPost.populate('category', 'name');

    res.status(201).json(createdPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res, next) => {
  try {
    const { title, content, excerpt, category, tags, featuredImage } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is the author or an admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to update this post' });
    }

    // Check if category exists
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Category not found' });
      }
      post.category = category;
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.excerpt = excerpt || post.excerpt;
    post.tags = tags || post.tags;
    post.featuredImage = featuredImage || post.featuredImage;

    const updatedPost = await post.save();
    await updatedPost.populate('author', 'name email');
    await updatedPost.populate('category', 'name');

    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user is the author or an admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to delete this post' });
    }

    await Post.deleteOne({ _id: post._id });
    res.json({ message: 'Post removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      user: req.user._id,
      content,
    };

    post.comments.push(comment);
    await post.save();

    await post.populate('comments.user', 'name email');

    res.status(201).json(post.comments[post.comments.length - 1]);
  } catch (error) {
    next(error);
  }
};

// @desc    Search posts
// @route   GET /api/posts/search
// @access  Public
const searchPosts = async (req, res, next) => {
  try {
    const { q } = req.query;

    const posts = await Post.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { excerpt: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
      ],
    })
      .populate('author', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
};