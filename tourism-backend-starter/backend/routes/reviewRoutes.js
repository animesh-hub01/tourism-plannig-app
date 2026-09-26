import express from 'express';
import { body } from 'express-validator';
import { getReviewsForPackage, createReview } from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';
import validateRequest from '../middleware/validateRequest.js';

// mergeParams lets this router read :packageId from the parent route
const router = express.Router({ mergeParams: true });

router.get('/', getReviewsForPackage);

router.post(
  '/',
  authenticate,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required'),
  ],
  validateRequest,
  createReview
);

export default router;