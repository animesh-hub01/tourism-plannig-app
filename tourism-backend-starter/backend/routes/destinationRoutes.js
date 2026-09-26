import express from 'express';
import {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} from '../controllers/destinationController.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/', getDestinations);
router.get('/:id', getDestinationById);

// Admin only
router.post('/', authenticate, requireRole('admin'), createDestination);
router.put('/:id', authenticate, requireRole('admin'), updateDestination);
router.delete('/:id', authenticate, requireRole('admin'), deleteDestination);

export default router;