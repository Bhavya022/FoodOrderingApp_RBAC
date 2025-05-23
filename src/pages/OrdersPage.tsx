import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import { getOrdersByUser, getOrdersByCountry, orders } from '../data/mockData';
import OrderItem from '../components/OrderItem';

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchOrders = () => {
      setLoading(true);
      
      try {
        let fetchedOrders: Order[] = [];
        
        if (user.role === 'Admin') {
          // Admin can see all orders
          fetchedOrders = [...orders];
        } else if (user.role === 'Manager') {
          // Managers see orders from their country
          fetchedOrders = getOrdersByCountry(user.country);
        } else {
          // Members see only their orders
          fetchedOrders = getOrdersByUser(user._id);
        }
        
        setUserOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user, navigate]);
  
  const handleCancelOrder = (orderId: string) => {
    // In a real app, this would be an API call
    setUserOrders(prevOrders => 
      prevOrders.map(order => 
        order._id === orderId 
          ? { ...order, status: 'cancelled' } 
          : order
      )
    );
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
        <h1 className="text-3xl font-bold text-gray-900">
          {user?.role === 'Admin' 
            ? 'All Orders' 
            : user?.role === 'Manager'
              ? `Orders in ${user.country}`
              : 'Your Orders'}
        </h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Restaurants
        </button>
      </div>
      
      {userOrders.length > 0 ? (
        <div className="space-y-6">
          {userOrders.map(order => (
            <OrderItem 
              key={order._id} 
              order={order} 
              onCancel={
                order.status === 'pending' && 
                (user?.role === 'Admin' || user?.role === 'Manager') 
                  ? handleCancelOrder 
                  : undefined
              } 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Browse Restaurants
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;