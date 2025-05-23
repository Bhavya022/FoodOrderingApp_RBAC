import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import PaymentMethodsPage from './pages/PaymentMethodsPage';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import ManageOrdersPage from './pages/admin/ManageOrdersPage';
import ManageDishesPage from './pages/admin/ManageDishesPage';
import ManageRestaurantsPage from './pages/admin/ManageRestaurantsPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';

// Protected route component
const ProtectedRoute: React.FC<{ 
  element: React.ReactNode; 
  allowedRoles?: string[];
}> = ({ element, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return <>{element}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<RestaurantsPage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
        <Route 
          path="/cart" 
          element={<ProtectedRoute element={<CartPage />} />} 
        />
        <Route 
          path="/checkout" 
          element={<ProtectedRoute element={<CheckoutPage />} allowedRoles={['Admin', 'Manager']} />} 
        />
        <Route 
          path="/orders" 
          element={<ProtectedRoute element={<OrdersPage />} />} 
        />
        <Route 
          path="/admin/payments" 
          element={<ProtectedRoute element={<PaymentMethodsPage />} allowedRoles={['Admin']} />} 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={<ProtectedRoute element={<DashboardPage />} allowedRoles={['Admin']} />} 
        />
        <Route 
          path="/admin/orders" 
          element={<ProtectedRoute element={<ManageOrdersPage />} allowedRoles={['Admin']} />} 
        />
        <Route 
          path="/admin/dishes" 
          element={<ProtectedRoute element={<ManageDishesPage />} allowedRoles={['Admin']} />} 
        />
        <Route 
          path="/admin/restaurants" 
          element={<ProtectedRoute element={<ManageRestaurantsPage />} allowedRoles={['Admin']} />} 
        />
        <Route 
          path="/admin/users" 
          element={<ProtectedRoute element={<ManageUsersPage />} allowedRoles={['Admin']} />} 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;