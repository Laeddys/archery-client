import axios, { AxiosResponse } from "axios";

export const banUser = async (userId: number, banReason: string) => {
  try {
    const response = await axios.post("/users/ban", { userId, banReason });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
};
