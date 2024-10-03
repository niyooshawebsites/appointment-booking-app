import { createSlice } from "@reduxjs/toolkit";

const dashboardOptionsSlice = createSlice({
  name: "dashboard_Options_Slice",
  initialState: {
    showHighlights: true,
    showAllUsers: false,
    showAppointments: false,
    showServices: false,
    showProfile: false,
    showAbout: false,
    showContact: false,
    showAppointmentDetails: false,
  },

  reducers: {
    toggleDashboardOptions: (state, action) => {
      state.showHighlights = action.payload.showHighlights;
      state.showAllUsers = action.payload.showAllUsers;
      state.showAppointments = action.payload.showAppointments;
      state.showServices = action.payload.showServices;
      state.showProfile = action.payload.showProfile;
      state.showAbout = action.payload.showAbout;
      state.showContact = action.payload.showContact;
      state.showAppointmentDetails = action.payload.showAppointmentDetails;
    },
  },
});

export const dashboardOptionsSliceActions = dashboardOptionsSlice.actions;

const dashboardOptionsSliceReducers = dashboardOptionsSlice.reducer;
export default dashboardOptionsSliceReducers;
