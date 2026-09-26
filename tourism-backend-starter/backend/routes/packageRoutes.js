import express from 'express';
import {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} from '../controllers/packageController.js';
import { authenticate, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public - anyone can browse packages, no login needed
router.get('/', getPackages);
router.get('/:id', getPackageById);

// Admin only - this is the "hidden" functionality. There is no link to
// these routes anywhere in the customer app; they only exist for the
// separate admin frontend, and are enforced here regardless of what
// frontend calls them.
router.post('/', authenticate, requireRole('admin'), createPackage);
router.put('/:id', authenticate, requireRole('admin'), updatePackage);
router.delete('/:id', authenticate, requireRole('admin'), deletePackage);

export default router;
