import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user_Slice",
  initialState: {
    username: null,
    authenticated: false,
    role: null,
    isAdmin: false,
    userId: null,
    email: null,
  },
  reducers: {
    captureLoginUserDetails: (state, action) => {
      state.username = action.payload.username;
      state.authenticated = action.payload.authenticated;
      state.role = action.payload.role;
      state.isAdmin = action.payload.isAdmin;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    },
  },
});

export const userSliceActions = userSlice.actions;

const userSliceReducers = userSlice.reducer;
export default userSliceReducers;
