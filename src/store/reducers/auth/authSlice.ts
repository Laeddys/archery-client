import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser/IUser";
import { IUserRole } from "../../../models/IUser/IUserRole";
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
      state.isLoading = false;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setIsAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
    setRoles(state, action: PayloadAction<IRole[]>) {
      state.roles = action.payload;
    },
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
