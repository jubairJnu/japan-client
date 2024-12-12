import { baseApi } from "./api/baseApi";

const lesonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    // get all
    getAllUser: builder.query({
      query: (args) => ({
        url: "/users",
        method: "GET",
        params: args,
      }),
      providesTags: ["users"],
    }),

    updateUser: builder.mutation({
      query: (options) => ({
        url: `/users/${options.id}`,
        method: "PATCH",
        body: options.data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} = lesonApi;
