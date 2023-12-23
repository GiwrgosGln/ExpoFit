// setsStore.js
import { create } from "zustand";

const useSetsStore = create((store) => ({
  sets: [],
  addSet: (newSet) => store((state) => ({ sets: [...state.sets, newSet] })),
}));

export default useSetsStore;
