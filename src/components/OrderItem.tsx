import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '../types';
import { useAuth } from '../context/AuthContext';

interface OrderItemProps {
  order: Order;
  onCancel?: (orderId: string) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onCancel }) => {
  const { user } = useAuth();
  
  const getStatusIcon = () => {
    switch (order.status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = () => {
    switch (order.status) {
      case 'pending':
        return 'Pending';
      case 'paid':
        return 'Paid';
      case 'cancelled':
        return 'Cancelled';
      default:
        return '';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  const canCancel = order.status === 'pending' && 
    (user?.role === 'Admin' || user?.role === 'Manager');

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{order.restaurantName}</h3>
          <p className="text-sm text-gray-500">Order #{order._id.slice(-6)}</p>
          <p className="text-sm text-gray-500">Placed on: {formatDate(order.createdAt)}</p>
        </div>
        <div className="flex items-center">
          {getStatusIcon()}
          <span className="ml-1 text-sm font-medium">{getStatusText()}</span>
        </div>
      </div>
      
      <div className="mt-4 border-t pt-4">
        <h4 className="text-sm font-medium mb-2">Order Items:</h4>
        <ul className="space-y-2">
          {order.items.map((item) => (
            <li key={item.menuItemId} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-4 pt-2 border-t flex justify-between font-semibold">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
      
      {canCancel && onCancel && (
        <div className="mt-4 pt-2 border-t">
          <button
            onClick={() => onCancel(order._id)}
            className="w-full py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          >
            Cancel Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderItem;