import { createSlice } from "@reduxjs/toolkit";

const serviceProviderSlice = createSlice({
  name: "service_Provider_Slice",
  initialState: {
    name: "",
    businessName: "",
    isVerified: false,
    about: "",
    email: "",
    contactNo: "",
    services: [],
    contact: {},
    socialProfiles: {},
    announcement: "",
  },
  reducers: {
    serviceProviderDetails: (state, action) => {
      state.name = action.payload.name;
      state.businessName = action.payload.businessName;
      state.isVerified = action.payload.isVerified;
      state.about = action.payload.about;
      state.email = action.payload.email;
      state.contactNo = action.payload.contactNo;
      state.services = action.payload.services;
      state.contact = action.payload.contact;
      state.socialProfiles = action.payload.socialProfiles;
      state.announcement = action.payload.announcement;
    },
  },
});

export const serviceProviderSliceActons = serviceProviderSlice.actions;

const serviceProviderSliceReducers = serviceProviderSlice.reducer;
export default serviceProviderSliceReducers;
