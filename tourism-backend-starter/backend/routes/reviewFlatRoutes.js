import express from 'express';
import { deleteReview } from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.delete('/:id', authenticate, deleteReview);

export default router;