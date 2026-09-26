import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Packages from './pages/Packages.jsx';
import Destinations from './pages/Destinations.jsx';
import Bookings from './pages/Bookings.jsx';
import Users from './pages/Users.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="packages" element={<Packages />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}