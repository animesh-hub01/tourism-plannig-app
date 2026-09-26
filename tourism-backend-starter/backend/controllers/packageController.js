import Package from '../models/Package.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @route   GET /api/packages
// @access  Public
// Supports: ?destination=<id>&minPrice=&maxPrice=&sort=price|rating&page=&limit=&search=
export const getPackages = asyncHandler(async (req, res) => {
  const {
    destination,
    minPrice,
    maxPrice,
    sort,
    search,
    page = 1,
    limit = 12,
  } = req.query;

  const filter = { isActive: true };
  if (destination) filter.destination = destination;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (search) filter.$text = { $search: search };

  const sortOption =
    sort === 'price' ? { price: 1 } : sort === 'rating' ? { avgRating: -1 } : { createdAt: -1 };

  const skip = (Number(page) - 1) * Number(limit);

  const [packages, totalResults] = await Promise.all([
    Package.find(filter)
      .populate('destination', 'name country imageUrl')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit)),
    Package.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: packages,
    page: Number(page),
    totalPages: Math.ceil(totalResults / Number(limit)),
    totalResults,
  });
});

// @route   GET /api/packages/:id
// @access  Public
export const getPackageById = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id).populate('destination');

  if (!pkg || !pkg.isActive) {
    res.status(404);
    throw new Error('Package not found');
  }

  res.json({ success: true, data: pkg });
});

// @route   POST /api/packages
// @access  Private/Admin
export const createPackage = asyncHandler(async (req, res) => {
  const pkg = await Package.create(req.body);
  res.status(201).json({ success: true, data: pkg });
});

// @route   PUT /api/packages/:id
// @access  Private/Admin
export const updatePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }

  res.json({ success: true, data: pkg });
});

// @route   DELETE /api/packages/:id
// @access  Private/Admin
// Soft delete - keeps the document (and its history in bookings/reviews)
// but hides it from customer-facing listings.
export const deletePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });

  if (!pkg) {
    res.status(404);
    throw new Error('Package not found');
  }

  res.json({ success: true, message: 'Package deactivated' });
});
