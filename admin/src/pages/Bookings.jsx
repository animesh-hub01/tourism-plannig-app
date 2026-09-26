import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingAPI } from '../services/endpoints.js';

const statuses = ['pending', 'confirmed', 'cancelled', 'completed'];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
};

export default function Bookings() {
  const [statusFilter, setStatusFilter] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'bookings', statusFilter],
    queryFn: () =>
      bookingAPI.listAll(statusFilter ? { status: statusFilter } : {}).then((res) => res.data.data),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => bookingAPI.updateStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'bookings'] }),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">Bookings</h1>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {isLoading && <p className="text-gray-500">Loading bookings...</p>}
      {isError && <p className="text-red-500">Could not load bookings.</p>}

      {!isLoading && !isError && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Travel Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.map((b) => (
                <tr key={b._id}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{b.user?.name}</p>
                    <p className="text-xs text-gray-400">{b.user?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{b.package?.title}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(b.travelDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-gray-700">${b.totalPrice}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColors[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <select defaultValue=""
                      onChange={(e) => {
                        if (e.target.value) {
                          updateStatusMutation.mutate({ id: b._id, status: e.target.value });
                          e.target.value = '';
                        }
                      }}
                      className="border border-gray-200 rounded-lg px-2 py-1 text-xs">
                      <option value="" disabled>Change to...</option>
                      {statuses.filter((s) => s !== b.status).map((s) => (
                        <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {data?.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-400">No bookings found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}