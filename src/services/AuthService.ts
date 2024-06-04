import axios, { AxiosResponse } from "axios";

import $api from "../http/axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUserRole } from "../models/IUser/IUserRole";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    console.log(email, password);
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { email, password });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }

  static async getUserRole(): Promise<IUserRole> {
    const response: AxiosResponse<IUserRole> = await axios.get<IUserRole>(
      "http://localhost:5000/users"
    );

    console.log(response.data); // Проверяем структуру данных
    return response.data; // Возвращаем полный объект
  }

  // static async getMe(token: string) {
  //   return axios.get("/api/auth/me", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }
}
