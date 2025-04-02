import React, { useState,useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home as HomeIcon, AlertTriangle, User, SpaceIcon } from 'lucide-react';
import { useSelector } from 'react-redux'; // Correct import
import { RootState } from '../redux/store';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userToken') !== null;
  const [userName, setUserName] = useState<string | null>(null);
  const user = useSelector((store: RootState) => store.auth.user); // Type store with RootState
  const displayName = user?.name;


  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white py-4 px-6 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <HomeIcon className="h-8 w-8 text-black" />
          <span className="text-2xl font-bold text-black">motherHomes</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`${isActive('/') ? 'text-yellow-500 font-medium' : 'text-gray-600'} hover:text-yellow-500 transition-colors`}>
            Home
          </Link>
          <Link to="/about" className={`${isActive('/about') ? 'text-yellow-500 font-medium' : 'text-gray-600'} hover:text-yellow-500 transition-colors`}>
            About
          </Link>
          <Link to="/services" className={`${isActive('/services') ? 'text-yellow-500 font-medium' : 'text-gray-600'} hover:text-yellow-500 transition-colors`}>
            Services
          </Link>
          <Link to="/contact" className={`${isActive('/contact') ? 'text-yellow-500 font-medium' : 'text-gray-600'} hover:text-yellow-500 transition-colors`}>
            Contact
          </Link>
          <Link to="/complaints" className={`${isActive('/complaints') ? 'text-yellow-500 font-medium' : 'text-gray-600'} hover:text-yellow-500 transition-colors flex items-center`}>
            <AlertTriangle size={16} className="mr-1" />
            Complaints
          </Link>
          <Link to="/search" className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-full transition-colors">
            Explore
          </Link>
          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500" onClick={handleLogout}>
              <User size={20}  onClick={handleLogout}/>
              {/* {<span>{userName}</span>} */}
              {displayName}
               
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="text-gray-600 hover:text-yellow-500 font-medium">
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-inner">
          <div className="flex flex-col space-y-4">
            <Link to="/" className={`${isActive('/') ? 'text-yellow-500 font-medium' : 'text-gray-600'} hover:text-yellow-500 transition-colors`} onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/about" className={`${isActive('/about') ? 'text-yellow-500 font-medium' : 'text-gray-600'} hover:text-yellow-500 transition-colors`} onClick={toggleMenu}>
              About
            </Link>
            <Link to="/services" className={`${isActive('/services') ? 'text-yellow-500 font-medium' : 'text-gray-600'} hover:text-yellow-500 transition-colors`} onClick={toggleMenu}>
              Services
            </Link>
            <Link to="/contact" className={`${isActive('/contact') ? 'text-yellow-500 font-medium' : 'text-gray-600'} hover:text-yellow-500 transition-colors`} onClick={toggleMenu}>
              Contact
            </Link>
            {/* <Link to="/complaints" className={`${isActive('/complaints') ? 'text-yellow-500 font-medium' : 'text-gray-600'} hover:text-yellow-500 transition-colors flex items-center`} onClick={toggleMenu}>
              <AlertTriangle size={16} className="mr-1" />
              Complaints
            </Link> */}
            <Link to="/search" className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-full transition-colors text-center" onClick={toggleMenu}>
              Explore
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                
                className="text-gray-600 hover:text-yellow-500 font-medium text-left"
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/auth"
                className="text-gray-600 hover:text-yellow-500 font-medium"
                onClick={toggleMenu}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;