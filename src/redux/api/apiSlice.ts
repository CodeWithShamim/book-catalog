import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    // baseUrl: "https://book-catalog-backend-live.vercel.app/api/v1",
  }),
  tagTypes: ["books", "comments"],
  endpoints: () => ({}),
});
