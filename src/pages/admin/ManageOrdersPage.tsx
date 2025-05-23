import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Order } from '../../types';
import { orders } from '../../data/mockData';
import OrderItem from '../../components/OrderItem';

const ManageOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    setAllOrders(orders);
    setLoading(false);
  }, []);

  const handleCancelOrder = (orderId: string) => {
    setAllOrders(prevOrders =>
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
        <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </button>
      </div>

      <div className="space-y-6">
        {allOrders.map(order => (
          <OrderItem
            key={order._id}
            order={order}
            onCancel={handleCancelOrder}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageOrdersPage;