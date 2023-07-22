import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/book",
      providesTags: ["books"],
    }),
    singleBook: builder.query({
      query: (id: string) => `/book/${id}`,
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const { useGetBooksQuery, useSingleBookQuery, useDeleteBookMutation } =
  bookApi;
