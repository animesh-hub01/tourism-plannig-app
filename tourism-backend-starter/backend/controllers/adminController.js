import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Package from '../models/Package.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalBookings, revenueResult, topPackages] = await Promise.all([
    User.countDocuments({ role: 'customer' }),
    Booking.countDocuments(),
    Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]),
    Package.find({ isActive: true }).sort({ avgRating: -1 }).limit(5).select('title avgRating reviewCount'),
  ]);

  res.json({
    success: true,
    data: {
      totalUsers,
      totalBookings,
      totalRevenue: revenueResult[0]?.total || 0,
      topPackages,
    },
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: 'customer' }).sort({ createdAt: -1 });
  res.json({ success: true, data: users });
});