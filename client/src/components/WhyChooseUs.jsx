import { ShieldCheck, Headphones, Camera, Users } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Best Price Guarantee', desc: 'We ensure the best price for your travel.' },
  { icon: Headphones, title: '24/7 Customer Support', desc: 'We are here to help you anytime.' },
  { icon: Camera, title: 'Memorable Experiences', desc: 'Unique experiences that last a lifetime.' },
  { icon: Users, title: 'Trusted by Travelers', desc: 'Thousands of happy travelers worldwide.' },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-10 text-center">Why Choose Travelpro?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="bg-primary-100 text-primary-700 rounded-full p-4 mb-4"><Icon size={28} /></div>
              <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}