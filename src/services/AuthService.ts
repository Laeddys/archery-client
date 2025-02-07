import axios, { AxiosResponse } from "axios";
import $api from "../http/axios";
import { AuthResponse } from "../models/response/AuthResponse";

const API_URL = process.env.REACT_APP_API_URL;

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(`${API_URL}/login`, {
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
    return $api.post<AuthResponse>(`${API_URL}/register`, {
      name,
      username,
      email,
      password,
      password_confirmation,
    });
  }

  static async logout(access_token: string): Promise<void> {
    return axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  }
}
