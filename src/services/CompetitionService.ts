import axios, { AxiosResponse } from "axios";
import { ICompetition } from "../models/ICompetition/ICompetition";
import { IAthlete } from "../models/IAthlete/IAthlete";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("access_token");

export default class CompetitionService {
  static async getCompetitions(): Promise<ICompetition[]> {
    const response: AxiosResponse<ICompetition[]> = await axios.get<
      ICompetition[]
    >(`${API_BASE_URL}/competitions`, {
      withCredentials: true,
    });
    return response.data;
  }

  static async createCompetition(
    competition: ICompetition,
    photo?: File | null
  ): Promise<AxiosResponse<ICompetition>> {
    const formData = new FormData();

    Object.entries(competition).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    console.log(token);

    if (photo) {
      formData.append("photo", photo);
    }

    return axios.post<ICompetition>(`${API_BASE_URL}/competitions`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzM5MjcyNDI5LCJleHAiOjE3MzkyNzYwMjksIm5iZiI6MTczOTI3MjQyOSwianRpIjoiSG1pZVdrQ25yVTlkUlRhaSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlcm5hbWUiOiJraXB2b2luczIiLCJlbWFpbCI6Ik5pZ2dhMkBtYWlsLnJ1IiwibmFtZSI6IkplZ29ycyIsInJvbGUiOiJBRE1JTiJ9.Qz86P094ISA1GgsxQOKeE0gqkdFOg0AIKJj52UnW7bU`,
      },
    });
  }

  static async getCompetitionAthletes(id: number) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/competitions/${id}/athletes`
      );
      return { id, athletes: response.data };
    } catch (error) {
      console.error(error);
    }
  }

  static async addAthleteToCompetition(
    competitionId: number,
    athleteId: number
  ): Promise<IAthlete> {
    const response = await axios.post(
      `${API_BASE_URL}/athletes/${athleteId}/competitions/${competitionId}`
    );
    return response.data;
  }

  static fetchCompetitionById = async (id: number) => {
    const response = await axios.get<ICompetition>(
      `${API_BASE_URL}/competitions/${id}`
    );

    return response.data;
  };
}
