import { createSlice } from "@reduxjs/toolkit";

const announcementSlice = createSlice({
  name: "announcement_Slice",
  initialState: {
    showAnnouncementModal: false,
  },

  reducers: {
    changeAnnouncementStatus: (state, action) => {
      state.showAnnouncementModal = action.payload.showAnnouncementModal;
    },
  },
});

export const announcementSliceActions = announcementSlice.actions;

const announcementSliceReducers = announcementSlice.reducer;
export default announcementSliceReducers;
