import { createSlice } from "@reduxjs/toolkit";

const resetFuncAdminDashboardSlice = createSlice({
  name: "reset_Func_Admin_Dashboard_Slice",
  initialState: {
    dataType: "",
    dataSource: "",
  },

  reducers: {
    dataProvider: (state, action) => {
      state.dataType = action.payload.dataType;
      state.dataSource = action.payload.dataSource;
    },
  },
});

export const resetFuncAdminDashboardSliceActions =
  resetFuncAdminDashboardSlice.actions;

const resetFuncAdminDashboardSliceReducers =
  resetFuncAdminDashboardSlice.reducer;

export default resetFuncAdminDashboardSliceReducers;
