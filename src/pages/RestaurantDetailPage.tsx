import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import { Restaurant, MenuItem as MenuItemType } from '../types';
import { getMenuItemsByRestaurant, restaurants } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchRestaurantAndMenu = () => {
      setLoading(true);
      
      try {
        if (!id) {
          throw new Error('Restaurant ID is required');
        }
        
        // Find restaurant
        const foundRestaurant = restaurants.find(r => r._id === id);
        
        if (!foundRestaurant) {
          throw new Error('Restaurant not found');
        }
        
        // Check country access for non-admin users
        if (user && user.role !== 'Admin' && user.country !== foundRestaurant.country) {
          throw new Error('You do not have access to restaurants in this country');
        }
        
        setRestaurant(foundRestaurant);
        
        // Get menu items
        const items = getMenuItemsByRestaurant(id);
        setMenuItems(items);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchRestaurantAndMenu();
  }, [id, user]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Restaurants
        </button>
      </div>
    );
  }
  
  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-500">Restaurant not found.</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mt-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Restaurants
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Restaurants
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="h-64 overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {restaurant.country}
            </span>
          </div>
          <p className="mt-2 text-gray-600">{restaurant.description}</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
      
      {menuItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <MenuItem key={item._id} item={item} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No menu items available.</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailPage;