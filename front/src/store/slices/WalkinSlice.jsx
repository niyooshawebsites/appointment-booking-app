import { createSlice } from "@reduxjs/toolkit";

const walkinSlice = createSlice({
  name: "walkin_Slice",
  initialState: {
    showWalkinModal: false,
  },

  reducers: {
    changeWalkinStatus: (state, action) => {
      state.showWalkinModal = action.payload.showWalkinModal;
    },
  },
});

export const walkinSliceActions = walkinSlice.actions;

const walkinSliceReducers = walkinSlice.reducer;
export default walkinSliceReducers;
