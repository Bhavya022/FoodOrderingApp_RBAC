export type Role = 'Admin' | 'Manager' | 'Member';
export type Country = 'India' | 'America';
export type OrderStatus = 'pending' | 'paid' | 'cancelled';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  country: Country;
}

export interface Restaurant {
  _id: string;
  name: string;
  country: Country;
  image: string;
  description: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  restaurantId: string;
  description: string;
  image: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  createdAt: string;
}

export interface PaymentMethod {
  _id: string;
  userId: string;
  cardLast4: string;
  provider: string;
  expiry: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}