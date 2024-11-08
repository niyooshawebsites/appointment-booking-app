import { createSlice } from "@reduxjs/toolkit";

const contentToDisplaySlice = createSlice({
  name: "content_To_Display_Slice",
  initialState: {
    contentType: "",
  },

  reducers: {
    changeContentType: (state, action) => {
      state.contentType = action.payload.contentType;
    },
  },
});

export const contentToDisplaySliceActions = contentToDisplaySlice.actions;

const contentToDisplaySliceReducers = contentToDisplaySlice.reducer;
export default contentToDisplaySliceReducers;
