import axios from "axios";
import { IClub } from "../models/Club/IClub";

const API_URL = `${process.env.REACT_APP_API_URL}/clubs`;

const ClubService = {
  getClubs: async (): Promise<IClub[]> => {
    const response = await axios.get<IClub[]>(API_URL);
    console.log(response.data);
    return response.data;
  },
  fetchClubById: async (id: number): Promise<IClub> => {
    const response = await axios.get<IClub>(`${API_URL}/${id}`);
    return response.data;
  },
  createClub: async (club: IClub): Promise<void> => {
    await axios.post(API_URL, club);
  },
};

export default ClubService;
