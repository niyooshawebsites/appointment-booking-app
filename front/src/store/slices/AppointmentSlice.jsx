import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointment_Slice",
  initialState: {
    appointmentID: "",
    invoiceID: "",
    patientID: "",
    fee: "",
    username: "",
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
    appointmentStatus: "",
  },
  reducers: {
    appointmentDetails: (state, action) => {
      state.appointmentID = action.payload.appointmentID;
      state.invoiceID = action.payload.invoiceID;
      state.patientID = action.payload.patientID;
      state.fee = action.payload.fee;
      state.username = action.payload.username;
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
      state.appointmentStatus = action.payload.appointmentStatus;
    },
  },
});

const appointmentSliceReducers = appointmentSlice.reducer;
export const appointmentSliceActions = appointmentSlice.actions;

export default appointmentSliceReducers;
