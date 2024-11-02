import { configureStore } from "@reduxjs/toolkit";
import userSliceReducers from "./slices/UserSlice";
import serviceProviderSliceReducers from "./slices/ServiceProviderSlice";
import appointmentSliceReducers from "./slices/AppointmentSlice";
import dashboardOptionsSliceReducers from "./slices/DashboardOptionsSlice";
import usersDataSliceReducers from "./slices/UsersDataSlice";
import appointmentsDataSliceReducers from "./slices/AppintmentsDataSlice";
import paginationSliceReducers from "./slices/PaginationDataSlice";
import specializationSliceReducers from "./slices/SpecializationSlice";
import announcementSliceReducers from "./slices/AnnouncementSlice";
import walkinSliceReducers from "./slices/WalkinSlice";
import onlinePaymentSliceReducers from "./slices/OnlinePyamentSlice";
import changeApponitmentStatusSliceReducers from "./slices/ChangeAppointmentStatusSlice";

const GlobalStore = configureStore({
  reducer: {
    user_Slice: userSliceReducers,
    service_Provider_Slice: serviceProviderSliceReducers,
    appointment_Slice: appointmentSliceReducers,
    dashboard_Options_Slice: dashboardOptionsSliceReducers,
    users_Data_Slice: usersDataSliceReducers,
    appointments_Data_Slice: appointmentsDataSliceReducers,
    pagination_Slice: paginationSliceReducers,
    specialization_Slice: specializationSliceReducers,
    announcement_Slice: announcementSliceReducers,
    walkin_Slice: walkinSliceReducers,
    online_Payment_Slice: onlinePaymentSliceReducers,
    change_Appointment_Status_Slice: changeApponitmentStatusSliceReducers,
  },
});

export default GlobalStore;
