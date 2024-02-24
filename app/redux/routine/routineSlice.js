import { createSlice } from "@reduxjs/toolkit";

const routineSlice = createSlice({
  name: "routine",
  initialState: {
    exercises: [],
  },
  reducers: {
    addExercise: (state, action) => {
      const { exercise } = action.payload;
      const isDuplicate = state.exercises.some((ex) => ex.id === exercise.id);
      if (!isDuplicate) {
        state.exercises.push(exercise);
      }
    },
  },
});

export const { addExercise } = routineSlice.actions;

export default routineSlice.reducer;
