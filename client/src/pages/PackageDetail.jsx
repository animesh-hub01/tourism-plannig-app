import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { packageAPI, reviewAPI, bookingAPI } from '../services/endpoints.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Star } from 'lucide-react';

export default function PackageDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [travelDate, setTravelDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [bookingMessage, setBookingMessage] = useState(null);

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewMessage, setReviewMessage] = useState(null);

  const { data: pkg, isLoading } = useQuery({
    queryKey: ['package', id],
    queryFn: () => packageAPI.getById(id).then((res) => res.data.data),
  });

  const { data: reviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => reviewAPI.listForPackage(id).then((res) => res.data.data),
    enabled: !!id,
  });

  const bookingMutation = useMutation({
    mutationFn: () => bookingAPI.create({ packageId: id, travelDate, travelers: { adults: Number(adults), children: Number(children) } }),
    onSuccess: () => {
      setBookingMessage({ type: 'success', text: 'Booking created! Check My Bookings.' });
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
    },
    onError: (err) => {
      setBookingMessage({ type: 'error', text: err.response?.data?.message || 'Booking failed. Please try again.' });
    },
  });

  const reviewMutation = useMutation({
    mutationFn: () => reviewAPI.create(id, { rating: Number(reviewRating), comment: reviewComment }),
    onSuccess: () => {
      setReviewMessage({ type: 'success', text: 'Thanks for your review!' });
      setReviewComment('');
      queryClient.invalidateQueries({ queryKey: ['reviews', id] });
      queryClient.invalidateQueries({ queryKey: ['package', id] });
    },
    onError: (err) => {
      setReviewMessage({ type: 'error', text: err.response?.data?.message || 'Could not submit review.' });
    },
  });

  const handleBook = (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    bookingMutation.mutate();
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setReviewMessage(null);
    reviewMutation.mutate();
  };

  if (isLoading) return <p className="text-center py-20 text-gray-500">Loading...</p>;
  if (!pkg) return <p className="text-center py-20 text-gray-500">Package not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-800">{pkg.title}</h1>
      <p className="text-gray-500 mt-1">{pkg.destination?.name}, {pkg.destination?.country}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 space-y-8">
          <p className="text-gray-700">{pkg.description}</p>

          {pkg.itinerary?.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Itinerary</h2>
              <ol className="space-y-3">
                {pkg.itinerary.map((day) => (
                  <li key={day.day} className="border-l-2 border-primary-500 pl-4">
                    <p className="font-semibold text-gray-800">Day {day.day}: {day.title}</p>
                    <p className="text-sm text-gray-500">{day.details}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">Reviews ({reviews?.length || 0})</h2>

            {reviews?.length === 0 && <p className="text-gray-500 text-sm mb-4">No reviews yet for this package.</p>}
            <div className="space-y-4 mb-6">
              {reviews?.map((r) => (
                <div key={r._id} className="border-b border-gray-100 pb-3">
                  <p className="font-semibold text-gray-800 text-sm">{r.user?.name}</p>
                  <p className="text-accent-500 text-sm">{'★'.repeat(r.rating)}</p>
                  <p className="text-gray-600 text-sm">{r.comment}</p>
                </div>
              ))}
            </div>

            {user ? (
              <form onSubmit={handleReviewSubmit} className="bg-gray-50 rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-gray-700">Leave a review</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setReviewRating(n)}
                      className={n <= reviewRating ? 'text-accent-500' : 'text-gray-300'}
                    >
                      <Star size={20} fill="currentColor" />
                    </button>
                  ))}
                </div>
                <textarea
                  required
                  rows={2}
                  placeholder="Share your experience..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  disabled={reviewMutation.isPending}
                  className="bg-primary-700 hover:bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition disabled:opacity-60"
                >
                  {reviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                </button>
                {reviewMessage && (
                  <p className={`text-sm ${reviewMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                    {reviewMessage.text}
                  </p>
                )}
              </form>
            ) : (
              <p className="text-sm text-gray-500">
                <button onClick={() => navigate('/login')} className="text-primary-700 font-semibold hover:underline">
                  Log in
                </button>{' '}
                to leave a review.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 h-fit sticky top-24">
          <p className="text-2xl font-extrabold text-primary-700">${pkg.price} <span className="text-sm font-normal text-gray-400">/ person</span></p>
          <form onSubmit={handleBook} className="mt-4 space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500">Travel Date</label>
              <input type="date" required value={travelDate} onChange={(e) => setTravelDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500">Adults</label>
                <input type="number" min="1" value={adults} onChange={(e) => setAdults(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500">Children</label>
                <input type="number" min="0" value={children} onChange={(e) => setChildren(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
            <button type="submit" disabled={bookingMutation.isPending}
              className="w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 rounded-lg transition disabled:opacity-50">
              {bookingMutation.isPending ? 'Booking...' : user ? 'Book Now' : 'Login to Book'}
            </button>
          </form>
          {bookingMessage && (
            <p className={`text-sm mt-3 ${bookingMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
              {bookingMessage.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}