import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PaymentMethod } from '../types';
import { getPaymentMethodsByUser } from '../data/mockData';
import PaymentMethodCard from '../components/PaymentMethodCard';

const CheckoutPage: React.FC = () => {
  const { items, restaurant, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    // Redirect if cart is empty
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    
    // Redirect if user can't checkout
    if (user && user.role === 'Member') {
      navigate('/cart');
      return;
    }
    
    // Fetch payment methods
    if (user) {
      const methods = getPaymentMethodsByUser(user._id);
      setPaymentMethods(methods);
      
      if (methods.length > 0) {
        setSelectedPaymentId(methods[0]._id);
      }
    }
  }, [user, items, navigate]);
  
  const handlePlaceOrder = () => {
    if (!selectedPaymentId) {
      alert('Please select a payment method');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        clearCart();
        navigate('/orders');
      }, 2000);
    }, 1500);
  };
  
  if (success) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-8">Your order has been placed and is being processed.</p>
          <p className="text-gray-500">Redirecting to your orders...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/cart')}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Cart
      </button>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            {restaurant && (
              <div className="mb-4">
                <p className="text-gray-700 font-medium">Restaurant: {restaurant.name}</p>
              </div>
            )}
            
            <ul className="divide-y divide-gray-200 mb-4">
              {items.map(item => (
                <li key={item._id} className="py-3 flex justify-between">
                  <div>
                    <p className="text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="text-gray-900">${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>${(total * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
            
            {paymentMethods.length > 0 ? (
              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div 
                    key={method._id}
                    className={`border rounded-lg p-3 cursor-pointer ${
                      selectedPaymentId === method._id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedPaymentId(method._id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedPaymentId === method._id}
                        onChange={() => setSelectedPaymentId(method._id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <div className="ml-3 flex-1">
                        <PaymentMethodCard paymentMethod={method} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">No payment methods available.</p>
                <p className="text-gray-500 text-sm mt-1">Please add a payment method to continue.</p>
              </div>
            )}
          </div>
          
          <button
            onClick={handlePlaceOrder}
            disabled={loading || paymentMethods.length === 0}
            className={`w-full py-3 px-4 rounded-md shadow-sm text-white text-sm font-medium ${
              loading || paymentMethods.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;