import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Store, Coffee, ClipboardList } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: 'Manage Orders',
      icon: <ClipboardList className="h-8 w-8" />,
      description: 'View and manage all orders',
      path: '/admin/orders'
    },
    {
      title: 'Manage Dishes',
      icon: <Coffee className="h-8 w-8" />,
      description: 'Add, edit, or remove menu items',
      path: '/admin/dishes'
    },
    {
      title: 'Manage Restaurants',
      icon: <Store className="h-8 w-8" />,
      description: 'Manage restaurant information',
      path: '/admin/restaurants'
    },
    {
      title: 'Manage Users',
      icon: <Users className="h-8 w-8" />,
      description: 'Handle user accounts and roles',
      path: '/admin/users'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <LayoutDashboard className="h-8 w-8 text-indigo-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer transition-transform hover:scale-105"
          >
            <div className="flex items-center justify-center mb-4 text-indigo-600">
              {item.icon}
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">{item.title}</h2>
            <p className="text-gray-600 text-center text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;