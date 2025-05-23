import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, Restaurant } from '../types';

interface CartContextType {
  items: CartItem[];
  restaurant: Restaurant | null;
  addToCart: (item: MenuItem, restaurant: Restaurant) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate total whenever items change
    const newTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }, [items]);

  const addToCart = (item: MenuItem, restaurantInfo: Restaurant) => {
    // If adding from a different restaurant, clear the cart first
    if (restaurant && restaurant._id !== restaurantInfo._id) {
      if (!window.confirm('Adding items from a different restaurant will clear your current cart. Continue?')) {
        return;
      }
      setItems([]);
    }
    
    setRestaurant(restaurantInfo);
    
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i._id === item._id);
      
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(i => 
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item._id !== itemId));
    
    // If cart becomes empty, reset restaurant
    if (items.length === 1) {
      setRestaurant(null);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item._id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setRestaurant(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        restaurant,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};