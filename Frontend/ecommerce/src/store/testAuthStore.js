import { create } from "zustand";

const useTestStore = create((set) => ({
  loginAdmin: (token) => set(() => ({ token })),
}));

export default useTestStore;
