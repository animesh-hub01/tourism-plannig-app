import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [destination, setDestination] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set('search', destination);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-5xl mx-auto -mt-10 relative z-20 bg-white rounded-xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 mb-1">Destination</label>
        <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Where do you want to go?"
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 mb-1">Min Price</label>
        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="$0"
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 mb-1">Max Price</label>
        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="$5000"
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>
      <button type="submit" className="bg-primary-700 hover:bg-primary-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition">
        <Search size={18} /> Search
      </button>
    </form>
  );
}