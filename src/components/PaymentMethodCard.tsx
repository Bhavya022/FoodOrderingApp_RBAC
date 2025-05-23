import React from 'react';
import { CreditCard, Trash2 } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onDelete?: (id: string) => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ paymentMethod, onDelete }) => {
  const getCardIcon = () => {
    switch (paymentMethod.provider.toLowerCase()) {
      case 'visa':
        return <span className="text-blue-600 font-bold">VISA</span>;
      case 'mastercard':
        return <span className="text-red-600 font-bold">MC</span>;
      case 'amex':
        return <span className="text-blue-800 font-bold">AMEX</span>;
      case 'discover':
        return <span className="text-orange-600 font-bold">DISC</span>;
      default:
        return <CreditCard className="h-6 w-6" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="mr-3">
          {getCardIcon()}
        </div>
        <div>
          <p className="font-medium">•••• •••• •••• {paymentMethod.cardLast4}</p>
          <p className="text-sm text-gray-500">Expires: {paymentMethod.expiry}</p>
        </div>
      </div>
      
      {onDelete && (
        <button
          onClick={() => onDelete(paymentMethod._id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Delete payment method"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default PaymentMethodCard;