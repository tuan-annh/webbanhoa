import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    Login: (state) => {
      state.isAuthenticated = true;
    },
    Logout: (state) => {
      state.isAuthenticated = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { Login, Logout } = AccountSlice.actions;

export default AccountSlice;
