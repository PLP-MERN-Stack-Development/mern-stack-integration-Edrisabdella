import express from 'express';
import { body } from 'express-validator';
import {
  getCategories,
  createCategory,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCategories);
router.post(
  '/',
  protect,
  admin,
  [body('name').notEmpty().withMessage('Category name is required')],
  createCategory
);

export default router;