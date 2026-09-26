import { useState } from 'react';
import { newsletterAPI } from '../services/endpoints.js';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newsletterAPI.subscribe(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="bg-primary-700">
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white text-center md:text-left">
          <h3 className="text-xl font-bold">Subscribe to Our Newsletter</h3>
          <p className="text-primary-100 text-sm mt-1">Get exclusive travel deals, tips & updates straight to your inbox.</p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address"
            className="flex-1 md:w-72 rounded-lg px-4 py-3 focus:outline-none" />
          <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold px-6 py-3 rounded-lg transition">Subscribe</button>
        </form>
      </div>
      {status === 'success' && <p className="text-center text-accent-300 text-sm pb-4">Thanks for subscribing!</p>}
      {status === 'error' && <p className="text-center text-red-300 text-sm pb-4">Something went wrong - try again.</p>}
    </section>
  );
}