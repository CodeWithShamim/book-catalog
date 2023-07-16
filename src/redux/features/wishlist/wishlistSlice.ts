import { createSlice } from "@reduxjs/toolkit";

type wishlistState = {
  books: string[];
};
const initialState: wishlistState = {
  books: [],
};
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
});

export default wishlistSlice.reducer;
