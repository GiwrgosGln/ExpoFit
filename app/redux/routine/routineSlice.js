import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exercises: [],
};

const routineSlice = createSlice({
  name: "routine",
  initialState,
  reducers: {
    addExercise(state, action) {
      const exerciseExists = state.exercises.some(
        (exercise) => exercise.id === action.payload.id
      );
      if (!exerciseExists) {
        state.exercises.push(action.payload);
      }
    },
    reorderExercises(state, action) {
      state.exercises = action.payload;
    },
    resetExercises(state) {
      state.exercises = [];
    },
  },
});

export const { addExercise, reorderExercises, resetExercises } =
  routineSlice.actions;

export default routineSlice.reducer;
