import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
  role: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;

  localStorage.setItem("user", JSON.stringify(action.payload.user));
  localStorage.setItem("token", action.payload.token);
},
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;