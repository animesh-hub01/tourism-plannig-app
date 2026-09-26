import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { wishlistAPI } from '../services/endpoints.js';
import PackageCard from '../components/PackageCard.jsx';
import { HeartOff } from 'lucide-react';

export default function Wishlist() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistAPI.get().then((res) => res.data.data),
  });

  const removeMutation = useMutation({
    mutationFn: (packageId) => wishlistAPI.remove(packageId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  if (isLoading) return <div className="max-w-6xl mx-auto px-4 py-16">Loading your wishlist...</div>;
  if (isError) return <div className="max-w-6xl mx-auto px-4 py-16 text-red-600">Could not load your wishlist. Please try again.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-primary-700 mb-8">My Wishlist</h1>
      {data.length === 0 ? (
        <p className="text-gray-500">You haven't saved any packages yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((pkg) => (
            <div key={pkg._id} className="relative">
              <PackageCard pkg={pkg} />
              <button onClick={() => removeMutation.mutate(pkg._id)}
                className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:bg-white text-red-500" title="Remove from wishlist">
                <HeartOff size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}