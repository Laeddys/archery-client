import axios, { AxiosResponse } from "axios";
import { ICompetition } from "../models/ICompetition/ICompetition";
import { IAthlete } from "../models/IAthlete/IAthlete";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export default class CompetitionService {
  static async getCompetitions(): Promise<ICompetition[]> {
    const response: AxiosResponse<ICompetition[]> = await axios.get<
      ICompetition[]
    >(`${API_BASE_URL}/competitions`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  }

  static async createCompetition(
    competition: ICompetition
  ): Promise<AxiosResponse<ICompetition[]>> {
    return axios.post<ICompetition[]>(
      `${API_BASE_URL}/competitions`,
      competition,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
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
    console.log(response.data);
    return response.data;
  };
}
