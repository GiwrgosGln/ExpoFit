import { createSlice } from "@reduxjs/toolkit";

const routineSlice = createSlice({
  name: "routine",
  initialState: { exercises: [] },
  reducers: {
    addExercise: (state, action) => {
      const exerciseExists = state.exercises.some(
        (exercise) => exercise.id === action.payload.id
      );
      if (!exerciseExists) {
        state.exercises.push(action.payload);
      }
    },
  },
});

export const { addExercise } = routineSlice.actions;

export default routineSlice.reducer;
