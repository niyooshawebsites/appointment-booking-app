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
import changeApponitmentStatusSliceReducers from "./slices/ChangeAppointmentStatusSlice";
import resetFuncAdminDashboardSliceReducers from "./slices/ResetFuncAdminDashboardSlice";
import contentToDisplaySliceReducers from "./slices/ContentToDisplaySlice";

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
    change_Appointment_Status_Slice: changeApponitmentStatusSliceReducers,
    reset_Func_Admin_Dashboard_Slice: resetFuncAdminDashboardSliceReducers,
    content_To_Display_Slice: contentToDisplaySliceReducers,
  },
});

export default GlobalStore;
