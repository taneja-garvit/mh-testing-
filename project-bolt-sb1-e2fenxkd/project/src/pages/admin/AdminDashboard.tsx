import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { Home, Users, MapPin, DollarSign } from 'lucide-react';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalPgs: 0,
    totalUsers: 0,
    totalCities: 0,
    totalRevenue: 0
  });
  
  const [recentPgs, setRecentPgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls
        const response = await axios.get(`http://localhost:8000/api/v1/fetchdetails`);
        const data = response.data;
        setRecentPgs(data)
        // For demo purposes, we'll use mock data
        
        setStats({
          totalPgs:2,
          totalUsers: 15,
          totalCities: 1,
          totalRevenue: 192000
        });
        
        // setRecentPgs([
        //   {
        //     _id: '1',
        //     name: 'Mother Homes Deluxe',
        //     address: '123 Main St, Downtown',
        //     city: 'Bangalore',
        //     price: 8000,
        //     createdAt: '2023-06-15T10:30:00Z'
        //   },
        //   {
        //     _id: '2',
        //     name: 'Mother Homes Premium',
        //     address: '456 Park Ave, Central',
        //     city: 'Bangalore',
        //     price: 10000,
        //     createdAt: '2023-06-10T14:20:00Z'
        //   },
        //   {
        //     _id: '3',
        //     name: 'Mother Homes Budget',
        //     address: '789 College Rd, University Area',
        //     city: 'Bangalore',
        //     price: 6000,
        //     createdAt: '2023-06-05T09:15:00Z'
        //   },
        //   {
        //     _id: '4',
        //     name: 'Mother Homes Executive',
        //     address: '101 Tech Park, IT Corridor',
        //     city: 'Bangalore',
        //     price: 12000,
        //     createdAt: '2023-06-01T11:45:00Z'
        //   }
        // ]);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total PGs</p>
                <p className="text-2xl font-semibold text-gray-900">{recentPgs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Cities Covered</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalCities}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">₹{0}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent PGs */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recently Added PGs</h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
              <p className="mt-2 text-gray-500">Loading...</p>
            </div>
          ) : (
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
                  {recentPgs.map((pg) => (
                    <tr key={pg._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{pg.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{pg.city}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹{pg.price}/month</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(pg.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/admin/edit-pg/${pg._id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                          Edit
                        </Link>
                        <Link to={`/pg/${pg._id}`} className="text-green-600 hover:text-green-900">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="px-6 py-4 border-t border-gray-200">
            <Link to="/admin/pg-list" className="text-blue-600 hover:text-blue-900 font-medium">
              View All PGs
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;