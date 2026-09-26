import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { destinationAPI } from '../services/endpoints.js';

export default function PopularDestinations() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['destinations', 'popular'],
    queryFn: () => destinationAPI.list({ popular: true }).then((res) => res.data.data),
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">Popular Destinations</h2>
        <Link to="/packages" className="text-primary-700 font-semibold hover:underline">View All Destinations &rarr;</Link>
      </div>
      {isLoading && <p className="text-gray-500">Loading destinations...</p>}
      {isError && <p className="text-red-500">Could not load destinations right now.</p>}
      {!isLoading && !isError && data?.length === 0 && (
        <p className="text-gray-500">No destinations yet - when some destinations are added, you will see them here.</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data?.map((dest) => (
          <div key={dest._id} className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white">
            <div className="h-32 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
              {dest.imageUrl ? <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover" /> : dest.name}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-800">{dest.name}</h3>
              <p className="text-xs text-gray-500">{dest.country}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}