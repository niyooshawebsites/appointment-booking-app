import { createSlice } from "@reduxjs/toolkit";

const changeApponitmentStatusSlice = createSlice({
  name: "change_Appointment_Status_Slice",
  initialState: {
    appointmentId: "",
    appointmentStatus: false,
  },

  reducers: {
    changeAppointmentStatus: (state, action) => {
      state.appointmentId = action.payload.appointmentId;
      state.appointmentStatus = action.payload.appointmentStatus;
    },
  },
});

export const changeApponitmentStatusSliceActions =
  changeApponitmentStatusSlice.actions;

const changeApponitmentStatusSliceReducers =
  changeApponitmentStatusSlice.reducer;

export default changeApponitmentStatusSliceReducers;
