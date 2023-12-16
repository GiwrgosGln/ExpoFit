import { create } from "zustand";

const useAuthStore = create((set) => ({
  email: "",
  uid: "",
  username: "",
  setUser: (email, uid) => set({ email, uid }),
  resetUser: () => set({ email: "", uid: "" }),
  saveUsername: (username) => set({ username }),
}));

export default useAuthStore;
