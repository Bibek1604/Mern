// Central store exports for easy importing
export { default as useAuthStore } from './authStore';
export { default as useProductStore } from './productStore';
export { default as useCartStore } from './cartStore';
export { default as useOrderStore } from './orderStore';

// Import stores for internal use
import useAuthStore from './authStore';
import useProductStore from './productStore';
import useCartStore from './cartStore';
import useOrderStore from './orderStore';

// Combined store hook for components that need multiple stores
export const useStores = () => ({
  auth: useAuthStore(),
  products: useProductStore(),
  cart: useCartStore(),
  orders: useOrderStore(),
});

// Utility functions for common operations
export const storeUtils = {
  // Check if user is admin
  isAdmin: () => {
    const { user } = useAuthStore.getState();
    return user?.role === 'admin' || user?.isAdmin;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const { isAuthenticated } = useAuthStore.getState();
    return isAuthenticated;
  },

  // Get total cart value
  getCartTotal: () => {
    const { totalPrice } = useCartStore.getState();
    return totalPrice;
  },

  // Get cart items count
  getCartCount: () => {
    const { totalItems } = useCartStore.getState();
    return totalItems;
  },

  // Clear all stores (useful for logout)
  clearAllStores: () => {
    useAuthStore.getState().logout();
    useCartStore.getState().clearCart();
    useOrderStore.getState().resetOrders();
    useProductStore.getState().resetProducts();
  },
};
