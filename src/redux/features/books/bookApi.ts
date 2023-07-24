/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBook, IReviews } from "../../../types";
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (queryData?: any) => ({
        url: `/book/?${queryData}`,
        method: "GET",
      }),
      providesTags: ["books"],
    }),

    singleBook: builder.query({
      query: (id: string) => `/book/${id}`,
      providesTags: ["comments"],
    }),

    createBook: builder.mutation({
      query: (data: IBook) => ({
        url: "/book/create-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),

    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),

    addComment: builder.mutation({
      query: ({ id, data }: { id: string; data: IReviews }) => ({
        url: `/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useAddCommentMutation,
} = bookApi;
