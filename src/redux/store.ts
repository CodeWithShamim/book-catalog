import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import userReducer from "./features/user/userSlice";
import { api } from "./api/apiSlice";
import bookReducer from "./features/books/bookSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    wishlist: wishlistReducer,
    book: bookReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
