import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-extrabold text-primary-700 mb-4">404</h1>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="inline-block bg-primary-700 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition">
        Back to Home
      </Link>
    </div>
  );
}