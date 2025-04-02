import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // await axios.post('/api/contact', formData);
      
      // For demo purposes, just simulate success
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 1000);
    } catch (err) {
      setLoading(false);
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-yellow-50 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-lg text-gray-700">
                Have questions or need assistance? We're here to help. Reach out to us using any of the methods below.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:grid-cols-3 gap-8 mb-16">
              {/* <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-yellow-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-gray-600 mb-2">Call us directly</p>
                <a href="tel:+911234567890" className="text-blue-600 hover:underline">+91 123 456 7890</a>
              </div> */}
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-yellow-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600 mb-2">Send us an email</p>
                <a href="mailto:info@motherhomes.in" className="text-blue-600 hover:underline">info@motherhomes.in</a>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center ">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-yellow-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Office</h3>
                <a href="https://www.google.com/maps/place/Crossings+Republik,+Ghaziabad,+Uttar+Pradesh/data=!4m2!3m1!1s0x390cee307ecc7e91:0x16613eec68653aa4?sa=X&ved=1t:242&ictx=111">    <p className="text-gray-600 mb-2 underline">Visit our main office</p> </a>
                <a href="https://www.google.com/maps/place/Crossings+Republik,+Ghaziabad,+Uttar+Pradesh/data=!4m2!3m1!1s0x390cee307ecc7e91:0x16613eec68653aa4?sa=X&ved=1t:242&ictx=111">  <p className="text-gray-800 ">Crossing Republik, Ghaziabad, UP, 201016</p> </a>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl font-bold mb-6">Have a Complaint ? Send Us a Message</h2>
                  
                  {success ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                      <p>Your message has been sent successfully! We'll get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                          <p>{error}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            Subject <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-md transition-colors flex items-center"
                      >
                        {loading ? (
                          <>
                            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
                
                <div className="bg-yellow-50 p-8 lg:p-12 flex items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Our Working Hours</h3>
                    <p className="text-gray-700 mb-6">
                      Our support team is available to assist you during the following hours:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Saturday:</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Sunday:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      {/* <h4 className="font-semibold mb-2">Need Urgent Assistance?</h4>
                      <p className="text-gray-700">
                        For urgent matters outside of business hours, please call our 24/7 helpline:
                      </p>
                      <a href="tel:+911234567890" className="text-blue-600 hover:underline font-medium">
                        +91 123 456 7890
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Find Us</h2>
              <p className="text-gray-700">
                Visit our main office or any of our PG locations across the city.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 h-[400px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.399135892687!2d77.43522831508368!3d28.632754982414936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee8f4e4e4e4d%3A0x9c8f8e5e8e8e8e8e!2sParamount%20Symphony%2C%20Crossings%20Republik%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201016%2C%20India!5e0!3m2!1sen!2sus!4v1677654321098!5m2!1sen!2sus" 
                 // src="https://www.google.com/maps/place/Crossings+Republik,+Ghaziabad,+Uttar+Pradesh/@28.6281428,77.4361701,16z/data=!3m1!4b1!4m6!3m5!1s0x390cee307ecc7e91:0x16613eec68653aa4!8m2!3d28.6299672!4d77.435077!16s%2Fm%2F0p7c6r2?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Mother Homes Location"
                 ></iframe>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-yellow-400">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">Ready to Find Your Perfect PG?</h2>
            <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
              Browse our listings and find the perfect PG accommodation that suits your needs and budget.
            </p>
            <a 
              href="/search" 
              className="inline-block bg-black hover:bg-gray-900 text-white font-medium px-8 py-3 rounded-full text-lg transition-colors"
            >
              Explore PGs
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
