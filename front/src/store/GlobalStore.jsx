import { configureStore } from "@reduxjs/toolkit";
import userSliceReducers from "./slices/UserSlice";

const GlobalStore = configureStore({
  reducer: {
    user_Slice: userSliceReducers,
  },
});

export default GlobalStore;
