import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { Restaurant } from '../../types';
import { restaurants } from '../../data/mockData';

const ManageRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [country, setCountry] = useState('India');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call
    setRestaurantList(restaurants);
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingRestaurant) {
      // Update existing restaurant
      setRestaurantList(prevRestaurants =>
        prevRestaurants.map(restaurant =>
          restaurant._id === editingRestaurant._id
            ? {
                ...restaurant,
                name,
                country: country as 'India' | 'America',
                description,
                image
              }
            : restaurant
        )
      );
    } else {
      // Add new restaurant
      const newRestaurant: Restaurant = {
        _id: Math.random().toString(36).substr(2, 9),
        name,
        country: country as 'India' | 'America',
        description,
        image
      };
      setRestaurantList(prev => [...prev, newRestaurant]);
    }

    // Reset form
    setName('');
    setCountry('India');
    setDescription('');
    setImage('');
    setShowAddForm(false);
    setEditingRestaurant(null);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setName(restaurant.name);
    setCountry(restaurant.country);
    setDescription(restaurant.description);
    setImage(restaurant.image);
    setShowAddForm(true);
  };

  const handleDelete = (restaurantId: string) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      setRestaurantList(prev => prev.filter(restaurant => restaurant._id !== restaurantId));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Restaurants</h1>
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>
      </div>

      {showAddForm ? (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="India">India</option>
                <option value="America">America</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingRestaurant(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {editingRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="mb-8 flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Restaurant
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantList.map(restaurant => (
          <div key={restaurant._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {restaurant.country}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{restaurant.description}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(restaurant)}
                  className="p-2 text-indigo-600 hover:text-indigo-900"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(restaurant._id)}
                  className="p-2 text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRestaurantsPage;