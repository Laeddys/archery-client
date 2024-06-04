import { IUser } from "../IUser/IUser";

export interface AuthResponse {
  token: string;
  user: IUser;
}
