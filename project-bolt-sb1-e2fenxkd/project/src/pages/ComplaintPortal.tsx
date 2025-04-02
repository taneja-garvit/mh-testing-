import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AlertTriangle, Send, CheckCircle, Clock, X } from 'lucide-react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  date: string;
  category: string;
}

const ComplaintPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'maintenance'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Sample complaints for demo
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: '1',
      title: 'Water leakage in bathroom',
      description: 'There is water leaking from the bathroom ceiling whenever the room above uses their shower.',
      status: 'in-progress',
      date: '2023-06-15',
      category: 'maintenance'
    },
    {
      id: '2',
      title: 'WiFi connectivity issues',
      description: 'The WiFi signal is very weak in my room. I am unable to connect properly for my online classes.',
      status: 'resolved',
      date: '2023-06-10',
      category: 'internet'
    },
    {
      id: '3',
      title: 'Food quality concern',
      description: 'The food served for dinner yesterday was not properly cooked. Several residents had the same complaint.',
      status: 'pending',
      date: '2023-06-18',
      category: 'food'
    }
  ]);

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
      // await axios.post('/api/complaints', formData);
      
      // For demo purposes, just simulate success and add to local state
      setTimeout(() => {
        const newComplaint: Complaint = {
          id: (complaints.length + 1).toString(),
          title: formData.title,
          description: formData.description,
          status: 'pending',
          date: new Date().toISOString().split('T')[0],
          category: formData.category
        };
        
        setComplaints([newComplaint, ...complaints]);
        setLoading(false);
        setSuccess(true);
        setFormData({
          title: '',
          description: '',
          category: 'maintenance'
        });
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }, 1000);
    } catch (err) {
      setLoading(false);
      setError('Failed to submit complaint. Please try again later.');
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="mr-1" />;
      case 'in-progress':
        return <AlertTriangle size={16} className="mr-1" />;
      case 'resolved':
        return <CheckCircle size={16} className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Complaint Portal</h1>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'new'
                  ? 'text-yellow-600 border-b-2 border-yellow-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('new')}
            >
              New Complaint
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'history'
                  ? 'text-yellow-600 border-b-2 border-yellow-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('history')}
            >
              Complaint History
            </button>
          </div>
          
          {/* New Complaint Form */}
          {activeTab === 'new' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Submit a New Complaint</h2>
                
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <div className="flex items-center">
                      <CheckCircle size={20} className="mr-2" />
                      <span>Your complaint has been submitted successfully! We'll look into it as soon as possible.</span>
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <div className="flex items-center">
                      <X size={20} className="mr-2" />
                      <span>{error}</span>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="maintenance">Maintenance</option>
                      <option value="internet">Internet/WiFi</option>
                      <option value="food">Food</option>
                      <option value="cleanliness">Cleanliness</option>
                      <option value="security">Security</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="Brief title of your complaint"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Please provide detailed information about your complaint"
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
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Submit Complaint
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
          
          {/* Complaint History */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Your Complaint History</h2>
                
                {complaints.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't submitted any complaints yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {complaints.map((complaint) => (
                      <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-medium">{complaint.title}</h3>
                          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(complaint.status)}`}>
                            {getStatusIcon(complaint.status)}
                            <span>{complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span className="mr-3">Category: {complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}</span>
                          <span>Date: {complaint.date}</span>
                        </div>
                        <p className="text-gray-700">{complaint.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComplaintPortal;