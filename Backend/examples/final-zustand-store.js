import { create } from 'zustand';

const API_BASE_URL = 'http://localhost:5000/api/products';

const useProductStore = create((set, get) => ({
  // State
  products: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  totalProducts: 0,
  currentPage: 1,
  hasMore: true,

  // Helper function to get image URL
  getImageUrl: (imagePath) => {
    if (!imagePath) return '/placeholder.jpg';
    
    // If it's already a full URL or base64, use it directly
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    
    // Build URL for files in uploads folder
    return `http://localhost:5000/uploads/${imagePath}`;
  },

  // Actions
  
  // Get all products
  getAllProducts: async (page = 1, limit = 10, filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      });

      const response = await fetch(`${API_BASE_URL}/all?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch products');
      }

      // Ensure data is an array
      const productsArray = Array.isArray(data) ? data : [];

      set((state) => ({
        products: page === 1 ? productsArray : [...state.products, ...productsArray],
        totalProducts: productsArray.length + (page > 1 ? state.totalProducts : 0),
        currentPage: page,
        hasMore: productsArray.length === limit,
        isLoading: false,
        error: null,
      }));

      return { success: true, data: productsArray };
    } catch (error) {
      console.error('Error fetching products:', error);
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Get single product
  getProductById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/all/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch product');
      }

      set({
        currentProduct: data,
        isLoading: false,
        error: null,
      });

      return { success: true, data };
    } catch (error) {
      console.error('Error fetching product:', error);
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Create product
  createProduct: async (productData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create product');
      }

      set((state) => ({
        products: [data, ...state.products],
        totalProducts: state.totalProducts + 1,
        isLoading: false,
        error: null,
      }));

      return { success: true, data };
    } catch (error) {
      console.error('Error creating product:', error);
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update product');
      }

      // Use optimistic update with the data we sent
      const updatedProduct = { ...productData, id };

      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        ),
        currentProduct: state.currentProduct?.id === id 
          ? { ...state.currentProduct, ...updatedProduct } 
          : state.currentProduct,
        isLoading: false,
        error: null,
      }));

      return { success: true, data: updatedProduct };
    } catch (error) {
      console.error('Error updating product:', error);
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete product');
      }

      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        totalProducts: state.totalProducts - 1,
        currentProduct: state.currentProduct?.id === id ? null : state.currentProduct,
        isLoading: false,
        error: null,
      }));

      return { success: true, data };
    } catch (error) {
      console.error('Error deleting product:', error);
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Search products
  searchProducts: async (searchTerm) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/all?search=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to search products');
      }

      const productsArray = Array.isArray(data) ? data : [];

      set({
        products: productsArray,
        totalProducts: productsArray.length,
        currentPage: 1,
        hasMore: false,
        isLoading: false,
        error: null,
      });

      return { success: true, data: productsArray };
    } catch (error) {
      console.error('Error searching products:', error);
      set({
        error: error.message,
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  // Clear current product
  clearCurrentProduct: () => {
    set({ currentProduct: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset products (useful for filters)
  resetProducts: () => {
    set({
      products: [],
      currentPage: 1,
      hasMore: true,
      totalProducts: 0,
      error: null,
    });
  },

  // Set loading state
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
}));

export default useProductStore;
