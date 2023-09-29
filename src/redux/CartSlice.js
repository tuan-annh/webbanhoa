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
    editCart: () => {},
    removeCart: () => {},
  },
});

// Action creators are generated for each case reducer function
export const { addCart, editCart, removeCart } = CartSlice.actions;

export default CartSlice;
