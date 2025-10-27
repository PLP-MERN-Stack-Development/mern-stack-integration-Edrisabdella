const { body } = require('express-validator');

const validatePost = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 characters'),
  body('content')
    .not()
    .isEmpty()
    .withMessage('Content is required'),
  body('category')
    .not()
    .isEmpty()
    .withMessage('Category is required'),
];

module.exports = {
  validatePost,
};