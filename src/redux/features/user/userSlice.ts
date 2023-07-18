import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";

interface IUserState {
  user: {
    email: string;
  };
  isLoading: boolean;
  isError: boolean;
  error: string;
}

interface ICredential {
  email: string;
  password: string;
}

const initialState: IUserState = {
  user: {
    email: "",
  },
  isLoading: false,
  isError: false,
  error: "",
};

// crete async thunk
// create user
export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ email, password }: ICredential): Promise<string | null> => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user.email;
  }
);

// login user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: ICredential): Promise<string | null> => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user.email;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action.payload!;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.email = action.payload!;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      });
  },
});

export default userSlice.reducer;
