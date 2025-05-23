import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PaymentMethod } from '../types';
import { getPaymentMethodsByUser, paymentMethods } from '../data/mockData';
import PaymentMethodCard from '../components/PaymentMethodCard';

const PaymentMethodsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [userPaymentMethods, setUserPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardProvider, setCardProvider] = useState('Visa');
  const [expiryDate, setExpiryDate] = useState('');
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Only Admin can access this page
    if (user.role !== 'Admin') {
      navigate('/');
      return;
    }
    
    const fetchPaymentMethods = () => {
      setLoading(true);
      
      try {
        const methods = getPaymentMethodsByUser(user._id);
        setUserPaymentMethods(methods);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentMethods();
  }, [user, navigate]);
  
  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cardNumber.length < 4) {
      alert('Please enter a valid card number');
      return;
    }
    
    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
      alert('Please enter a valid expiry date (MM/YY)');
      return;
    }
    
    // In a real app, this would be an API call
    const newPaymentMethod: PaymentMethod = {
      _id: Math.random().toString(36).substr(2, 9),
      userId: user?._id || '',
      cardLast4: cardNumber.slice(-4),
      provider: cardProvider,
      expiry: expiryDate,
    };
    
    setUserPaymentMethods(prev => [...prev, newPaymentMethod]);
    
    // Reset form
    setCardNumber('');
    setCardProvider('Visa');
    setExpiryDate('');
    setShowAddForm(false);
  };
  
  const handleDeletePaymentMethod = (id: string) => {
    // In a real app, this would be an API call
    setUserPaymentMethods(prev => prev.filter(method => method._id !== id));
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
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Restaurants
      </button>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Payment Methods</h1>
      
      {userPaymentMethods.length > 0 ? (
        <div className="space-y-4 mb-8">
          {userPaymentMethods.map(method => (
            <PaymentMethodCard 
              key={method._id} 
              paymentMethod={method} 
              onDelete={handleDeletePaymentMethod} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg shadow-md mb-8">
          <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500">No payment methods available.</p>
          <p className="text-gray-500 text-sm mt-1">Add a payment method to get started.</p>
        </div>
      )}
      
      {showAddForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Payment Method</h2>
          
          <form onSubmit={handleAddPaymentMethod}>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                placeholder="•••• •••• •••• ••••"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="cardProvider" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Provider
                </label>
                <select
                  id="cardProvider"
                  value={cardProvider}
                  onChange={(e) => setCardProvider(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Amex">American Express</option>
                  <option value="Discover">Discover</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Payment Method
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center w-full py-3 px-4 border border-dashed border-gray-300 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Payment Method
        </button>
      )}
    </div>
  );
};

export default PaymentMethodsPage;