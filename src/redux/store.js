import { configureStore } from "@reduxjs/toolkit";
import AccountSlice from "./AccountSlice";
import JsonDataSlice from "./JsonDataSlice";
import CartSlice from "./CartSlice";

export const store = configureStore({
  reducer: {
    account: AccountSlice.reducer,
    json: JsonDataSlice.reducer,
    cart: CartSlice.reducer,
  },
});
