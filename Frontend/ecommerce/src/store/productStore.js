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
      const response = await fetch(`${API_BASE_URL}/${id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch product');
      set({ currentProduct: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  clearCurrentProduct: () => set({ currentProduct: null }),

  createProduct: async (product) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create product');
      set((state) => ({ products: [...state.products, data], isLoading: false }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateProduct: async (id, product) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update product');
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? data : p)),
        currentProduct: data,
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useProductStore;