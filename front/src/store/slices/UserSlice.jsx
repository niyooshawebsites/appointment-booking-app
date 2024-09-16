import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user_Slice",
  initialState: {
    email: "",
    authenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
    },
    authentication: (state, action) => {
      state.authenticated = action.payload.authenticated;
    },
  },
});

export const userSliceActions = userSlice.actions;
const userSliceReducers = userSlice.reducer;
export default userSliceReducers;
