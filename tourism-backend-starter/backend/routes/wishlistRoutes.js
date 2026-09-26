import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticate);

router.get('/', getWishlist);
router.post('/:packageId', addToWishlist);
router.delete('/:packageId', removeFromWishlist);

export default router;