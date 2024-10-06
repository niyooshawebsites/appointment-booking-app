import { configureStore } from "@reduxjs/toolkit";
import userSliceReducers from "./slices/UserSlice";
import serviceProviderSliceReducers from "./slices/ServiceProviderSlice";
import appointmentSliceReducers from "./slices/AppointmentSlice";
import dashboardOptionsSliceReducers from "./slices/DashboardOptionsSlice";
import usersDataSliceReducers from "./slices/UsersDataSlice";
import appointmentsDataSliceReducers from "./slices/AppintmentsDataSlice";

const GlobalStore = configureStore({
  reducer: {
    user_Slice: userSliceReducers,
    service_Provider_Slice: serviceProviderSliceReducers,
    appointment_Slice: appointmentSliceReducers,
    dashboard_Options_Slice: dashboardOptionsSliceReducers,
    users_Data_Slice: usersDataSliceReducers,
    appointments_Data_Slice: appointmentsDataSliceReducers,
  },
});

export default GlobalStore;
