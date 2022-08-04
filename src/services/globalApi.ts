import {
  createApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { showToast } from "../component/toast/Toast";
import { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://reqres.in/api/",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).login.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    //Using interceptor display error

    showToast({ type: "error", message: "Error" });
  }
  return result;
};

export const globalApi = createApi({
  reducerPath: "globalQuery",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
