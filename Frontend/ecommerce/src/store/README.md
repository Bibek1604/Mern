# Zustand State Management Setup

This project uses Zustand for state management, organized into separate stores for different features.

## 📁 Store Structure

```
src/store/
├── index.js          # Central exports and utilities
├── authStore.js      # Authentication state management
├── productStore.js   # Product CRUD operations
├── cartStore.js      # Shopping cart management
├── orderStore.js     # Order management
└── README.md         # This file
```

## 🚀 Quick Start

### 1. Basic Usage

```javascript
import { useAuthStore, useCartStore } from '../store';

function MyComponent() {
  const { user, login, logout } = useAuthStore();
  const { cartItems, addToCartLocal } = useCartStore();
  
  // Your component logic
}
```

### 2. Multiple Stores

```javascript
import { useStores } from '../store';

function MyComponent() {
  const { auth, cart, products, orders } = useStores();
  
  // Access all stores in one place
}
```

## 🔐 Authentication Store (`authStore.js`)

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### State
```javascript
{
  user: null,           // Current user object
  token: null,          // JWT token
  isAuthenticated: false, // Auth status
  isLoading: false,     // Loading state
  error: null           // Error messages
}
```

### Methods
- `register(userData)` - Register new user
- `login(credentials)` - Login user
- `logout()` - Logout user
- `clearError()` - Clear error state
- `getAuthHeaders()` - Get headers with token

### Example
```javascript
const { login, user, isAuthenticated } = useAuthStore();

const handleLogin = async () => {
  const result = await login({ email, password });
  if (result.success) {
    // Login successful
  }
};
```

## 🛍️ Product Store (`productStore.js`)

### API Endpoints
- `GET /api/products/all` - Get all products
- `GET /api/products/all/:id` - Get single product
- `POST /api/products/add` - Create product (admin)
- `PUT /api/products/update/:id` - Update product (admin)
- `DELETE /api/products/delete/:id` - Delete product (admin)

### State
```javascript
{
  products: [],         // Product list
  currentProduct: null, // Selected product
  isLoading: false,     // Loading state
  error: null,          // Error messages
  totalProducts: 0,     // Total count
  currentPage: 1,       // Current page
  hasMore: true         // Pagination flag
}
```

### Methods
- `getAllProducts(page, limit, filters)` - Fetch products
- `getProductById(id)` - Get single product
- `createProduct(data)` - Create product (admin)
- `updateProduct(id, data)` - Update product (admin)
- `deleteProduct(id)` - Delete product (admin)
- `clearCurrentProduct()` - Clear current product
- `resetProducts()` - Reset product list

## 🛒 Cart Store (`cartStore.js`)

### API Endpoints
- `POST /api/cart/` - Add item to cart
- `GET /api/cart/` - Get user's cart items
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### State
```javascript
{
  cartItems: [],        // Cart items array
  totalItems: 0,        // Total item count
  totalPrice: 0,        // Total cart value
  isLoading: false,     // Loading state
  error: null           // Error messages
}
```

### Methods
#### API Methods (require authentication)
- `addToCart(productData)` - Add to cart via API
- `getCartItems()` - Fetch cart from server
- `updateCartItem(id, quantity)` - Update via API
- `removeFromCart(id)` - Remove via API

#### Local Methods (offline usage)
- `addToCartLocal(product, quantity)` - Add locally
- `updateQuantityLocal(id, quantity)` - Update locally
- `removeFromCartLocal(id)` - Remove locally
- `clearCart()` - Clear entire cart

### Example
```javascript
const { cartItems, addToCartLocal, totalPrice } = useCartStore();

const handleAddToCart = (product) => {
  addToCartLocal(product, 1);
};
```

## 📦 Order Store (`orderStore.js`)

### API Endpoints
- `POST /api/orders/` - Place order (customer)
- `GET /api/orders/` - Get user's orders (customer)
- `GET /api/orders/admin` - Get all orders (admin)
- `PUT /api/orders/:id` - Update order status (admin)

### State
```javascript
{
  orders: [],           // User's orders
  currentOrder: null,   // Selected order
  adminOrders: [],      // All orders (admin)
  isLoading: false,     // Loading state
  error: null,          // Error messages
  orderStats: {         // Order statistics
    total: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0
  }
}
```

### Methods
- `placeOrder(orderData)` - Create new order
- `getUserOrders()` - Get user's orders
- `getAdminOrders(filters)` - Get all orders (admin)
- `updateOrderStatus(id, status, notes)` - Update status (admin)
- `getOrderById(id)` - Get single order
- `cancelOrder(id, reason)` - Cancel order
- `clearCurrentOrder()` - Clear current order

## 🛠️ Utilities (`storeUtils`)

```javascript
import { storeUtils } from '../store';

// Check if user is admin
if (storeUtils.isAdmin()) {
  // Admin only features
}

// Check authentication
if (storeUtils.isAuthenticated()) {
  // Authenticated user features
}

// Get cart totals
const total = storeUtils.getCartTotal();
const count = storeUtils.getCartCount();

// Clear all stores (logout)
storeUtils.clearAllStores();
```

## 🔄 Data Persistence

### Automatic Persistence
- **Auth Store**: User data, token, and auth status
- **Cart Store**: Cart items and totals

### Manual Sync
- Call API methods to sync with server
- Local methods work offline and persist locally

## 📱 Usage Patterns

### 1. Component Initialization
```javascript
useEffect(() => {
  // Load data on component mount
  if (storeUtils.isAuthenticated()) {
    getCartItems();
    getUserOrders();
  }
  getAllProducts();
}, []);
```

### 2. Error Handling
```javascript
const { error, clearError } = useAuthStore();

useEffect(() => {
  if (error) {
    // Show error to user
    setTimeout(clearError, 5000); // Auto-clear after 5s
  }
}, [error, clearError]);
```

### 3. Loading States
```javascript
const { isLoading } = useProductStore();

if (isLoading) {
  return <LoadingSpinner />;
}
```

### 4. Admin Guards
```javascript
if (!storeUtils.isAdmin()) {
  return <AccessDenied />;
}
```

## 🔧 Configuration

### Backend URL
Update the `API_BASE_URL` in each store file:
```javascript
const API_BASE_URL = 'http://localhost:5000/api/auth'; // Update this
```

### Token Management
Tokens are automatically included in API requests via `getAuthHeaders()` method.

## 📝 Best Practices

1. **Use appropriate methods**: Local methods for immediate UI updates, API methods for server sync
2. **Handle errors**: Always check return values and handle errors gracefully
3. **Loading states**: Show loading indicators during async operations
4. **Authentication**: Check auth status before making authenticated requests
5. **Persistence**: Critical data is automatically persisted and restored

## 🧪 Testing

See `src/examples/storeUsageExamples.js` for complete usage examples of all stores.

## 🚨 Important Notes

- All stores are ready to use with your backend API
- Token authentication is handled automatically
- Cart persists locally and syncs with server when authenticated
- Admin features require proper user role checking
- Error handling is built-in but should be handled in UI components
