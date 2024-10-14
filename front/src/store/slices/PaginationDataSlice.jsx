import { createSlice } from "@reduxjs/toolkit";

const pagination_Slice = createSlice({
  name: "pagination_Slice",
  initialState: {
    dataToDisplay: null,
    currentPageNo: 1,
    totalPages: null,
  },
  reducers: {
    setPaginationDetails: (state, action) => {
      state.dataToDisplay = action.payload.dataToDisplay;
      state.currentPageNo = action.payload.currentPageNo;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const paginationSliceActions = pagination_Slice.actions;

const paginationSliceReducers = pagination_Slice.reducer;
export default paginationSliceReducers;
