import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../../types";

type wishlistState = {
  books: IBook[];
};
const initialState: wishlistState = {
  books: [],
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, action: PayloadAction<IBook>) => {
      const isExist = state.books.filter(
        (book) => book._id === action.payload._id
      );

      if (!isExist.length) {
        state.books.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.books));
      }
    },

    addLocalWishlist: (state, action: PayloadAction<IBook[]>) => {
      state.books = action.payload;
    },
  },
});

export const { addWishlist, addLocalWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
