import User from '../models/User.js';
import Package from '../models/Package.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'wishlist',
    match: { isActive: true },
    populate: { path: 'destination', select: 'name country' },
  });

  res.json({ success: true, data: user.wishlist });
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const { packageId } = req.params;

  const pkg = await Package.findById(packageId);
  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }

  // $addToSet avoids duplicate entries without needing to check first
  await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: packageId } });

  res.json({ success: true, message: 'Added to wishlist' });
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.params.packageId } });

  res.json({ success: true, message: 'Removed from wishlist' });
});