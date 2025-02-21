import { IClub } from "../Club/IClub";

export interface IAthlete {
  id: number;
  name: string;
  date_of_birth: string | string[];
  gender: string;
  club_id: number;
  "class/subclass": string;
  role: string;
  ranking: number;
  club: IClub;
  photo: File | null;
}
