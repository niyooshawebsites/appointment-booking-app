import { createSlice } from "@reduxjs/toolkit";

const appointmentsDataSlice = createSlice({
  name: "appointments_Data_Slice",
  initialState: {
    allAppointments: [],
  },

  reducers: {
    getAppointmentsData: (state, action) => {
      state.allAppointments = action.payload.allAppointments;
    },
  },
});

export const appointmentsDataSliceActions = appointmentsDataSlice.actions;
const appointmentsDataSliceReducers = appointmentsDataSlice.reducer;

export default appointmentsDataSliceReducers;
