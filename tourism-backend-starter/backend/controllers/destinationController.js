import Destination from '../models/Destination.js';
import Package from '../models/Package.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @route   GET /api/destinations
// @access  Public
// Supports: ?popular=true
export const getDestinations = asyncHandler(async (req, res) => {
  const { popular } = req.query;

  const filter = {};
  if (popular === 'true') filter.popular = true;

  const destinations = await Destination.find(filter).sort({ createdAt: -1 });

  res.json({ success: true, data: destinations });
});

// @route   GET /api/destinations/:id
// @access  Public
export const getDestinationById = asyncHandler(async (req, res) => {
  const destination = await Destination.findById(req.params.id);

  if (!destination) {
    res.status(404);
    throw new Error('Destination not found');
  }

  res.json({ success: true, data: destination });
});

// @route   POST /api/destinations
// @access  Private/Admin
export const createDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.create(req.body);
  res.status(201).json({ success: true, data: destination });
});

// @route   PUT /api/destinations/:id
// @access  Private/Admin
export const updateDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!destination) {
    res.status(404);
    throw new Error('Destination not found');
  }

  res.json({ success: true, data: destination });
});

// @route   DELETE /api/destinations/:id
// @access  Private/Admin
// Unlike Package, this is a hard delete - BUT only if no packages still
// reference this destination. Otherwise we'd leave packages pointing at
// a destination ID that no longer exists (a dangling reference / orphaned
// foreign key, in relational-DB terms). This is exactly the kind of
// referential-integrity concern that doesn't come for free in MongoDB
// (no foreign key constraints), so the application has to enforce it.
export const deleteDestination = asyncHandler(async (req, res) => {
  const destination = await Destination.findById(req.params.id);

  if (!destination) {
    res.status(404);
    throw new Error('Destination not found');
  }

  const packageCount = await Package.countDocuments({ destination: req.params.id });
  if (packageCount > 0) {
    res.status(400);
    throw new Error(
      `Cannot delete: ${packageCount} package(s) still reference this destination. Reassign or remove them first.`
    );
  }

  await destination.deleteOne();

  res.json({ success: true, message: 'Destination deleted' });
});