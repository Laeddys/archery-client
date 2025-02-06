import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser/IUser";

import { login, registration, logout, checkRole } from "./action-creators";
import { IRole } from "../../../models/IRole/IRole";

interface AuthState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  isAdmin: boolean;
  roles: IRole[];
}

const initialState: AuthState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
  error: "",
  isAdmin: false,
  roles: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setIsAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
    setRoles(state, action: PayloadAction<IRole[]>) {
      state.roles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        // state.user = action.payload.access_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        // state.user = action.payload.access_token;
      })
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = {} as IUser;
        state.isAdmin = false;
        state.roles = [];
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(checkRole.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(checkRole.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(checkRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setAuth,
  setError,
  setIsAdmin,
  setIsLoading,
  setUser,
  setRoles,
} = authSlice.actions;

export default authSlice.reducer;
