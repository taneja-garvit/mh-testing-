import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Wifi, Coffee } from 'lucide-react';

interface PgCardProps {
  pg: {
    _id: string;
    name: string;
    address: string;
    city: string;
    price: number;
    type: string;
    gender: string;
    amenities: string[];
    images: string[];
    distance?: string;
  };
}

const PgCard: React.FC<PgCardProps> = ({ pg }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img 
          src={pg.images[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"} 
          alt={pg.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-yellow-400 text-black font-medium px-3 py-1 m-2 rounded-full text-sm">
          ₹{pg.price}/month
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{pg.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-1 flex-shrink-0" />
          <p className="text-sm truncate">{pg.address}</p>
        </div>
        
        {pg.distance && (
          <div className="mb-2 text-sm text-green-600 font-medium">
            {pg.distance} away from your location
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            {pg.gender}
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            {pg.type}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {pg.amenities.includes('wifi') && (
            <div className="flex items-center text-gray-600">
              <Wifi size={14} className="mr-1" />
              <span className="text-xs">WiFi</span>
            </div>
          )}
          {pg.amenities.includes('food') && (
            <div className="flex items-center text-gray-600">
              <Coffee size={14} className="mr-1" />
              <span className="text-xs">Food</span>
            </div>
          )}
          {pg.amenities.includes('sharing') && (
            <div className="flex items-center text-gray-600">
              <Users size={14} className="mr-1" />
              <span className="text-xs">Sharing</span>
            </div>
          )}
        </div>
        
        <Link 
          to={`/pg/${pg._id}`}
          className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black text-center font-medium py-2 rounded transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PgCard;