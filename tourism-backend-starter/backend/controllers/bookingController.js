import Booking from '../models/Booking.js';
import Package from '../models/Package.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @route   POST /api/bookings
// @access  Private/Customer
export const createBooking = asyncHandler(async (req, res) => {
  const { packageId, travelDate, travelers } = req.body;

  const pkg = await Package.findById(packageId);
  if (!pkg || !pkg.isActive) {
    res.status(404);
    throw new Error('Package not found');
  }

  const totalTravelers = (travelers?.adults || 0) + (travelers?.children || 0);
  if (totalTravelers < 1) {
    res.status(400);
    throw new Error('At least one traveler is required');
  }
  if (totalTravelers > pkg.maxTravelers) {
    res.status(400);
    throw new Error(`This package allows a maximum of ${pkg.maxTravelers} travelers`);
  }

  // Price calculation happens server-side, never trust a price from the client
  const totalPrice = pkg.price * totalTravelers;

  const booking = await Booking.create({
    user: req.user._id,
    package: pkg._id,
    travelDate,
    travelers,
    totalPrice,
  });

  res.status(201).json({ success: true, data: booking });
});

// @route   GET /api/bookings/my
// @access  Private/Customer
export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('package', 'title images price duration')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: bookings });
});

// @route   GET /api/bookings/:id
// @access  Private (owner or admin)
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('package');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Ownership check - prevents IDOR (Insecure Direct Object Reference):
  // guessing another user's booking ID should never leak their data.
  const isOwner = booking.user.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) {
    res.status(403);
    throw new Error('Not authorized to view this booking');
  }

  res.json({ success: true, data: booking });
});

// @route   PATCH /api/bookings/:id/cancel
// @access  Private/Customer (owner only)
export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (booking.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to cancel this booking');
  }

  if (['cancelled', 'completed'].includes(booking.status)) {
    res.status(400);
    throw new Error(`Booking is already ${booking.status} and cannot be cancelled`);
  }

  booking.status = 'cancelled';
  await booking.save();

  res.json({ success: true, data: booking });
});

// ---------- Admin ----------

// @route   GET /api/admin/bookings
// @access  Private/Admin
export const getAllBookings = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const bookings = await Booking.find(filter)
    .populate('user', 'name email')
    .populate('package', 'title price')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: bookings });
});

// @route   PATCH /api/admin/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];

  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  res.json({ success: true, data: booking });
});