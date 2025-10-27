const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const { validatePost } = require('../middleware/validationMiddleware');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, validatePost, createPost);

router.route('/search')
  .get(searchPosts);

router.route('/:id')
  .get(getPost)
  .put(protect, validatePost, updatePost)
  .delete(protect, deletePost);

router.route('/:id/comments')
  .post(protect, addComment);

module.exports = router;