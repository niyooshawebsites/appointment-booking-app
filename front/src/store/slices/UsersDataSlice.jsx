import { createSlice } from "@reduxjs/toolkit";

const usersDataSlice = createSlice({
  name: "users_Data_Slice",
  initialState: {
    allUsers: [],
  },

  reducers: {
    getUsersData: (state, action) => {
      state.allUsers = action.payload.allUsers;
    },
  },
});

export const usersDataSliceActions = usersDataSlice.actions;

const usersDataSliceReducers = usersDataSlice.reducer;
export default usersDataSliceReducers;
