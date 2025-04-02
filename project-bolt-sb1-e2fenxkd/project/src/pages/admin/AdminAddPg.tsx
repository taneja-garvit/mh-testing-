import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { Plus, X } from 'lucide-react';
import axios from 'axios';

const AdminAddPg: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    price: '',
    type: 'Single Room',
    gender: 'Male',
    description: '',
    contactPhone: '',
    contactEmail: '',
    amenities: ['wifi'],
    images: [''],
    rules: [''],
    latitude: '',
    longitude: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAmenityChange = (amenity: string) => {
    const updatedAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    
    setFormData({
      ...formData,
      amenities: updatedAmenities
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({
      ...formData,
      images: updatedImages
    });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, '']
    });
  };

  const removeImageField = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages
    });
  };

  const handleRuleChange = (index: number, value: string) => {
    const updatedRules = [...formData.rules];
    updatedRules[index] = value;
    setFormData({
      ...formData,
      rules: updatedRules
    });
  };

  const addRuleField = () => {
    setFormData({
      ...formData,
      rules: [...formData.rules, '']
    });
  };

  const removeRuleField = (index: number) => {
    const updatedRules = formData.rules.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      rules: updatedRules
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form data
      if (!formData.name || !formData.address || !formData.city || !formData.price) {
        throw new Error('Please fill in all required fields');
      }
    
      // Filter out empty values and clean the form data
      const cleanedFormData = {
        ...formData,
        price: parseInt(formData.price),  // Convert price to integer
        images: formData.images ? formData.images.filter(img => img.trim() !== '') : [],  // Remove empty images
        rules: formData.rules ? formData.rules.filter(rule => rule.trim() !== '') : []  // Remove empty rules
      };
    
      // Send a POST request to the API endpoint
      const response = await axios.post(`http://localhost:8000/api/v1/postdetails`, cleanedFormData);
                      
      if (response.status === 201) {  // Check if the response is successful
        setLoading(false);
        alert('PG added successfully!');
        navigate('/admin/pg-list');
      } else {
        setLoading(false);
        alert('Failed to add PG. Please try again.');
      }
    
    } catch (err) {
      setLoading(false);
      alert('Failed');  // Show a failure alert if an error occurs
      setError(err instanceof Error ? err.message : 'Failed to add PG. Please try again.');
    }
    
      
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <h1 className="text-2xl font-semibold mb-6">Add New PG</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-medium mb-4">Basic Information</h2>
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    PG Name <span className="text-red-500">*</span>
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
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹/month) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Room Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="Single Room">Single Room</option>
                    <option value="Double Sharing">Double Sharing</option>
                    <option value="Triple Sharing">Triple Sharing</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
              
              {/* Additional Information */}
              <div>
                <h2 className="text-lg font-medium mb-4">Additional Information</h2>
                
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes('wifi')}
                        onChange={() => handleAmenityChange('wifi')}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">WiFi</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes('food')}
                        onChange={() => handleAmenityChange('food')}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Food</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes('ac')}
                        onChange={() => handleAmenityChange('ac')}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">AC</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes('tv')}
                        onChange={() => handleAmenityChange('tv')}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">TV</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes('laundry')}
                        onChange={() => handleAmenityChange('laundry')}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Laundry</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes('gym')}
                        onChange={() => handleAmenityChange('gym')}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Gym</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Images */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">Images <span className="text-red-500">*</span></h2>
              
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="Enter image URL"
                    className="flex-grow border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addImageField}
                className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus size={16} className="mr-1" />
                <span>Add Image URL</span>
              </button>
            </div>
            
            {/* Rules */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4">House Rules <span className="text-red-500">*</span></h2>
              
              {formData.rules.map((rule, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={rule}
                    onChange={(e) => handleRuleChange(index, e.target.value)}
                    placeholder="Enter house rule"
                    className="flex-grow border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button
                    type="button"
                    onClick={() => removeRuleField(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addRuleField}
                className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus size={16} className="mr-1" />
                <span>Add Rule</span>
              </button>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/admin/pg-list')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md mr-4 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-md transition-colors"
              >
                {loading ? 'Saving...' : 'Save PG'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAddPg;