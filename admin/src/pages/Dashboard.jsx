import { useQuery } from '@tanstack/react-query';
import { dashboardAPI } from '../services/endpoints.js';
import StatCard from '../components/StatCard.jsx';
import { Users, CalendarCheck, DollarSign, Star } from 'lucide-react';

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => dashboardAPI.stats().then((res) => res.data.data),
  });

  if (isLoading) return <p className="text-gray-500">Loading dashboard...</p>;
  if (isError) return <p className="text-red-500">Could not load dashboard stats.</p>;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <StatCard label="Total Customers" value={data.totalUsers} icon={Users} />
        <StatCard label="Total Bookings" value={data.totalBookings} icon={CalendarCheck} />
        <StatCard label="Revenue (paid)" value={`$${data.totalRevenue}`} icon={DollarSign} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-800 mb-4">Top Rated Packages</h2>
        {data.topPackages?.length === 0 ? (
          <p className="text-sm text-gray-500">No packages yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {data.topPackages?.map((pkg) => (
              <li key={pkg._id} className="py-3 flex items-center justify-between">
                <span className="text-gray-700">{pkg.title}</span>
                <span className="flex items-center gap-1 text-accent-600 text-sm font-semibold">
                  <Star size={14} fill="currentColor" /> {pkg.avgRating?.toFixed(1) || 'New'} ({pkg.reviewCount})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}