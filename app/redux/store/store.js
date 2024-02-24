import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../user/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
