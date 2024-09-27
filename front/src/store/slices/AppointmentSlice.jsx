import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointment_Slice",
  initialState: {
    service: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    age: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    paymentMethod: "",
  },
  reducers: {
    appointmentDetails: (state, action) => {
      state.service = action.payload.service;
      state.date = action.payload.date;
      state.time = action.payload.time;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.contactNo = action.payload.contactNo;
      state.age = action.payload.age;
      state.gender = action.payload.gender;
      state.address = action.payload.address;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.pinCode = action.payload.pinCode;
      state.paymentMethod = action.payload.paymentMethod;
    },
  },
});

const appointmentSliceReducers = appointmentSlice.reducer;
export const appointmentSliceActions = appointmentSlice.actions;

export default appointmentSliceReducers;
