import express from 'express';
import { body } from 'express-validator';
import { subscribe } from '../controllers/newsletterController.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

router.post(
  '/subscribe',
  [body('email').isEmail().withMessage('Valid email is required')],
  validateRequest,
  subscribe
);

export default router;