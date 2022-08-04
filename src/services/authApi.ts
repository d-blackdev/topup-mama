import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAuthRequest,
  ILoginResponse,
  IRegisterResponse,
  POST,
} from "../lib/types";

export const authApi = createApi({
  reducerPath: "authQuery",
  baseQuery: fetchBaseQuery({ baseUrl: "https://reqres.in/api/" }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    userLogin: builder.mutation<ILoginResponse, IAuthRequest>({
      query: (data) => ({
        url: "login",
        body: data,
        method: POST,
      }),
    }),
    userRegister: builder.mutation<IRegisterResponse, IAuthRequest>({
      query: (data) => ({
        url: "register",
        body: data,
        method: POST,
      }),
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation } = authApi;
