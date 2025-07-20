# 🚀 Frontend API Integration Guide

## Base URL: `http://localhost:5000`

---

## 🔐 **AUTHENTICATION APIs**

### Register User
```javascript
POST /api/auth/register
Content-Type: application/json

Body:
{
  "username": "john_doe",
  "email": "john@example.com", 
  "password": "password123"
}

Response:
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "customer"
}
```

### Login User
```javascript
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 📦 **PRODUCT CRUD APIs** (Your Main Focus)

### Get All Products (Public)
```javascript
GET /api/products/all

Response:
[
  {
    "id": 1,
    "title": "Modern Lamp",
    "description": "Beautiful table lamp",
    "price": 49.99,
    "category": "lighting",
    "image": "lamp.jpg",
    "rating": 4.5
  }
]
```

### Get Single Product (Public)
```javascript
GET /api/products/all/:id

Example: GET /api/products/all/1
```

### Create Product (Admin Only)
```javascript
POST /api/products/add
Content-Type: application/json
Authorization: Bearer {token}

Body:
{
  "title": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "furniture",
  "image": "product.jpg",
  "rating": 4.0
}
```

### Update Product (Admin Only)
```javascript
PUT /api/products/update/:id
Content-Type: application/json
Authorization: Bearer {token}

Body:
{
  "title": "Updated Product Name",
  "price": 79.99
}
```

### Delete Product (Admin Only)
```javascript
DELETE /api/products/delete/:id
Authorization: Bearer {token}

Example: DELETE /api/products/delete/1
```

---

## 🧾 **ORDER APIs** (For Admin Panel)

### Get All Orders (Admin Panel)
```javascript
GET /api/orders/admin
Authorization: Bearer {admin_token}

Response:
[
  {
    "id": 1,
    "userId": 5,
    "total": 149.99,
    "status": "pending",
    "items": [...],
    "createdAt": "2025-07-20T10:00:00Z"
  }
]
```

### Update Order Status (Admin)
```javascript
PUT /api/orders/:id
Content-Type: application/json
Authorization: Bearer {admin_token}

Body:
{
  "status": "shipped"  // pending, processing, shipped, delivered
}
```

---

## 🛒 **CART APIs** (Optional - For E-commerce Flow)

### Add to Cart
```javascript
POST /api/cart/
Content-Type: application/json
Authorization: Bearer {token}

Body:
{
  "productId": 1,
  "quantity": 2
}
```

### Get User's Cart
```javascript
GET /api/cart/
Authorization: Bearer {token}
```

### Update Cart Item
```javascript
PUT /api/cart/:cartItemId
Content-Type: application/json
Authorization: Bearer {token}

Body:
{
  "quantity": 3
}
```

### Remove from Cart
```javascript
DELETE /api/cart/:cartItemId
Authorization: Bearer {token}
```

---

## 🎯 **Frontend Integration Examples**

### React/JavaScript Examples:

#### Login Function
```javascript
const login = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};
```

#### Get All Products
```javascript
const getProducts = async () => {
  const response = await fetch('http://localhost:5000/api/products/all');
  return await response.json();
};
```

#### Create Product (Admin)
```javascript
const createProduct = async (productData) => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/products/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });
  return await response.json();
};
```

#### Get All Orders for Admin Panel
```javascript
const getAllOrders = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/orders/admin', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};
```

---

## 📱 **Your Frontend Needs:**

### 🔑 **Authentication Pages:**
- Login form → `POST /api/auth/login`
- Register form → `POST /api/auth/register`

### 📦 **Product Management (Admin):**
- Product list → `GET /api/products/all`
- Add product → `POST /api/products/add`
- Edit product → `PUT /api/products/update/:id`
- Delete product → `DELETE /api/products/delete/:id`

### 🧾 **Order Management (Admin Panel):**
- View all orders → `GET /api/orders/admin`
- Update order status → `PUT /api/orders/:id`

### 🛒 **Cart (Optional):**
- Only needed if you want shopping cart functionality
- Users can add items before purchasing

---

## 🎯 **Summary:**

**CART ROUTES** = Shopping cart functionality (add items, view cart, update quantities)
**ORDER ROUTES** = Order management (place orders, view orders, admin panel)
**PRODUCT ROUTES** = Your main CRUD operations
**AUTH ROUTES** = User login/register

Your backend is perfectly set up for a complete e-commerce solution!
