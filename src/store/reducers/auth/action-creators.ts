import { jwtDecode } from "jwt-decode";
import { IUser } from "../../../models/IUser/IUser";
import AuthService from "../../../services/AuthService";
import { AppDispatch } from "../../store";
import {
  setAuth,
  setError,
  setIsAdmin,
  setIsLoading,
  setRoles,
  setUser,
} from "./authSlice";

interface JwtPayload {
  email: string;
  roles: Array<{
    id: number;
    value: string;
    description: string;
  }>;
}

export const AuthActionCreators = {
  login: (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.token);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  },

  registration:
    (email: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(setIsLoading(true));
        const response = await AuthService.registration(email, password);
        console.log(response);
        localStorage.setItem("token", response.data.token);
        dispatch(setAuth(true));
        dispatch(setUser(response.data.user));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(setError(error.message));
        } else {
          dispatch(setError("An unknown error occurred"));
        }
      } finally {
        dispatch(setIsLoading(false));
      }
    },

  logout: () => async (dispatch: AppDispatch) => {
    localStorage.removeItem("token");
    dispatch(setUser({} as IUser));
    dispatch(setIsAdmin(false));
    dispatch(setAuth(false));
  },

  getRole: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await AuthService.getUserRole();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  },

  checkRole: () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    try {
      dispatch(setIsLoading(true));
      const decodedToken: JwtPayload = jwtDecode<JwtPayload>(token);
      if (decodedToken.roles && decodedToken.roles.length > 0) {
        const isAdmin = decodedToken.roles.some(
          (role) => role.value === "ADMIN"
        );

        dispatch(setRoles(decodedToken.roles));
        if (isAdmin) {
          dispatch(setIsAdmin(true));
          console.log(decodedToken.email);
          console.log(decodedToken.roles);
        } else {
          dispatch(setIsAdmin(false));
        }
      } else {
        dispatch(setIsAdmin(false));
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("An unknown error occurred"));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  },
};
