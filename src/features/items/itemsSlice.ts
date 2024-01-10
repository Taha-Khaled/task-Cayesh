import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface items {
  items?: {
    id: number;
    category: string;
    nominees: {
      id: number;
      name: string;
      image: string;
    }[];
  }[];
}
const initialState: items = {};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<{ items?: items["items"] }>) => {
      state.items = action.payload.items;
    },
  },
});

export const selectAuth = (state: RootState) => state.items;

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
