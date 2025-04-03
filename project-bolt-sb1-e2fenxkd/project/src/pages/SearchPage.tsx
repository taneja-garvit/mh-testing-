import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LocationDetector from '../components/LocationDetector';
import PgCard from '../components/PgCard';
import { Search, Filter, MapPin } from 'lucide-react';
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
  location: {
    coordinates: [number, number];
  };
  distance?: string;
}

const SearchPage: React.FC = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Fixed to use VITE_ prefix
  const [pgs, setPgs] = useState<PG[]>([]);
  const [filteredPgs, setFilteredPgs] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [distanceFilter, setDistanceFilter] = useState<number>(20); // Distance filter, set to 5 km


  useEffect(() => {
    const fetchPGs = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        const response = await axios.get(`http://localhost:8000/api/v1/fetchdetails`, {withCredentials:true});
        setPgs(response.data);
        setFilteredPgs(response.data);
        console.log(response.data)

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch PGs. Please try again later.');
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);

  useEffect(() => {
    if (userLocation && pgs.length > 0) {
      // Calculate distance for each PG from user location
      const pgsWithDistance = pgs.map(pg => {
        // Calculate rough distance (this is a simplified version)
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          pg.location.coordinates[1],
          pg.location.coordinates[0]
        );
        
        return {
          ...pg,
          distance: formatDistance(distance)
        };
      });
      
      // Sort by distance
      pgsWithDistance.sort((a, b) => {
        const distA = parseFloat(a.distance?.replace(' km', '') || '0');
        const distB = parseFloat(b.distance?.replace(' km', '') || '0');
        return distA - distB;
      });
      setPgs(pgsWithDistance);
      applyFilters(pgsWithDistance);
      const filteredByDistance = pgsWithDistance.filter(pg => {
        const dist = parseFloat(pg.distance?.replace(' km', '') || '0');
        return dist <= distanceFilter;
      });

      setPgs(pgsWithDistance);
      applyFilters(filteredByDistance);
      
    }
  }, [userLocation]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)} m`;
    }
    return `${distance.toFixed(1)} km`;
  };

  const handleLocationDetected = (location: { lat: number; lng: number; address: string }) => {
    setUserLocation(location);
    setSearchQuery(location.address);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(pgs);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const applyFilters = (pgList: PG[]) => {
    let filtered = [...pgList];
    
    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(pg => 
        pg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pg.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pg.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(pg => 
      pg.price >= priceRange[0] && pg.price <= priceRange[1]
    );
    
    // Apply gender filter
    if (selectedGender) {
      filtered = filtered.filter(pg => pg.gender === selectedGender);
    }
    
    // Apply room type filter
    if (selectedType) {
      filtered = filtered.filter(pg => pg.type === selectedType);
    }
    
    // Apply amenities filter
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(pg => 
        selectedAmenities.every(amenity => pg.amenities.includes(amenity))
      );
    }
    
    setFilteredPgs(filtered);
  };

  const resetFilters = () => {
    setPriceRange([0, 20000]);
    setSelectedGender('');
    setSelectedType('');
    setSelectedAmenities([]);
    setFilteredPgs(pgs);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Find Your Perfect PG</h1>
          
          {/* Location Detector */}
          {/* <div className="mb-10">
            <LocationDetector onLocationDetected={handleLocationDetected} />
          </div> */}
          
          {/* Search Bar */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {setSearchQuery(e.target.value);
                    handleSearch(e);
                  }}
                  placeholder="Search by location, PG name, or city"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
              >
                <Search size={18} className="mr-2" />
                Search
              </button>
              
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
              >
                <Filter size={18} className="mr-2" />
                Filters
              </button>
            </form>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (₹{priceRange[0]} - ₹{priceRange[1]})
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Any</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
                
                {/* Room Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type 
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Any</option>
                    <option value="Single Room">Single Room</option>
                    <option value="Double Sharing">Double Sharing</option>
                    <option value="Triple Sharing">Triple Sharing</option>
                  </select>
                </div>
                
                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes('wifi')}
                        onChange={() => toggleAmenity('wifi')}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">WiFi</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes('food')}
                        onChange={() => toggleAmenity('food')}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Food</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes('ac')}
                        onChange={() => toggleAmenity('ac')}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">AC</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => applyFilters(pgs)}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Results */}
          <div>
            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Loading PGs...</p>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
              </div>
            ) : filteredPgs.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">No PGs found matching your criteria. Try adjusting your filters.</p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-gray-600">{filteredPgs.length} PGs found</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPgs.map((pg) => (
                    <PgCard key={pg._id} pg={pg} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;