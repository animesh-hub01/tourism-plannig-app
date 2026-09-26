import Review from '../models/Review.js';
import Booking from '../models/Booking.js';
import asyncHandler from '../middleware/asyncHandler.js';
import recalculatePackageRating from '../utils/recalculatePackageRating.js';

// @route   GET /api/packages/:packageId/reviews
// @access  Public
export const getReviewsForPackage = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ package: req.params.packageId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: reviews });
});

// @route   POST /api/packages/:packageId/reviews
// @access  Private/Customer
export const createReview = asyncHandler(async (req, res) => {
  const { packageId } = req.params;
  const { rating, comment } = req.body;

  // Business rule: you can only review a package you've actually completed
  // a trip on. Enforced server-side, not just hidden in the UI.
  const hasCompletedBooking = await Booking.findOne({
    user: req.user._id,
    package: packageId,
    status: 'completed',
  });

  if (!hasCompletedBooking) {
    res.status(403);
    throw new Error('You can only review packages you have completed a booking for');
  }

  const existingReview = await Review.findOne({ user: req.user._id, package: packageId });
  if (existingReview) {
    res.status(400);
    throw new Error('You have already reviewed this package');
  }

  const review = await Review.create({ user: req.user._id, package: packageId, rating, comment });

  await recalculatePackageRating(packageId);

  res.status(201).json({ success: true, data: review });
});

// @route   DELETE /api/reviews/:id
// @access  Private (owner or admin)
export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  const isOwner = review.user.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) {
    res.status(403);
    throw new Error('Not authorized to delete this review');
  }

  const packageId = review.package;
  await review.deleteOne();
  await recalculatePackageRating(packageId);

  res.json({ success: true, message: 'Review deleted' });
});