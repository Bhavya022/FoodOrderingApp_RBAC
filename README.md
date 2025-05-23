# Food Ordering App with RBAC

A complete full-stack web-based food ordering application with role-based access control (RBAC) and relational access by country (India / America).

## Features

- View restaurants and menu items
- Create an order and add food items
- Checkout cart and pay using existing payment method
- Cancel order
- Modify payment method

## Role-Based Access Control

| Feature                       | Admin | Manager | Member |
|------------------------------|:-----:|:-------:|:------:|
| View restaurants & menus     | ✅    | ✅      | ✅     |
| Create order (add food)      | ✅    | ✅      | ✅     |
| Checkout & pay               | ✅    | ✅      | ❌     |
| Cancel order                 | ✅    | ✅      | ❌     |
| Update payment method        | ✅    | ❌      | ❌     |

## Relational Access Control

Managers and Members can only view and act on restaurants, orders, and data related to their assigned country (India or America).

## Demo Users

1. Nick Fury: Admin
   - Email: nick@shield.com
   - Password: password

2. Captain Marvel: Manager - India
   - Email: marvel@shield.com
   - Password: password

3. Captain America: Manager - America
   - Email: america@shield.com
   - Password: password

4. Thanos: Team Member - India
   - Email: thanos@shield.com
   - Password: password

5. Thor: Team Member - India
   - Email: thor@shield.com
   - Password: password

6. Travis: Team Member - America
   - Email: travis@shield.com
   - Password: password

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS
- State Management: React Context API
- Routing: React Router
- UI Components: Custom components with Tailwind CSS
- Icons: Lucide React

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/src/components`: Reusable UI components
- `/src/context`: React Context for state management
- `/src/data`: Mock data and API simulation
- `/src/pages`: Application pages
- `/src/types`: TypeScript type definitions

## Implementation Details

This application uses mock data and simulated API calls to demonstrate the functionality. In a real-world scenario, this would be connected to a backend API.

The role-based access control is implemented through React Context and protected routes, ensuring that users can only access features appropriate for their role.

Country-based access restrictions are also implemented, allowing managers and members to only see restaurants and orders from their assigned country. 

Deploy LINK - https://luminous-kitten-4f0dfb.netlify.app/