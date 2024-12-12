import { baseApi } from "./api/baseApi";

const lesonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLesson: builder.mutation({
      query: (data) => ({
        url: "/lessons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["lessons"],
    }),
    // get all
    getAllLesson: builder.query({
      query: (args) => ({
        url: "/lessons",
        method: "GET",
        params: args,
      }),
      providesTags: ["lessons"],
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lessons"],
    }),
    updateLesson: builder.mutation({
      query: (options) => ({
        url: `/lessons/${options.id}`,
        method: "PATCH",
        body: options.data,
      }),
      invalidatesTags: ["lessons"],
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useGetAllLessonQuery,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lesonApi;
