import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Wifi, Coffee, Wind, Tv, Clock, Users, Shield, MapPin, DollarSign, Home } from 'lucide-react';

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-yellow-50 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
              <p className="text-lg text-gray-700">
                At Mother Homes, we offer a comprehensive range of services designed to make your stay comfortable, convenient, and enjoyable.
              </p>
            </div>
          </div>
        </section>
        
        {/* Main Services */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Core Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Home className="text-yellow-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Accommodation Options</h3>
                <p className="text-gray-600 mb-4">
                  Choose from a variety of room options including single rooms, double sharing, and triple sharing accommodations to suit your preferences and budget.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Single occupancy rooms for privacy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Double sharing for affordability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Triple sharing for budget-conscious residents</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Coffee className="text-yellow-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Food Services</h3>
                <p className="text-gray-600 mb-4">
                  Enjoy nutritious and delicious meals prepared by our experienced chefs. Our meal plans include breakfast, lunch, dinner, and evening snacks.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Balanced and nutritious meals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Variety of cuisines and menu rotation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Special dietary requirements accommodated</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Shield className="text-yellow-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Security Services</h3>
                <p className="text-gray-600 mb-4">
                  Your safety is our priority. We provide 24/7 security with CCTV surveillance, secure access systems, and trained security personnel.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>24/7 security personnel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>CCTV monitoring of common areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Secure access control systems</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Clock className="text-yellow-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Housekeeping</h3>
                <p className="text-gray-600 mb-4">
                  Maintain a clean and hygienic living environment with our regular housekeeping services, including room cleaning, common area maintenance, and waste management.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Regular room cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Linen change service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Common area maintenance</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Wifi className="text-yellow-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Internet & Utilities</h3>
                <p className="text-gray-600 mb-4">
                  Stay connected with high-speed WiFi and enjoy uninterrupted power and water supply with backup systems in place.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>High-speed WiFi connectivity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Power backup for uninterrupted supply</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>24/7 water supply with purification</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Users className="text-yellow-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Activities</h3>
                <p className="text-gray-600 mb-4">
                  Foster connections and build friendships through our community events, recreational activities, and common spaces designed for interaction.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Regular community events</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Recreational facilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span>Common areas for socializing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Premium Amenities */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Premium Amenities</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="text-yellow-600" size={20} />
                </div>
                <h3 className="font-semibold mb-2">High-Speed WiFi</h3>
                <p className="text-gray-600 text-sm">
                  Stay connected with our high-speed internet access
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wind className="text-yellow-600" size={20} />
                </div>
                <h3 className="font-semibold mb-2">Air Conditioning</h3>
                <p className="text-gray-600 text-sm">
                  Comfortable climate control in all rooms
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tv className="text-yellow-600" size={20} />
                </div>
                <h3 className="font-semibold mb-2">Entertainment</h3>
                <p className="text-gray-600 text-sm">
                  TV lounges with streaming services
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-yellow-600" size={20} />
                </div>
                <h3 className="font-semibold mb-2">Recreation</h3>
                <p className="text-gray-600 text-sm">
                  Indoor games and recreational facilities
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-yellow-600" size={20} />
                </div>
                <h3 className="font-semibold mb-2">Laundry</h3>
                <p className="text-gray-600 text-sm">
                  Washing and ironing services available
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="text-yellow-600" size={20} />
                </div>
                <h3 className="font-semibold mb-2">Dining</h3>
                <p className="text-gray-600 text-sm">
                  Nutritious meals and dining facilities
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-yellow-600" size={20} />
                </div>
                <h3 className="font-semibold mb-2">Security</h3>
                <p className="text-gray-600 text-sm">
                  24/7 security with CCTV surveillance
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-yellow-600" size={20} />
                </div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-gray-600 text-sm">
                  Prime locations with good connectivity
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Plans */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Pricing Plans</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-yellow-100 p-6 text-center">
                  <h3 className="text-xl font-bold">Standard Plan</h3>
                  <div className="mt-4 flex items-center justify-center">
                    {/* <DollarSign className="text-yellow-600" size={24} /> */}
                    <span className="text-3xl font-bold">₹9,500</span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Triple sharing accommodation</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Three meals per day</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>WiFi access</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Basic housekeeping</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>24/7 security</span>
                    </li>
                    <li className="flex items-center text-gray-400">
                      <span className="mr-2">✗</span>
                      <span>Air conditioning</span>
                    </li>
                    <li className="flex items-center text-gray-400">
                      <span className="mr-2">✗</span>
                      <span>Premium amenities</span>
                    </li>
                  </ul>
                  
                  <a 
                    href="/search" 
                    className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black text-center font-medium py-2 rounded-md mt-6 transition-colors"
                  >
                    Explore Options
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-xl overflow-hidden transform scale-105 z-10">
                <div className="bg-yellow-400 p-6 text-center">
                  <h3 className="text-xl font-bold">Premium Plan</h3>
                  <div className="mt-4 flex items-center justify-center">
                    {/* <DollarSign className="text-black" size={24} /> */}
                    <span className="text-3xl font-bold">₹10,000</span>
                    <span className="text-gray-800 ml-1">/month</span>
                  </div>
                  <span className="inline-block bg-black text-white text-xs px-3 py-1 rounded-full mt-2">Most Popular</span>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Double sharing accommodation</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Three meals + evening snacks</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>High-speed WiFi</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Regular housekeeping</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>24/7 security with CCTV</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Air conditioning</span>
                    </li>
                    <li className="flex items-center text-gray-400">
                      <span className="mr-2">✗</span>
                      <span>Private bathroom</span>
                    </li>
                  </ul>
                  
                  <a 
                    href="/search" 
                    className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black text-center font-medium py-2 rounded-md mt-6 transition-colors"
                  >
                    Explore Options
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-yellow-100 p-6 text-center">
                  <h3 className="text-xl font-bold">Deluxe Plan</h3>
                  <div className="mt-4 flex items-center justify-center">
                    {/* <DollarSign className="text-yellow-600" size={24} /> */}
                    <span className="text-3xl font-bold">₹12,000</span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Single room accommodation</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>All meals + special weekend menu</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Premium high-speed WiFi</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Daily housekeeping</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Enhanced security measures</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Air conditioning</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Private bathroom</span>
                    </li>
                  </ul>
                  
                  <a 
                    href="/search" 
                    className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black text-center font-medium py-2 rounded-md mt-6 transition-colors"
                  >
                    Explore Options
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-yellow-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Residents Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xl">
                    R
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Rahul Sharma</h4>
                    <p className="text-gray-500 text-sm">IT Professional, 1 year resident</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The services at Mother Homes are exceptional. The food is delicious, rooms are clean, and the staff is very helpful. It truly feels like a home away from home."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xl">
                    P
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Priya Patel</h4>
                    <p className="text-gray-500 text-sm">Student, 2 years resident</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "I've been staying at Mother Homes for two years now, and I couldn't be happier. The security is top-notch, and the community events have helped me make great friends."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xl">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Arjun Reddy</h4>
                    <p className="text-gray-500 text-sm">Healthcare Worker, 6 months resident</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As someone who works late shifts, the 24/7 security and flexible meal timings at Mother Homes have been a blessing. The staff understands my schedule and accommodates my needs."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">What is included in the monthly rent?</h3>
                  <p className="text-gray-700">
                    The monthly rent includes accommodation, meals (as per your chosen plan), utilities (electricity, water), WiFi, housekeeping, and security services. Additional services may be available at extra cost.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Is there a security deposit?</h3>
                  <p className="text-gray-700">
                    Yes, we require a refundable security deposit equivalent to one month's rent. This is refunded when you vacate the PG, subject to any deductions for damages or outstanding dues.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">What is the minimum stay period?</h3>
                  <p className="text-gray-700">
                    The minimum stay period is typically 2 months. However, we offer flexible options for shorter stays at slightly different rates. Please contact us for more information.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">Are visitors allowed?</h3>
                  <p className="text-gray-700">
                    Yes, visitors are allowed in common areas during designated hours. Overnight guests are not permitted without prior approval from management.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">How do I pay the rent?</h3>
                  <p className="text-gray-700">
                    We accept payments through multiple channels including bank transfers, credit/debit cards, and popular payment apps. Rent is due on the 1st of each month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-yellow-400">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">Ready to Experience Our Services?</h2>
            <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
              Find the perfect PG accommodation with all the services you need for a comfortable stay.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="/search" 
                className="inline-block bg-black hover:bg-gray-900 text-white font-medium px-8 py-3 rounded-full text-lg transition-colors"
              >
                Find a PG
              </a>
              <a 
                href="/contact" 
                className="inline-block bg-transparent border-2 border-black hover:bg-black hover:text-white text-black font-medium px-8 py-3 rounded-full text-lg transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;