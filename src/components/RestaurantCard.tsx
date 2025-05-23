import React from 'react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="h-48 overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {restaurant.country}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">{restaurant.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;