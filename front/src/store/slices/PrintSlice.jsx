import { createSlice } from "@reduxjs/toolkit";

const printSlice = createSlice({
  name: "print_Slice",
  initialState: {
    refComponent: "",
  },
  reducers: {
    setRefComponent: (state, action) => {
      state.refComponent = action.payload.refComponent;
    },
  },
});

export const printSliceActions = printSlice.actions;

const printSliceReducers = printSlice.reducer;
export default printSliceReducers;
