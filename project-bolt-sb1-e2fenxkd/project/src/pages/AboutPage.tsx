import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Award, Clock, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-yellow-50 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Mother Homes</h1>
              <p className="text-lg text-gray-700 mb-8">
                We're on a mission to provide comfortable, affordable, and well-maintained PG accommodations that feel like home.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Mother Homes was founded in 2023 with a simple vision: to create living spaces that combine comfort, convenience, and community. We recognized the challenges that students and young professionals face when moving to a new city - from finding safe accommodations to managing daily chores.
                </p>
                <p className="text-gray-700 mb-4">
                  What started as a single PG with 10 rooms has now grown into a chain of premium PG accommodations across multiple cities, serving thousands of residents. Our growth is a testament to our commitment to quality and customer satisfaction.
                </p>
                <p className="text-gray-700">
                  Today, Mother Homes stands as a trusted name in the PG accommodation sector, known for our well-maintained facilities, responsive management, and vibrant community atmosphere!
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                  alt="Mother Homes Story" 
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-700">
                At Mother Homes, our values guide everything we do. They shape our decisions, define our culture, and help us deliver exceptional experiences to our residents.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-yellow-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600">
                  We foster a sense of belonging and create spaces where meaningful connections can flourish.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-yellow-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our service, from facility maintenance to customer support.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-yellow-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reliability</h3>
                <p className="text-gray-600">
                  We are consistent and dependable, ensuring that our residents can count on us when they need support.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-yellow-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-gray-600">
                  We believe in making quality accommodations accessible to everyone, regardless of budget constraints.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        {/* <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-gray-700">
                Meet the dedicated individuals who lead Mother Homes with passion, expertise, and a commitment to excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2149&q=80" 
                  alt="CEO" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Rajesh Kumar</h3>
                  <p className="text-gray-500 mb-3">Founder & CEO</p>
                  <p className="text-gray-700">
                    With over 15 years of experience in real estate and hospitality, Rajesh leads Mother Homes with a vision to transform the PG accommodation landscape.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80" 
                  alt="COO" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Priya Sharma</h3>
                  <p className="text-gray-500 mb-3">Chief Operations Officer</p>
                  <p className="text-gray-700">
                    Priya oversees the day-to-day operations of all Mother Homes properties, ensuring that our high standards of service are consistently maintained.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80" 
                  alt="CTO" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Vikram Singh</h3>
                  <p className="text-gray-500 mb-3">Chief Technology Officer</p>
                  <p className="text-gray-700">
                    Vikram leads our technology initiatives, developing innovative solutions to enhance the resident experience and streamline our operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        
        {/* Testimonials */}
        <section className="py-16 bg-yellow-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Residents Say</h2>
              <p className="text-gray-700">
                Don't just take our word for it. Hear from the people who call Mother Homes their home away from home.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xl">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Ananya Patel</h4>
                    <p className="text-gray-500 text-sm">Student, 2 years resident</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Moving to a new city for college was daunting, but Mother Homes made the transition so much easier. The facilities are great, and I've made friends for life here."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xl">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Sanjay Mehta</h4>
                    <p className="text-gray-500 text-sm">IT Professional, 1 year resident</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "As a working professional, I appreciate the hassle-free living that Mother Homes provides. The location is perfect, and the amenities save me so much time."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xl">
                    N
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Neha Gupta</h4>
                    <p className="text-gray-500 text-sm">Healthcare Worker, 3 years resident</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The security and cleanliness at Mother Homes are unmatched. As someone who works late shifts, I feel completely safe and comfortable here."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience Mother Homes?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of satisfied residents and discover the perfect balance of comfort, convenience, and affordability!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="/search" 
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-3 rounded-full text-lg transition-colors"
              >
                Find a PG
              </a>
              <a 
                href="/contact" 
                className="bg-transparent border border-yellow-400 hover:bg-yellow-400 hover:text-black text-yellow-400 font-medium px-8 py-3 rounded-full text-lg transition-colors"
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

export default AboutPage;
