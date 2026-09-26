import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { packageAPI } from '../services/endpoints.js';
import PackageCard from '../components/PackageCard.jsx';

export default function Packages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const params = Object.fromEntries(searchParams.entries());

  const { data, isLoading, isError } = useQuery({
    queryKey: ['packages', params],
    queryFn: () => packageAPI.list(params).then((res) => res.data),
  });

  const goToPage = (newPage) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', newPage);
    setSearchParams(next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Explore Packages</h1>
      {isLoading && <p className="text-gray-500">Loading packages...</p>}
      {isError && <p className="text-red-500">Could not load packages right now.</p>}
      {!isLoading && !isError && data?.data?.length === 0 && <p className="text-gray-500">No packages match your search yet.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((pkg) => <PackageCard key={pkg._id} pkg={pkg} />)}
      </div>
      {data?.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => goToPage(p)}
              className={`w-9 h-9 rounded-lg font-semibold ${p === page ? 'bg-primary-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}