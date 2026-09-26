export default function Footer() {
    return (
      <footer className="bg-primary-900 text-gray-300 pt-12 pb-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold text-lg mb-3">Travel<span className="text-accent-400">pro</span></h4>
            <p className="text-sm text-gray-400">Your trusted travel partner for unforgettable journeys around the world.</p>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li>About Us</li><li>Packages</li><li>Destinations</li><li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-3">Support</h5>
            <ul className="space-y-2 text-sm">
              <li>FAQs</li><li>Privacy Policy</li><li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-3">Contact</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>info@travelpro.com</li><li>Mon - Sun: 9AM - 8PM</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-10">© {new Date().getFullYear()} Travelpro. All Rights Reserved.</p>
      </footer>
    );
  }