import express from 'express';
import { body } from 'express-validator';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Validation rules
const postValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required'),
];

router.get('/', getPosts);
router.get('/search', searchPosts);
router.get('/:id', getPost);
router.post('/', protect, upload.single('featuredImage'), postValidation, createPost);
router.put('/:id', protect, upload.single('featuredImage'), postValidation, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/comments', protect, addComment);

export default router;