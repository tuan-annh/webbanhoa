import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: [],
  content: [],
  footer: [],
};

export const JsonDataSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    HeaderData: (state, action) => {
      state.header = action.payload;
    },
    ContentData: (state, action) => {
      state.content = action.payload;
    },
    FooterData: (state, action) => {
      state.footer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function

export const { HeaderData, ContentData, FooterData } = JsonDataSlice.actions;

export default JsonDataSlice;
