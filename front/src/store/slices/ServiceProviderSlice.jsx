import { createSlice } from "@reduxjs/toolkit";

const serviceProviderSlice = createSlice({
  name: "service_Provider_Slice",
  initialState: {
    name: "",
    businessName: "",
    about: "",
    email: "",
    contactNo: "",
    services: [],
    contact: {},
  },
  reducers: {
    serviceProviderDetails: (state, action) => {
      state.about = action.payload.name;
      state.about = action.payload.businessName;
      state.about = action.payload.about;
      state.email = action.payload.email;
      state.contactNo = action.payload.contactNo;
      state.services = action.payload.services;
      state.contact = action.payload.contact;
    },
  },
});

export const serviceProviderSliceActons = serviceProviderSlice.actions;

const serviceProviderSliceReducers = serviceProviderSlice.reducer;
export default serviceProviderSliceReducers;
