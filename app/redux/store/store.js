import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../user/authSlice";
import routineReducer from "../routine/routineSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    routine: routineReducer,
  },
});
