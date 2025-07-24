import { create } from "zustand";

const useAdminlogin = create((set) => ({
  token: localStorage.getItem("adminToken") || null,
  isAdmin: !!localStorage.getItem("adminToken"),

  loginAdmin: (token) => {
    localStorage.setItem("adminToken", token);
    set({ token, isAdmin: true });
  },

  logoutAdmin: () => {
    localStorage.removeItem("adminToken");
    set({ token: null, isAdmin: false });
  },
}));

export default useAdminlogin;
