import express from 'express';
import { getDashboardStats, getAllUsers } from '../controllers/adminController.js';
import { getAllBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Every route here requires a valid admin JWT - no other way in.
router.use(authenticate, requireRole('admin'));

router.get('/dashboard-stats', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/bookings', getAllBookings);
router.patch('/bookings/:id/status', updateBookingStatus);

export default router;