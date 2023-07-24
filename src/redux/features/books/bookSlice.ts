import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types";

interface IBookState {
  book: IBook[] | [];
  isLoading: boolean;
}
const initialState: IBookState = {
  book: [],
  isLoading: false,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<IBook[]>) => {
      state.book = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { addBook, setLoading } = bookSlice.actions;
export default bookSlice.reducer;
