import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user_Slice",
  initialState: {
    username: "",
    email: "",
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

const userSliceReducers = userSlice.reducer;
export const userSliceActions = userSlice.actions;

export default userSliceReducers;
