import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user_Slice",
  initialState: {
    username: null,
    authenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
    },
    authentication: (state, action) => {
      state.authenticated = action.payload.authenticated;
    },
  },
});

export const userSliceActions = userSlice.actions;

const userSliceReducers = userSlice.reducer;
export default userSliceReducers;
