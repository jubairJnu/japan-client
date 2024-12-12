import { baseApi } from "./api/baseApi";

const vocabApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVocab: builder.mutation({
      query: (data) => ({
        url: "/vocabs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["vocabs"],
    }),
    // get all
    getAllVocabs: builder.query({
      query: (args) => ({
        url: "/vocabs",
        method: "GET",
        params: args,
      }),
      providesTags: ["vocabs"],
    }),
    deleteVocabs: builder.mutation({
      query: (id) => ({
        url: `/vocabs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vocabs"],
    }),
    updateVocab: builder.mutation({
      query: (options) => ({
        url: `/vocabs/${options.id}`,
        method: "PATCH",
        body: options.data,
      }),
      invalidatesTags: ["vocabs"],
    }),
  }),
});

export const {
  useCreateVocabMutation,
  useGetAllVocabsQuery,
  useUpdateVocabMutation,
  useDeleteVocabsMutation,
} = vocabApi;
