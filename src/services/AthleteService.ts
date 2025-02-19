import axios from "axios";
import { IAthlete } from "../models/IAthlete/IAthlete";

const API_URL = `${process.env.REACT_APP_API_URL}/athletes`;

const AthleteService = {
  getAthletes: async (): Promise<IAthlete[]> => {
    const response = await axios.get<IAthlete[]>(`${API_URL}?page=1&limit=10 `);
    return response.data;
  },
  createAthlete: async (athleteData: IAthlete): Promise<IAthlete> => {
    const payload = athleteData;
    const response = await axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};

export default AthleteService;
