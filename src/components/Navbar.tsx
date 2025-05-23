import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">FoodOrder</span>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                Restaurants
              </Link>
              
              {isAuthenticated && (
                <Link to="/orders" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                  My Orders
                </Link>
              )}
              
              {isAuthenticated && user?.role === 'Admin' && !isAdminRoute && (
                <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                  Admin Dashboard
                </Link>
              )}
              
              {isAuthenticated && user?.role === 'Admin' && isAdminRoute && (
                <>
                  <Link to="/admin/orders" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                    Manage Orders
                  </Link>
                  <Link to="/admin/dishes" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                    Manage Dishes
                  </Link>
                  <Link to="/admin/restaurants" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                    Manage Restaurants
                  </Link>
                  <Link to="/admin/users" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                    Manage Users
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {!isAdminRoute && (
                  <Link to="/cart" className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    {items.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {items.length}
                      </span>
                    )}
                  </Link>
                )}
                
                {user?.role === 'Admin' && (
                  <Link 
                    to={isAdminRoute ? '/' : '/admin'} 
                    className="flex items-center text-sm px-3 py-2 rounded-md hover:bg-indigo-500"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-1" />
                    {isAdminRoute ? 'Main Site' : 'Dashboard'}
                  </Link>
                )}
                
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium mr-2">{user?.name}</span>
                  <span className="text-xs bg-indigo-700 px-2 py-1 rounded-full">{user?.role}</span>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-sm px-3 py-2 rounded-md hover:bg-indigo-500"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium bg-white text-indigo-600 hover:bg-gray-100">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;