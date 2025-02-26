import { IClub } from "../Club/IClub";

export interface IClubsResponse {
  data: IClub[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
