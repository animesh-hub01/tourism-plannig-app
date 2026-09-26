// Placeholder UI. Once real Review documents exist, swap this for a
// component fetching actual top reviews (e.g. a GET /api/reviews/featured route).
const placeholders = [
    { rating: 5, text: 'Everything was perfectly organized from start to finish. Would book again.' },
    { rating: 5, text: 'Great communication and support throughout the whole trip.' },
    { rating: 4, text: 'Beautiful destinations and a smooth booking process overall.' },
  ];
  
  export default function Testimonials() {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-10 text-center">What Our Travelers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholders.map((t, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-accent-500 mb-2">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              <p className="text-gray-600 text-sm">{t.text}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">Sample reviews shown - real customer reviews will appear here once bookings are completed.</p>
      </section>
    );
  }