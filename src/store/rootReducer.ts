import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "../pages/login/loginSlice";
import { authApi } from "../services/authApi";
import { globalApi } from "../services/globalApi";

export const rootReducer = combineReducers({
  [globalApi.reducerPath]: globalApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  login: loginSlice,
  //   login: loginReducer,
  //   profile: profileSlice,
  //   cart: cartSlice,
});
