import axios from "axios";
import { IClub } from "../models/Club/IClub";
import { IClubsResponse } from "../models/IClubsResponse/IClubsResponse";

const API_URL = `${process.env.REACT_APP_API_URL}/clubs`;

const ClubService = {
  getClubs: async (page = 1, limit = 20): Promise<IClubsResponse> => {
    const response = await axios.get<IClubsResponse>(
      `${API_URL}?page=${page}&limit=${limit}`
    );
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
