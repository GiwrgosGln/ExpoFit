import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    uid: "",
    username: "",
    gender: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.username = action.payload.username;
      state.gender = action.payload.gender;
    },
    resetUser: (state) => {
      state.email = "";
      state.uid = "";
      state.username = "";
      state.gender = "";
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
