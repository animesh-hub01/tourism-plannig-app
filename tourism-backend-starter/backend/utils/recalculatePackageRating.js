import Review from '../models/Review.js';
import Package from '../models/Package.js';

const recalculatePackageRating = async (packageId) => {
  const stats = await Review.aggregate([
    { $match: { package: packageId } },
    {
      $group: {
        _id: '$package',
        avgRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Package.findByIdAndUpdate(packageId, {
      avgRating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].reviewCount,
    });
  } else {
    await Package.findByIdAndUpdate(packageId, { avgRating: 0, reviewCount: 0 });
  }
};

export default recalculatePackageRating;