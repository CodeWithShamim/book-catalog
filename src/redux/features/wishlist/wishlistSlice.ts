import { createSlice } from "@reduxjs/toolkit";

type wishlistState = {
  books: [];
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
