import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AuthState {
  username?: string;
}

const initialState: AuthState = {
  username: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username?: string }>) => {
      localStorage.setItem(
        "user",
        JSON.stringify({ username: action.payload.username })
      );
      state.username = action.payload.username;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
