import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/AuthService";
import { IUser } from "../../../models/IUser/IUser";
import { jwtDecode } from "jwt-decode";
import { setAuth, setIsAdmin, setUser } from "./authSlice";

export const login = createAsyncThunk<
  any, // или IUser
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(email, password);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Login failed.");
  }
});

export const registration = createAsyncThunk(
  "auth/registration",
  async (
    {
      name,
      username,
      email,
      password,
      password_confirmation,
    }: {
      name: string;
      username: string;
      email: string;
      password: string;
      password_confirmation: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.registration(
        name,
        username,
        email,
        password,
        password_confirmation
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Registration failed."
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      console.warn("No access token found in localStorage.");
      return;
    }

    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("access_token");
      dispatch(setUser({} as IUser));
      dispatch(setIsAdmin(false));
      dispatch(setAuth(false));
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const newToken = await AuthService.refreshToken();
      if (newToken) {
        dispatch(checkRole());
      }
    } catch (error: any) {
      dispatch(logout());
      return rejectWithValue(
        error?.response?.data?.message || "An unknown error occurred"
      );
    }
  }
);

// export const refreshToken = createAsyncThunk(
//   "auth/refreshToken",
//   async (_, { dispatch }) => {
//     const newToken = await AuthService.refreshToken();
//     if (newToken) {
//       dispatch(checkRole());
//     } else {
//       dispatch(logout());
//     }
//   }
// );

export const checkRole = createAsyncThunk(
  "auth/checkRole",
  async (_, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const decodedToken: IUser = jwtDecode<IUser>(token);

      const user: IUser = {
        id: decodedToken.id,
        name: decodedToken.name,
        username: decodedToken.username,
        email: decodedToken.email,
        banned: decodedToken.banned,
        role: decodedToken.role,
      };
      dispatch(setUser(user));
      // dispatch(setRoles(decodedToken.role));
      if (decodedToken.role === "ADMIN") {
        dispatch(setIsAdmin(true));
      } else {
        dispatch(setIsAdmin(false));
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "An unknown error occurred"
      );
    }
  }
);
