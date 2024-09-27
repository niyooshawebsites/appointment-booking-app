import { configureStore } from "@reduxjs/toolkit";
import userSliceReducers from "./slices/UserSlice";
import serviceProviderSliceReducers from "./slices/ServiceProviderSlice";
import appointmentSliceReducers from "./slices/AppointmentSlice";

const GlobalStore = configureStore({
  reducer: {
    user_Slice: userSliceReducers,
    service_Provider_Slice: serviceProviderSliceReducers,
    appointment_Slice: appointmentSliceReducers,
  },
});

export default GlobalStore;
