import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { bookingAPI } from '../services/endpoints.js';
import { Calendar, Users, XCircle } from 'lucide-react';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
};

export default function MyBookings() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myBookings'],
    queryFn: () => bookingAPI.myBookings().then((res) => res.data.data),
  });

  const cancelMutation = useMutation({
    mutationFn: (id) => bookingAPI.cancel(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['myBookings'] }),
  });

  if (isLoading) return <div className="max-w-5xl mx-auto px-4 py-16">Loading your bookings...</div>;
  if (isError) return <div className="max-w-5xl mx-auto px-4 py-16 text-red-600">Could not load your bookings. Please try again.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-primary-700 mb-8">My Bookings</h1>
      {data.length === 0 ? (
        <p className="text-gray-500">You haven't booked any trips yet.</p>
      ) : (
        <div className="space-y-4">
          {data.map((booking) => (
            <div key={booking._id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-800">{booking.package?.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(booking.travelDate).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Users size={14} /> {booking.travelers.adults + (booking.travelers.children || 0)} travelers</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-primary-700">${booking.totalPrice}</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColors[booking.status]}`}>{booking.status}</span>
                {['pending', 'confirmed'].includes(booking.status) && (
                  <button onClick={() => cancelMutation.mutate(booking._id)} disabled={cancelMutation.isPending}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50" title="Cancel booking">
                    <XCircle size={22} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}