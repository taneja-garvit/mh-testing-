import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <HomeIcon className="h-6 w-6" />
              <span className="text-xl font-bold">motherHomes</span>
            </div>
            <p className="text-gray-400 mb-4">
              A chain of paying guest accommodations offering standard PG services at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/motherhomes.in?igsh=OHpreHI4Y25hZm11&utm_source=qr" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-white transition-colors">Find PG</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Single Rooms</li>
              <li className="text-gray-400">Double Sharing</li>
              <li className="text-gray-400">Triple Sharing</li>
              <li className="text-gray-400">Food Services</li>
              <li className="text-gray-400">Laundry Services</li>
              <li className="text-gray-400">Housekeeping</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-gray-400 mt-1 flex-shrink-0" />
                <a href="https://www.google.com/maps/place/Crossings+Republik,+Ghaziabad,+Uttar+Pradesh/data=!4m2!3m1!1s0x390cee307ecc7e91:0x16613eec68653aa4?sa=X&ved=1t:242&ictx=111">  <span className="text-gray-400">Crossing Republik,Ghaziabad, UP, 201016</span> </a>
              </li>
              {/* <li className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-400 flex-shrink-0" />
                <span className="text-gray-400">+1 (123) 456-7890</span>
              </li> */}
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-400 flex-shrink-0" />
               <a href="mailto:info@motherhomes.in"> <span className="text-gray-400">info@motherhomes.in</span> </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} Mother Homes. All rights reserved.
            <Link to="/admin" className="text-gray-500 ml-2 text-sm hover:text-white transition-colors">Admin</Link>

          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
