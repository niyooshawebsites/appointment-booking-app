import { configureStore } from "@reduxjs/toolkit";
import userSliceReducers from "./slices/UserSlice";
import serviceProviderSliceReducers from "./slices/ServiceProviderSlice";

const GlobalStore = configureStore({
  reducer: {
    user_Slice: userSliceReducers,
    service_Provider_Slice: serviceProviderSliceReducers,
  },
});

export default GlobalStore;
