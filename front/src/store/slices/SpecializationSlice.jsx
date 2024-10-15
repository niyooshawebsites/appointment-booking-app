import { createSlice } from "@reduxjs/toolkit";

const specializationSlice = createSlice({
  name: "specialization_Slice",
  initialState: {
    specialization: "Cardiologist",
    usersBySpecialization: [],
  },
  reducers: {
    changeSpecialization: (state, action) => {
      state.Cardiologist = action.payload.Cardiologist;
      state.usersBySpecialization = action.payload.usersBySpecialization;
    },
  },
});

export const specializationSliceActions = specializationSlice.actions;

const specializationSliceReducers = specializationSlice.reducer;
export default specializationSliceReducers;
