import { Link } from 'react-router-dom';

// Swap this URL for your own image - Unsplash works great and is free.
// Pick a wide, scenic travel photo (beach, mountains, city skyline, etc.)
const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80';

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
      />

      {/* Gradient overlay - this is what keeps the text readable over any
          photo. Darkest on the left (where the text sits), fading toward
          the right. Adjust the opacity numbers (/90, /60, /30) to taste:
          higher = darker/more readable, lower = more of the photo shows. */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 via-primary-900/30 to-transparent" />

      {/* Actual content - relative + z-10 so it sits above both layers above */}
      <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 relative z-10">
        <p className="uppercase tracking-widest text-accent-400 font-semibold mb-4">Time to Explore</p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-2xl">
          Travel Beyond Limits,{' '}
          <span className="italic text-accent-400 font-serif">Create Memories</span>
        </h1>
        <p className="mt-6 max-w-xl text-gray-100">
          Discover breathtaking destinations, unforgettable experiences, and amazing places at exclusive deals.
        </p>
        <div className="mt-8 flex gap-4">
          <Link to="/packages" className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold px-6 py-3 rounded-lg transition">
            Explore Packages
          </Link>
        </div>
      </div>
    </section>
  );
}