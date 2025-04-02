import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Shield, Home, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-[#FFFDF7] py-16 md:py-24 flex-grow">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-7xl md:ml-9 font-bold text-gray-900 leading-tight mb-6">
              Find Your<br />Perfect<br />PG Home
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg md:ml-9">
              Discover the best PG services in your area. Our platform offers a wide range of high-quality, fully-furnished PG options with top-notch amenities.
            </p>
            <Link 
              to="/search" 
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-3 rounded-full text-lg transition-colors md:ml-9"
            >
              Explore Now
            </Link>
          </div>
          
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Modern PG Accommodation" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Embrace Home Comfort</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16 text-lg">
            Elevate your living experience with our top-tier PG services. Enjoy modern amenities, reliable infrastructure, and a peaceful environment tailored to your preferences.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-[#F5F5F5] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80" 
                alt="PG Bedroom" 
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="bg-yellow-100 rounded-lg p-10">
              <h3 className="text-4xl font-bold mb-6">Thoughtful Spaces</h3>
              <p className="text-gray-700 mb-6">
                Indulge in the comfort of our carefully curated PG accommodations. From cozy bedrooms to well-equipped shared spaces, we've designed every detail to provide you with a haven of relaxation and productivity.
              </p>
              <Link 
                to="/services" 
                className="inline-block font-medium text-black border-b-2 border-yellow-400 hover:border-yellow-500"
              >
                Learn more about our services
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Mother Homes?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
              <p className="text-gray-600">
                All our PGs are situated in prime locations with easy access to public transport, markets, colleges and workplaces.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safety & Security</h3>
              <p className="text-gray-600">
                24/7 security, CCTV surveillance, and secure access ensure your safety at all times.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Amenities</h3>
              <p className="text-gray-600">
                Enjoy high-speed WiFi, fully-furnished rooms, clean bathrooms, and nutritious meals.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Terms</h3>
              <p className="text-gray-600">
                Choose from flexible stay options with transparent pricing and no hidden charges.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect PG?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Use our location-based search to discover the best PG accommodations near you. Filter by price, amenities, and more to find your ideal match.
          </p>
          <Link 
            to="/search" 
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-3 rounded-full text-lg transition-colors"
          >
            Search PGs Near Me
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;