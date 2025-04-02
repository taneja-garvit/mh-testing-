import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { Edit, Trash2, Eye, Search } from 'lucide-react';
import axios from 'axios';

interface PG {
  _id: string;
  name: string;
  address: string;
  city: string;
  price: number;
  type: string;
  gender: string;
  createdAt: string;
}

const AdminPgList: React.FC = () => {
  const [pgs, setPgs] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/v1/fetchdetails`);
        setPgs(response.data);
        // const sampleData: PG[] = [
        //   {
        //     _id: '1',
        //     name: 'Mother Homes Deluxe',
        //     address: '123 Main St, Downtown',
        //     city: 'Bangalore',
        //     price: 8000,
        //     type: 'Single Room',
        //     gender: 'Male',
        //     createdAt: '2023-06-15T10:30:00Z'
        //   },
        //   {
        //     _id: '2',
        //     name: 'Mother Homes Premium',
        //     address: '456 Park Ave, Central',
        //     city: 'Bangalore',
        //     price: 10000,
        //     type: 'Double Sharing',
        //     gender: 'Female',
        //     createdAt: '2023-06-10T14:20:00Z'
        //   },
        //   {
        //     _id: '3',
        //     name: 'Mother Homes Budget',
        //     address: '789 College Rd, University Area',
        //     city: 'Bangalore',
        //     price: 6000,
        //     type: 'Triple Sharing',
        //     gender: 'Male',
        //     createdAt: '2023-06-05T09:15:00Z'
        //   }
        // ];
        
        // setPgs(sampleData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch PGs. Please try again later.');
        setLoading(false);
        
        // For demo purposes, set some sample data
      
      }
    };

    fetchPGs();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this PG?')) {
      try {
        // In a real app, this would be an API call
        const reponse = await axios.delete(`http://localhost:8000/api/v1/deletedetail/${id}`)
        setPgs(reponse.data);
      } catch (err) {
        alert('Failed to delete PG. Please try again.');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter PGs based on search term
  const filteredPgs = pgs.filter(pg => 
    pg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pg.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pg.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPgs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPgs.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">PG Listings</h1>
          <Link
            to="/admin/add-pg"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-md transition-colors"
          >
            Add New PG
          </Link>
        </div>
        
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, address, or city"
              className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* PG List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
              <p className="mt-2 text-gray-500">Loading PGs...</p>
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredPgs.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No PGs found matching your search.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Added On
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((pg) => (
                      <tr key={pg._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{pg.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{pg.city}</div>
                          <div className="text-xs text-gray-400">{pg.address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{pg.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            pg.gender === 'Male' ? 'bg-blue-100 text-blue-800' :
                            pg.gender === 'Female' ? 'bg-pink-100 text-pink-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {pg.gender}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">₹{pg.price}/month</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(pg.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/pg/${pg._id}`} className="text-green-600 hover:text-green-900 mr-3">
                            <Eye size={18} />
                          </Link>
                          <Link to={`/admin/edit-pg/${pg._id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(pg._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium">
                        {indexOfLastItem > filteredPgs.length ? filteredPgs.length : indexOfLastItem}
                      </span>{' '}
                      of <span className="font-medium">{filteredPgs.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => paginate(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === index + 1
                              ? 'z-10 bg-yellow-50 border-yellow-500 text-yellow-600'
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === totalPages
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPgList;