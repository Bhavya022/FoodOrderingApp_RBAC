import React from 'react';
import { PlusCircle } from 'lucide-react';
import { MenuItem as MenuItemType, Restaurant } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface MenuItemProps {
  item: MenuItemType;
  restaurant: Restaurant;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, restaurant }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    
    addToCart(item, restaurant);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-40 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <span className="font-bold text-indigo-600">${item.price.toFixed(2)}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 h-12 overflow-hidden">{item.description}</p>
        <button
          onClick={handleAddToCart}
          className="mt-3 w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItem;