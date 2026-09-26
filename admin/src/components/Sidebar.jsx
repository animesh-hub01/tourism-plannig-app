import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, MapPin, CalendarCheck, Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/packages', label: 'Packages', icon: Package },
  { to: '/destinations', label: 'Destinations', icon: MapPin },
  { to: '/bookings', label: 'Bookings', icon: CalendarCheck },
  { to: '/users', label: 'Users', icon: Users },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-primary-900 text-white flex flex-col h-screen sticky top-0">
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-xl font-extrabold">
          Travel<span className="text-accent-400">pro</span>
        </h1>
        <p className="text-xs text-primary-100 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive ? 'bg-accent-500 text-primary-900' : 'text-primary-100 hover:bg-white/10'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-xs text-primary-200 mb-2 truncate">{user?.email}</p>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-primary-100 hover:text-white">
          <LogOut size={16} /> Log out
        </button>
      </div>
    </aside>
  );
}