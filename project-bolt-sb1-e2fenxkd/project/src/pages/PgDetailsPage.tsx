import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, Calendar, Users, Wifi, Coffee, Wind, Tv, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import axios from 'axios';

interface PG {
  _id: string;
  name: string;
  address: string;
  city: string;
  price: number;
  type: string;
  gender: string;
  amenities: string[];
  images: string[];
  description: string;
  contactPhone: string;
  contactEmail: string;
  rules: string[];
}

interface ContactFormData {
  name: string;
  phone: string;
  pgName: string;
  type: 'contact' | 'schedule';
}

// Define ContactForm as a separate component outside PgDetailsPage
const ContactForm: React.FC<{
  type: 'contact' | 'schedule';
  formData: ContactFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
  formLoading: boolean;
  setFormLoading: React.Dispatch<React.SetStateAction<boolean>>;
  formSuccess: boolean;
  setFormSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}> = ({ type, formData, setFormData, formLoading, setFormLoading, formSuccess, setFormSuccess, handleFormSubmit, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div className="flex justify-between items-center p-6 border-b">
        <h3 className="text-xl font-semibold">
          {type === 'contact' ? 'Contact Now' : 'Schedule Visit'}
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="p-6">
        {formSuccess ? (
          <div className="text-center py-4">
            <div className="text-green-500 text-xl mb-2">✓</div>
            <p className="text-gray-800 font-medium">
              {type === 'contact'
                ? "Thank you! We'll contact you shortly."
                : "Visit scheduled! We'll confirm the timing soon."}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel" // Changed to "tel" for better phone number handling
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PG Name
              </label>
              <input
                type="text"
                value={formData.pgName}
                readOnly
                className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3"
              />
            </div>

            <button
              type="submit"
              disabled={formLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              {formLoading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2"></span>
                  Submitting...
                </>
              ) : type === 'contact' ? (
                'Submit Inquiry'
              ) : (
                'Schedule Visit'
              )}
            </button>
          </>
        )}
      </form>
    </div>
  </div>
);

const PgDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pg, setPg] = useState<PG | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Contact form states
  const [showContactForm, setShowContactForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    pgName: '',
    type: 'contact'
  });

  useEffect(() => {
    const fetchPgDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/v1/fetchdetail/${id}`);
        setPg(response.data);
        setFormData(prev => ({ ...prev, pgName: response.data.name }));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch PG details. Please try again later.');
        setLoading(false);
      }
    };

    fetchPgDetails();
  }, [id]);

  const nextImage = () => {
    if (pg) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === pg.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (pg) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? pg.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const url = `https://script.google.com/macros/s/AKfycbyNz2CdwMq1yzl9rZok7waK95UBMSPhHdgffx9h4R4hiO332NLWegGwn_zO1utP8lRjEQ/exec?name=${formData.name}&phone=${formData.phone}&pgName=${formData.pgName}`;
      await axios.get(url);

      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormSuccess(true);
      setFormLoading(false);

      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          pgName: pg?.name || '',
          type: 'contact'
        });
        setShowContactForm(false);
        setShowScheduleForm(false);
        setFormSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to submit form:', err);
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
          <p className="ml-4 text-gray-600">Loading PG details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !pg) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'PG not found'}</p>
            <Link to="/search" className="text-blue-600 hover:underline">
              Back to Search
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/search" className="inline-flex items-center text-blue-600 hover:underline">
              <ChevronLeft size={16} />
              <span>Back to Search</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image Gallery */}
            <div className="relative h-80 md:h-96 lg:h-[500px]">
              <img
                src={pg.images[currentImageIndex]}
                alt={`${pg.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {pg.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {pg.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{pg.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={18} className="mr-2 flex-shrink-0" />
                    <p>{pg.address}, {pg.city}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                      {pg.gender}
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                      {pg.type}
                    </span>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center text-2xl font-bold text-gray-900 mb-2">
                    ₹{pg.price}/month
                  </div>
                  <p className="text-gray-600 text-sm">Including all amenities</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 mb-6">{pg.description}</p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {pg.amenities.includes('wifi') && (
                    <div className="flex items-center">
                      <Wifi size={18} className="text-yellow-500 mr-2" />
                      <span>WiFi</span>
                    </div>
                  )}
                  {pg.amenities.includes('food') && (
                    <div className="flex items-center">
                      <Coffee size={18} className="text-yellow-500 mr-2" />
                      <span>Food</span>
                    </div>
                  )}
                  {pg.amenities.includes('ac') && (
                    <div className="flex items-center">
                      <Wind size={18} className="text-yellow-500 mr-2" />
                      <span>AC</span>
                    </div>
                  )}
                  {pg.amenities.includes('tv') && (
                    <div className="flex items-center">
                      <Tv size={18} className="text-yellow-500 mr-2" />
                      <span>TV</span>
                    </div>
                  )}
                  {pg.amenities.includes('laundry') && (
                    <div className="flex items-center">
                      <Clock size={18} className="text-yellow-500 mr-2" />
                      <span>Laundry</span>
                    </div>
                  )}
                  {pg.amenities.includes('gym') && (
                    <div className="flex items-center">
                      <Users size={18} className="text-yellow-500 mr-2" />
                      <span>Gym</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-4">House Rules</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {pg.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-3">
{/*                   <div className="flex items-center">
                    <Phone size={18} className="text-yellow-500 mr-2" />
                    <a href={`tel:${pg.contactPhone}`} className="text-blue-600 hover:underline">
                      {pg.contactPhone}
                    </a>
                  </div> */}
                  <div className="flex items-center">
                    <Mail size={18} className="text-yellow-500 mr-2" />
                    <a href={`mailto:${pg.contactEmail}`} className="text-blue-600 hover:underline">
                      {pg.contactEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="block w-full md:w-auto md:inline-block bg-yellow-400 hover:bg-yellow-500 text-black text-center font-medium py-3 px-8 rounded-md transition-colors"
                >
                  Contact Now
                </button>
                <button
                  onClick={() => setShowScheduleForm(true)}
                  className="block w-full md:w-auto md:inline-block mt-4 md:mt-0 md:ml-4 bg-white border border-yellow-400 hover:bg-yellow-50 text-black text-center font-medium py-3 px-8 rounded-md transition-colors"
                >
                  Schedule Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showContactForm && (
        <ContactForm
          type="contact"
          formData={formData}
          setFormData={setFormData}
          formLoading={formLoading}
          setFormLoading={setFormLoading}
          formSuccess={formSuccess}
          setFormSuccess={setFormSuccess}
          handleFormSubmit={handleFormSubmit}
          onClose={() => setShowContactForm(false)}
        />
      )}
      {showScheduleForm && (
        <ContactForm
          type="schedule"
          formData={formData}
          setFormData={setFormData}
          formLoading={formLoading}
          setFormLoading={setFormLoading}
          formSuccess={formSuccess}
          setFormSuccess={setFormSuccess}
          handleFormSubmit={handleFormSubmit}
          onClose={() => setShowScheduleForm(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default PgDetailsPage;
