import Hero from '../components/Hero.jsx';
import SearchBar from '../components/SearchBar.jsx';
import PopularDestinations from '../components/PopularDestinations.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Newsletter from '../components/Newsletter.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <SearchBar />
      <PopularDestinations />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}