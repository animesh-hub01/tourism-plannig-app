import express from 'express';
import { body } from 'express-validator';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} from '../controllers/bookingController.js';
import { authenticate } from '../middleware/auth.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

// All booking routes require a logged-in user
router.use(authenticate);

router.post(
  '/',
  [
    body('packageId').notEmpty().withMessage('packageId is required'),
    body('travelDate').isISO8601().withMessage('Valid travelDate is required'),
    body('travelers.adults').isInt({ min: 1 }).withMessage('At least 1 adult traveler is required'),
  ],
  validateRequest,
  createBooking
);

router.get('/my', getMyBookings);
router.get('/:id', getBookingById);
router.patch('/:id/cancel', cancelBooking);

export default router;