import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import { Restaurant } from '../types';
import { useAuth } from '../context/AuthContext';
import { getRestaurantsByCountry } from '../data/mockData';
import { Search } from 'lucide-react';

const RestaurantsPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRestaurants = () => {
      setLoading(true);
      
      try {
        // For non-admin users with country restrictions
        if (isAuthenticated && user && user.role !== 'Admin') {
          const countryRestaurants = getRestaurantsByCountry(user.country);
          setRestaurants(countryRestaurants);
        } else {
          // Admin can see all restaurants
          const allRestaurants = getRestaurantsByCountry(null);
          setRestaurants(allRestaurants);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRestaurants();
  }, [user, isAuthenticated]);
  
  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          {isAuthenticated && user?.role !== 'Admin' 
            ? `Restaurants in ${user?.country}`
            : 'All Restaurants'}
        </h1>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
          />
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No restaurants found.</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;