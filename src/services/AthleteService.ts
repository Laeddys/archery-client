import axios from "axios";
import { IAthlete } from "../models/IAthlete/IAthlete";

const API_URL = `${process.env.REACT_APP_API_URL}/athletes`;

const AthleteService = {
  getAthletes: async (): Promise<IAthlete[]> => {
    const response = await axios.get<IAthlete[]>(API_URL);
    console.log(response.data);
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
