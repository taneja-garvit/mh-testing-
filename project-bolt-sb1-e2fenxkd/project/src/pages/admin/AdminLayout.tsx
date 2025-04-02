import React, { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, List, PlusCircle, LogOut, Menu, X, User } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Home className="h-8 w-8 text-yellow-500" />
              <span className="ml-2 text-xl font-bold">Mother Homes</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <Link
                to="/admin"
                className={`${
                  isActive('/admin')
                    ? 'bg-yellow-100 text-yellow-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              >
                <Home className={`${
                  isActive('/admin') ? 'text-yellow-500' : 'text-gray-400 group-hover:text-gray-500'
                } mr-4 h-6 w-6`} />
                Dashboard
              </Link>
              
              <Link
                to="/admin/pg-list"
                className={`${
                  isActive('/admin/pg-list')
                    ? 'bg-yellow-100 text-yellow-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              >
                <List className={`${
                  isActive('/admin/pg-list') ? 'text-yellow-500' : 'text-gray-400 group-hover:text-gray-500'
                } mr-4 h-6 w-6`} />
                PG Listings
              </Link>
              
              <Link
                to="/admin/add-pg"
                className={`${
                  isActive('/admin/add-pg')
                    ? 'bg-yellow-100 text-yellow-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              >
                <PlusCircle className={`${
                  isActive('/admin/add-pg') ? 'text-yellow-500' : 'text-gray-400 group-hover:text-gray-500'
                } mr-4 h-6 w-6`} />
                Add New PG
              </Link>

              {/* <Link
                to="/admin/users"
                className={`${
                  isActive('/admin/add-pg')
                    ? 'bg-yellow-100 text-yellow-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              >
                <PlusCircle className={`${
                  isActive('/admin/add-pg') ? 'text-yellow-500' : 'text-gray-400 group-hover:text-gray-500'
                } mr-4 h-6 w-6`} />
                Users List
              </Link> */}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex-shrink-0 group block text-gray-600 hover:text-gray-900"
            >
              <div className="flex items-center">
                <div>
                  <User className="inline-block h-10 w-10 rounded-full text-gray-500" />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium">Admin</p>
                  <div className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                    <LogOut className="h-4 w-4 mr-1" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <Home className="h-8 w-8 text-yellow-500" />
                <span className="ml-2 text-xl font-bold">Mother Homes</span>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                <Link
                  to="/admin"
                  className={`${
                    isActive('/admin')
                      ? 'bg-yellow-100 text-yellow-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <Home className={`${
                    isActive('/admin') ? 'text-yellow-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-6 w-6`} />
                  Dashboard
                </Link>
                
                <Link
                  to="/admin/pg-list"
                  className={`${
                    isActive('/admin/pg-list')
                      ? 'bg-yellow-100 text-yellow-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <List className={`${
                    isActive('/admin/pg-list') ? 'text-yellow-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-6 w-6`} />
                  PG Listings
                </Link>
                
                <Link
                  to="/admin/add-pg"
                  className={`${
                    isActive('/admin/add-pg')
                      ? 'bg-yellow-100 text-yellow-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <PlusCircle className={`${
                    isActive('/admin/add-pg') ? 'text-yellow-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-6 w-6`} />
                  Add New PG
                </Link>

                {/* <Link
                  to="/admin/users"
                  className={`${
                    isActive('/admin/add-pg')
                      ? 'bg-yellow-100 text-yellow-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <PlusCircle className={`${
                    isActive('/admin/add-pg') ? 'text-yellow-500' : 'text-gray-400 group-hover:text-gray-500'
                  } mr-3 h-6 w-6`} />
                 Users List
                </Link> */}
              </nav>
            </div>
            
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={handleLogout}
                className="flex-shrink-0 w-full group block text-gray-600 hover:text-gray-900"
              >
                <div className="flex items-center">
                  <div>
                    <User className="inline-block h-9 w-9 rounded-full text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Admin</p>
                    <div className="flex items-center text-xs text-gray-500 hover:text-gray-700">
                      <LogOut className="h-3 w-3 mr-1" />
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;