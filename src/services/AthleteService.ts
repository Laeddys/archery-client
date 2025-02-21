import axios from "axios";
import { IAthlete } from "../models/IAthlete/IAthlete";

const API_URL = `${process.env.REACT_APP_API_URL}/athletes`;

const AthleteService = {
  getAthletes: async (): Promise<IAthlete[]> => {
    const response = await axios.get<IAthlete[]>(`${API_URL}?page=1&limit=10 `);
    return response.data;
  },
  createAthlete: async (
    athleteData: IAthlete,
    photo?: File | null
  ): Promise<IAthlete> => {
    const formData = new FormData();

    Object.entries(athleteData).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (photo) {
      formData.append("photo", photo);
    }

    return axios
      .post<{ data: IAthlete }>(`${API_URL}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data.data);
  },
};

export default AthleteService;
