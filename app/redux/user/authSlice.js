import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    uid: "",
    username: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.username = action.payload.username;
    },
    resetUser: (state) => {
      state.email = "";
      state.uid = "";
      state.username = "";
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
