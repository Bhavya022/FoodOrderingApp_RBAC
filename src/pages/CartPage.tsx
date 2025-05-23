import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage: React.FC = () => {
  const { items, restaurant, removeFromCart, updateQuantity, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const canCheckout = user && (user.role === 'Admin' || user.role === 'Manager');
  
  const handleCheckout = () => {
    if (!canCheckout) {
      alert('Only Managers and Admins can checkout orders.');
      return;
    }
    
    navigate('/checkout');
  };
  
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add items from restaurants to get started.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </button>
      </div>
      
      {restaurant && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            <span className="font-medium">Restaurant:</span> {restaurant.name}
          </p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <ul className="divide-y divide-gray-200">
          {items.map(item => (
            <li key={item._id} className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-16 w-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center border rounded-md mr-4">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center mt-1"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">${(total * 0.1).toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">${(total * 1.1).toFixed(2)}</span>
        </div>
        
        <div className="mt-6">
          <button
            onClick={handleCheckout}
            disabled={!canCheckout}
            className={`w-full py-3 px-4 rounded-md shadow-sm text-white text-sm font-medium ${
              canCheckout 
                ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {canCheckout ? 'Proceed to Checkout' : 'Only Managers and Admins can checkout'}
          </button>
          
          {!canCheckout && (
            <p className="mt-2 text-sm text-gray-500 text-center">
              Members cannot checkout orders. Please contact your manager.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;