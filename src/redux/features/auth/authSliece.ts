import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TInfUser = {
  id: string;
  role: string;
  email: string;

  iat: number;
  exp: number;
};
type TAuthState = {
  user: null | TInfUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const CurrentToken = (state: RootState) => state.auth.token;
export const CurrentUser = (state: RootState) => state.auth.user;
