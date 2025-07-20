// src/store/productStore.js
import { create } from 'zustand';

const API_BASE_URL = 'http://localhost:5000/api/products';

const useProductStore = create((set) => ({
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,

  getAllProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/all`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch products');
      set({ products: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  getProductById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/all/${id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch product');
      set({ currentProduct: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  clearCurrentProduct: () => set({ currentProduct: null }),
}));

export default useProductStore;
