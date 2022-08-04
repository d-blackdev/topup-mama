import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../lib/types";

interface loginState {
  user?: IUser | null;
  token?: string | null;
  minuteTime: number;
  secondTime: number;
  userId: number | null;
}
const initialState: loginState = {
  user: null,
  token: null,
  minuteTime: 10,
  secondTime: 0,
  userId: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (
      state: loginState,
      { payload }: PayloadAction<{ token: string }>
    ) => {
      state.token = payload.token;
    },
    logoutUser: (state: loginState) => {
      state.token = null;
      state.user = null;
      state.minuteTime = 10;
      state.secondTime = 0;
      state.userId = null;
    },
    changeMinute: (state: loginState, { payload }: PayloadAction<number>) => {
      state.minuteTime = payload;
    },
    changeSecond: (state: loginState, { payload }: PayloadAction<number>) => {
      state.secondTime = payload;
    },
    saveUserId: (state: loginState, { payload }: PayloadAction<number>) => {
      state.userId = payload;
    },
    saveUser: (state: loginState, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
    clearUser: (state: loginState) => {
      state.user = null;
    },
  },
});

export const {
  loginUser,
  logoutUser,
  changeMinute,
  changeSecond,
  saveUserId,
  saveUser,
  clearUser,
} = loginSlice.actions;

export default loginSlice.reducer;
