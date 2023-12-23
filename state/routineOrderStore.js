import { create } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRoutineOrderStore = create(
  persist(
    (set, get) => ({
      routineOrder: [],

      loadRoutineOrder: async () => {
        try {
          const storedRoutineOrder = await AsyncStorage.getItem("routineOrder");
          if (storedRoutineOrder !== null) {
            set({ routineOrder: JSON.parse(storedRoutineOrder) });
          }
        } catch (error) {
          console.error("Error loading routine order:", error);
        }
      },

      setRoutineOrder: async (order) => {
        try {
          set({ routineOrder: order });
          await AsyncStorage.setItem("routineOrder", JSON.stringify(order));
        } catch (error) {
          console.error("Error saving routine order:", error);
        }
      },
    }),
    {
      name: "routineOrderStore",
      storage: AsyncStorage,
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    }
  )
);

export default useRoutineOrderStore;
