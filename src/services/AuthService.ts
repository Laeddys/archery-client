import axios from "axios";
import axiosInstance from "../http/axios";

const API_URL = process.env.REACT_APP_API_URL;

const AuthService = {
  async login(email: string, password: string) {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true }
    );
    localStorage.setItem("access_token", response.data.access_token);
    console.log(response.data);
    return response.data;
  },

  async registration(
    name: string,
    username: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    const response = await axios.post(
      `${API_URL}/register`,
      {
        name,
        username,
        email,
        password,
        password_confirmation,
      },
      { withCredentials: true }
    );
    localStorage.setItem("access_token", response.data.access_token);
    console.log(response.data);
    return response.data;
  },

  async logout() {
    const token = localStorage.getItem("access_token");
    return axiosInstance.post(`${API_URL}/logout`, {});
  },

  async refreshToken() {
    try {
      const response = await axiosInstance.post(
        `${API_URL}/refresh`,
        {},
        { withCredentials: true }
      );
      localStorage.setItem("access_token", response.data.access_token);
      return response.data.access_token;
    } catch (error: any) {
      console.error("Refresh token failed", error);
      return null;
    }
  },
};

export default AuthService;
