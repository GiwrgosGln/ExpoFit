import { create } from "zustand";

const useExercisesStore = create((set) => ({
  exercises: [],
  selectedExercises: [],
  sets: [],
  addExercise: (exercise) =>
    set((state) => ({ exercises: [...state.exercises, exercise] })),
  removeExercise: (exercise) =>
    set((state) => ({
      exercises: state.exercises.filter((e) => e !== exercise),
    })),
  clearExercises: () => set({ exercises: [] }),
  addSelectedExercise: (exercise) =>
    set((state) => ({
      selectedExercises: [...state.selectedExercises, exercise],
    })),
  removeSelectedExercise: (exerciseIndex) =>
    set((state) => ({
      selectedExercises: state.selectedExercises.filter(
        (e, index) => index !== exerciseIndex
      ),
    })),
  clearSelectedExercises: () => set({ selectedExercises: [] }),
  addSet: (newSet) =>
    set((state) => ({
      sets: [...state.sets, newSet],
    })),
  setSets: (newSets) =>
    set(() => ({
      sets: newSets,
    })),
}));

export default useExercisesStore;
