import axios, { AxiosResponse } from "axios";
import $api from "../http/axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUser } from "../models/IUser/IUser";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("http://127.0.0.1:8000/api/login", {
      email,
      password,
    });
  }

  static async registration(
    name: string,
    username: string,
    email: string,
    password: string,
    password_confirmation: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("http://127.0.0.1:8000/api/register", {
      name,
      username,
      email,
      password,
      password_confirmation,
    });
  }

  static async logout(access_token: string): Promise<void> {
    return axios.post(
      "http://127.0.0.1:8000/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  }

  static async getUserRole(): Promise<IUser> {
    const response: AxiosResponse<IUser> = await axios.get<IUser>(
      "http://localhost:5000/users"
    );

    return response.data;
  }
}
