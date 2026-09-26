import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

export default function PackageCard({ pkg }) {
  return (
    <Link to={`/packages/${pkg._id}`} className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100">
      <div className="h-44 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold">
        {pkg.images?.[0] ? (
          <img src={pkg.images[0]} alt={pkg.title} className="w-full h-full object-cover" />
        ) : (
          pkg.destination?.name || pkg.title
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 truncate">{pkg.title}</h3>
        <p className="text-sm text-gray-500">{pkg.destination?.country}</p>
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Clock size={14} /> {pkg.duration?.nights}N / {pkg.duration?.days}D</span>
          <span className="flex items-center gap-1 text-accent-600"><Star size={14} fill="currentColor" /> {pkg.avgRating?.toFixed(1) || 'New'}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-extrabold text-primary-700">${pkg.price}</span>
          <span className="text-xs text-gray-400">per person</span>
        </div>
      </div>
    </Link>
  );
}