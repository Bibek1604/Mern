// src/store/cartStore.js
import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product) =>
    set((state) => {
      const exists = state.cartItems.find(
        (item) => item.id === (product.id || product._id)
      );
      if (exists) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === (product.id || product._id)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          cartItems: [
            ...state.cartItems,
            { ...product, id: product.id || product._id, quantity: 1 },
          ],
        };
      }
    }),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
      ),
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),

  // New derived property: total quantity count of all cart items
  cartCount: () => {
    const items = get().cartItems;
    return items.reduce((total, item) => total + (item.quantity || 0), 0);
  },
}));

export default useCartStore;
