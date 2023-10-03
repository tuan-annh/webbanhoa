import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = [];

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      if (state) {
        const findCheck = state.find(
          (item) => item.data.id === action.payload.data.id
        );
        if (findCheck) {
          findCheck.count += action.payload.count;
          toast.success("Thêm giỏ hàng thành công");
          return;
        }
        state.push(action.payload);
        toast.success("Thêm giỏ hàng thành công");
      }
    },
    editCart: (state, action) => {
      const findCheck = state.find(
        (item) => item.data.id === action.payload.id
      );
      findCheck.count += action.payload.quantity;
    },
    removeCart: (state, action) => {
      state.splice(action.payload, 1);
    },
    removeCartById: (state, action) => {
      return [...state].filter((item) => item.data.id !== action.payload);
    },
    checkedCart: (state, action) => {
      state[action.payload].checked = !state[action.payload].checked;
    },
    checkedAll: (state) => {
      const allChecked = state.every((item) => item.checked);
      state.forEach((item) => {
        item.checked = !allChecked;
      });
    },
    paymentCart: (state) => {
      return [...state].filter((item) => !item.checked);
    },
    countCart: (state, action) => {
      state[action.payload.index].count = action.payload.numbercount;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCart,
  editCart,
  removeCart,
  checkedCart,
  checkedAll,
  removeCartById,
  paymentCart,
  countCart,
} = CartSlice.actions;

export default CartSlice;
