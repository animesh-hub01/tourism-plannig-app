import { Link } from 'react-router-dom';
import { Heart, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        <Link to="/" className="text-2xl font-extrabold text-primary-700">
          Travel<span className="text-accent-500">pro</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          <Link to="/" className="hover:text-primary-700">Home</Link>
          <Link to="/packages" className="hover:text-primary-700">Packages</Link>
          <Link to="/packages" className="hover:text-primary-700">Destinations</Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/wishlist" className="text-gray-600 hover:text-accent-500" title="Wishlist">
                <Heart size={22} />
              </Link>
              <Link to="/my-bookings" className="text-gray-600 hover:text-primary-700" title="My Bookings">
                <User size={22} />
              </Link>
              <button onClick={logout} className="text-gray-500 hover:text-red-500" title="Log out">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-primary-700 hover:bg-primary-600 text-white px-5 py-2 rounded-lg font-semibold transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}