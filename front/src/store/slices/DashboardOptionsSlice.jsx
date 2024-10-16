import { createSlice } from "@reduxjs/toolkit";

const dashboardOptionsSlice = createSlice({
  name: "dashboard_Options_Slice",
  initialState: {
    showHighlights: true,
    showInfo: false,
    showServices: false,
    showProfile: false,
    showAbout: false,
    showContact: false,
    showAppointmentDetails: false,
    showBookAppointment: false,
    loginBooking: false,
    showLetterHead: false,
  },

  reducers: {
    toggleDashboardOptions: (state, action) => {
      state.showHighlights = action.payload.showHighlights;
      state.showInfo = action.payload.showInfo;
      state.showServices = action.payload.showServices;
      state.showProfile = action.payload.showProfile;
      state.showAbout = action.payload.showAbout;
      state.showContact = action.payload.showContact;
      state.showAppointmentDetails = action.payload.showAppointmentDetails;
      state.showBookAppointment = action.payload.showBookAppointment;
      state.loginBooking = action.payload.loginBooking;
      state.showLetterHead = action.payload.showLetterHead;
    },
  },
});

export const dashboardOptionsSliceActions = dashboardOptionsSlice.actions;

const dashboardOptionsSliceReducers = dashboardOptionsSlice.reducer;
export default dashboardOptionsSliceReducers;
