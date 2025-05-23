import { Restaurant, MenuItem, Order, PaymentMethod } from '../types';

// Mock Restaurants
export const restaurants: Restaurant[] = [
  {
    _id: '1',
    name: 'Taj Mahal Spices',
    country: 'India',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Authentic Indian cuisine with a modern twist'
  },
  {
    _id: '2',
    name: 'Delhi Delights',
    country: 'India',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Home-style North Indian dishes'
  },
  {
    _id: '3',
    name: 'Mumbai Street Food',
    country: 'India',
    image: 'https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Vibrant flavors from the streets of Mumbai'
  },
  {
    _id: '4',
    name: 'American Diner',
    country: 'America',
    image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Classic American comfort food'
  },
  {
    _id: '5',
    name: 'Burger Joint',
    country: 'America',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Gourmet burgers and sides'
  },
  {
    _id: '6',
    name: 'New York Pizza',
    country: 'America',
    image: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Authentic New York style pizza'
  }
];

// Mock Menu Items
export const menuItems: MenuItem[] = [
  // Indian Restaurant 1 - Taj Mahal Spices
  {
    _id: '101',
    name: 'Butter Chicken',
    price: 14.99,
    restaurantId: '1',
    description: 'Tender chicken in a rich, creamy tomato sauce',
    image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '102',
    name: 'Paneer Tikka',
    price: 12.99,
    restaurantId: '1',
    description: 'Marinated cottage cheese, grilled to perfection',
    image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '103',
    name: 'Chicken Biryani',
    price: 16.99,
    restaurantId: '1',
    description: 'Fragrant rice dish with spiced chicken',
    image: 'https://images.pexels.com/photos/7353380/pexels-photo-7353380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  
  // Indian Restaurant 2 - Delhi Delights
  {
    _id: '201',
    name: 'Chole Bhature',
    price: 11.99,
    restaurantId: '2',
    description: 'Spicy chickpea curry with fried bread',
    image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '202',
    name: 'Dal Makhani',
    price: 10.99,
    restaurantId: '2',
    description: 'Creamy black lentil stew',
    image: 'https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '203',
    name: 'Tandoori Roti',
    price: 2.99,
    restaurantId: '2',
    description: 'Whole wheat flatbread baked in a clay oven',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  
  // Indian Restaurant 3 - Mumbai Street Food
  {
    _id: '301',
    name: 'Pav Bhaji',
    price: 9.99,
    restaurantId: '3',
    description: 'Spiced vegetable mash with buttered rolls',
    image: 'https://images.pexels.com/photos/5835353/pexels-photo-5835353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '302',
    name: 'Vada Pav',
    price: 6.99,
    restaurantId: '3',
    description: 'Spicy potato fritter in a bun',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '303',
    name: 'Bhel Puri',
    price: 7.99,
    restaurantId: '3',
    description: 'Crunchy puffed rice with tangy chutneys',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  
  // American Restaurant 1 - American Diner
  {
    _id: '401',
    name: 'Classic Breakfast',
    price: 12.99,
    restaurantId: '4',
    description: 'Eggs, bacon, toast, and hash browns',
    image: 'https://images.pexels.com/photos/139746/pexels-photo-139746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '402',
    name: 'Club Sandwich',
    price: 10.99,
    restaurantId: '4',
    description: 'Triple-decker sandwich with turkey, bacon, and lettuce',
    image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '403',
    name: 'Chicken Fried Steak',
    price: 15.99,
    restaurantId: '4',
    description: 'Breaded steak with country gravy',
    image: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  
  // American Restaurant 2 - Burger Joint
  {
    _id: '501',
    name: 'Classic Cheeseburger',
    price: 11.99,
    restaurantId: '5',
    description: 'Beef patty with American cheese on a brioche bun',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '502',
    name: 'Bacon Avocado Burger',
    price: 14.99,
    restaurantId: '5',
    description: 'Beef patty with bacon, avocado, and special sauce',
    image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '503',
    name: 'Truffle Fries',
    price: 6.99,
    restaurantId: '5',
    description: 'Crispy fries with truffle oil and parmesan',
    image: 'https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  
  // American Restaurant 3 - New York Pizza
  {
    _id: '601',
    name: 'Cheese Pizza',
    price: 14.99,
    restaurantId: '6',
    description: 'Classic New York style cheese pizza',
    image: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '602',
    name: 'Pepperoni Pizza',
    price: 16.99,
    restaurantId: '6',
    description: 'Cheese pizza topped with pepperoni',
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '603',
    name: 'Garlic Knots',
    price: 5.99,
    restaurantId: '6',
    description: 'Twisted bread with garlic butter and parmesan',
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Mock Orders
export const orders: Order[] = [
  {
    _id: '1001',
    userId: '1', // Nick Fury (Admin)
    restaurantId: '1',
    restaurantName: 'Taj Mahal Spices',
    status: 'paid',
    items: [
      { menuItemId: '101', name: 'Butter Chicken', price: 14.99, quantity: 2 },
      { menuItemId: '102', name: 'Paneer Tikka', price: 12.99, quantity: 1 }
    ],
    total: 42.97,
    createdAt: '2023-05-15T10:30:00Z'
  },
  {
    _id: '1002',
    userId: '2', // Captain Marvel (Manager - India)
    restaurantId: '2',
    restaurantName: 'Delhi Delights',
    status: 'pending',
    items: [
      { menuItemId: '201', name: 'Chole Bhature', price: 11.99, quantity: 1 },
      { menuItemId: '202', name: 'Dal Makhani', price: 10.99, quantity: 1 }
    ],
    total: 22.98,
    createdAt: '2023-05-16T12:45:00Z'
  },
  {
    _id: '1003',
    userId: '3', // Captain America (Manager - America)
    restaurantId: '5',
    restaurantName: 'Burger Joint',
    status: 'paid',
    items: [
      { menuItemId: '501', name: 'Classic Cheeseburger', price: 11.99, quantity: 2 },
      { menuItemId: '503', name: 'Truffle Fries', price: 6.99, quantity: 1 }
    ],
    total: 30.97,
    createdAt: '2023-05-17T18:20:00Z'
  },
  {
    _id: '1004',
    userId: '4', // Thanos (Member - India)
    restaurantId: '3',
    restaurantName: 'Mumbai Street Food',
    status: 'pending',
    items: [
      { menuItemId: '301', name: 'Pav Bhaji', price: 9.99, quantity: 1 },
      { menuItemId: '302', name: 'Vada Pav', price: 6.99, quantity: 2 }
    ],
    total: 23.97,
    createdAt: '2023-05-18T14:10:00Z'
  },
  {
    _id: '1005',
    userId: '6', // Travis (Member - America)
    restaurantId: '4',
    restaurantName: 'American Diner',
    status: 'cancelled',
    items: [
      { menuItemId: '401', name: 'Classic Breakfast', price: 12.99, quantity: 1 }
    ],
    total: 12.99,
    createdAt: '2023-05-19T09:30:00Z'
  }
];

// Mock Payment Methods
export const paymentMethods: PaymentMethod[] = [
  {
    _id: '2001',
    userId: '1', // Nick Fury (Admin)
    cardLast4: '4242',
    provider: 'Visa',
    expiry: '05/25'
  },
  {
    _id: '2002',
    userId: '2', // Captain Marvel (Manager - India)
    cardLast4: '1234',
    provider: 'Mastercard',
    expiry: '08/24'
  },
  {
    _id: '2003',
    userId: '3', // Captain America (Manager - America)
    cardLast4: '5678',
    provider: 'Amex',
    expiry: '12/26'
  },
  {
    _id: '2004',
    userId: '4', // Thanos (Member - India)
    cardLast4: '9012',
    provider: 'Discover',
    expiry: '03/25'
  }
];

// Helper functions to simulate API calls
export const getRestaurantsByCountry = (country: string | null) => {
  if (!country) return restaurants;
  return restaurants.filter(r => r.country === country);
};

export const getMenuItemsByRestaurant = (restaurantId: string) => {
  return menuItems.filter(item => item.restaurantId === restaurantId);
};

export const getOrdersByUser = (userId: string) => {
  return orders.filter(order => order.userId === userId);
};

export const getOrdersByCountry = (country: string) => {
  const restaurantIds = restaurants
    .filter(r => r.country === country)
    .map(r => r._id);
  
  return orders.filter(order => restaurantIds.includes(order.restaurantId));
};

export const getPaymentMethodsByUser = (userId: string) => {
  return paymentMethods.filter(pm => pm.userId === userId);
};