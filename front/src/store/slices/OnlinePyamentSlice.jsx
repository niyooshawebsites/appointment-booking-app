import { createSlice } from "@reduxjs/toolkit";

const onlinePaymentSlice = createSlice({
  name: "online_Payment_Slice",
  initialState: {
    payOnline: false,
  },
  reducers: {
    changeOnlinePaymentStatus: (state, action) => {
      state.payOnline = action.payload.payOnline;
    },
  },
});

export const onlinePaymentSliceActions = onlinePaymentSlice.actions;

const onlinePaymentSliceReducers = onlinePaymentSlice.reducer;
export default onlinePaymentSliceReducers;
