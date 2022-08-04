import {
  DELETE,
  GET,
  IUpdateUserRequest,
  IUpdateUserResponse,
  IUserResponse,
  PUT,
} from "../lib/types";
import { globalApi } from "./globalApi";

const userAPI = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUsers: builder.mutation<IUserResponse, { page: number }>({
      query: ({ page }) => ({
        url: `users?page=${page}`,
        method: GET,
      }),
    }),
    updateUser: builder.mutation<IUpdateUserResponse, IUpdateUserRequest>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: PUT,
        body: { name: body.name, job: body.job },
      }),
    }),
    deleteUser: builder.mutation<null, { id?: number }>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: DELETE,
      }),
    }),
  }),
});

export const {
  useGetUsersMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userAPI;
