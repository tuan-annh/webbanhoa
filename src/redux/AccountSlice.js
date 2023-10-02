import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      if (window.confirm("Bạn có muốn đăng xuất khỏi tài khoản này không ?")) {
        state.isAuthenticated = false;
        localStorage.removeItem("user");
        toast.success("Tài khoản đã được đăng xuất");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { Login, Logout } = AccountSlice.actions;

export default AccountSlice;
