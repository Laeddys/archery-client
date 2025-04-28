import { createAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser/IUser";
import { IRole } from "../../../models/IRole/IRole";

export const setUser = createAction<IUser>("auth/setUser");
export const setAuth = createAction<boolean>("auth/setAuth");
export const setIsLoading = createAction<boolean>("auth/setIsLoading");
// export const setError = createAction<string>("auth/setError");
export const setIsAdmin = createAction<boolean>("auth/setIsAdmin");
export const setRoles = createAction<IRole[]>("auth/setRoles");
