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
  user: string;
  id: number;
  banned: boolean;
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
        console.log(decodedToken.user);

        // Создание объекта IUser из данных токена
        const user: IUser = {
          email: decodedToken.user,
          id: decodedToken.id,
          banned: decodedToken.banned,
        };

        // Вызов dispatch(setUser()) с объектом IUser
        dispatch(setUser(user));
        dispatch(setRoles(decodedToken.roles));
        dispatch(setIsAdmin(isAdmin));
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
