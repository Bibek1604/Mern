import { create } from 'zustand';

// Zustand Store for Orders
export const useOrderStore = create((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  // GET ALL ORDERS FOR ADMIN PANEL
  getAllOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:5000/api/orders/admin', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch orders');
      }

      set({ orders: data, isLoading: false });
      return { success: true, data };
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return { success: false, error: error.message };
    }
  },

  // UPDATE ORDER STATUS
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update order');
      }

      // Update local state
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        ),
      }));

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
}));

export default useOrderStore;
