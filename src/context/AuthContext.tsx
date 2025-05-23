import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: string, country: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setAuthState(prev => ({ ...prev, loading: false }));
        return;
      }
      
      try {
        // For demo purposes, decode the token to get user info
        // In a real app, you'd verify with the backend
        const decoded = jwtDecode<{ user: User }>(token);
        
        setAuthState({
          user: decoded.user,
          token,
          isAuthenticated: true,
          loading: false,
        });
        
        // Set default Authorization header for all requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        localStorage.removeItem('token');
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a successful login with mock data
      const mockUsers = [
        { _id: '1', name: 'Nick Fury', email: 'nick@shield.com', role: 'Admin', country: 'America' },
        { _id: '2', name: 'Captain Marvel', email: 'marvel@shield.com', role: 'Manager', country: 'India' },
        { _id: '3', name: 'Captain America', email: 'america@shield.com', role: 'Manager', country: 'America' },
        { _id: '4', name: 'Thanos', email: 'thanos@shield.com', role: 'Member', country: 'India' },
        { _id: '5', name: 'Thor', email: 'thor@shield.com', role: 'Member', country: 'India' },
        { _id: '6', name: 'Travis', email: 'travis@shield.com', role: 'Member', country: 'America' },
      ];
      
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Create a mock token with the user info
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ user }))}`;
      
      localStorage.setItem('token', token);
      
      setAuthState({
        user: user as User,
        token,
        isAuthenticated: true,
        loading: false,
      });
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (err) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
    });
  };

  const register = async (name: string, email: string, password: string, role: string, country: string) => {
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a successful registration
      const newUser = {
        _id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        country,
      };
      
      // Create a mock token with the user info
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ user: newUser }))}`;
      
      localStorage.setItem('token', token);
      
      setAuthState({
        user: newUser as User,
        token,
        isAuthenticated: true,
        loading: false,
      });
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (err) {
      throw new Error('Registration failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};