import { IAthlete } from "../IAthlete/IAthlete";

export interface IAthletesResponse {
  data: IAthlete[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
