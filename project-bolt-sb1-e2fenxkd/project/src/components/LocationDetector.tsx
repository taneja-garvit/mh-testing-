import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface LocationDetectorProps {
  onLocationDetected: (location: { lat: number; lng: number; address: string }) => void;
}

const LocationDetector: React.FC<LocationDetectorProps> = ({ onLocationDetected }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualLocation, setManualLocation] = useState('');

  const detectLocation = () => {
    setIsDetecting(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding to get address from coordinates
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          
          if (!response.ok) {
            throw new Error('Failed to get address');
          }
          
          const data = await response.json();
          const address = data.display_name || 'Unknown location';
          
          onLocationDetected({
            lat: latitude,
            lng: longitude,
            address
          });
          
          setManualLocation(address);
          setIsDetecting(false);
        } catch (err) {
          setError('Failed to get your location. Please enter it manually.');
          setIsDetecting(false);
        }
      },
      (err) => {
        setError(`Error: ${err.message}. Please enter your location manually.`);
        setIsDetecting(false);
      }
    );
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      onLocationDetected({
        lat: 0,
        lng: 0,
        address: manualLocation
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Find PGs Near You</h3>
        
        <button
          onClick={detectLocation}
          disabled={isDetecting}
          className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md mb-4 transition-colors"
        >
          <MapPin className="mr-2" size={18} />
          {isDetecting ? 'Detecting...' : 'Detect My Location'}
        </button>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <div className="relative">
          <form onSubmit={handleManualSubmit}>
            <input
              type="text"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              placeholder="Or enter location manually"
              className="w-full border border-gray-300 rounded-md py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <MapPin size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationDetector;