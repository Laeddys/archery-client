import axios, { AxiosResponse } from "axios";
import { ICompetition } from "../models/ICompetition/ICompetition";

const token = localStorage.getItem("token");

export default class CompetitionService {
  static async getCompetitions(): Promise<ICompetition[]> {
    const response: AxiosResponse<ICompetition[]> = await axios.get<
      ICompetition[]
    >("http://localhost:5000/competitions");
    return response.data;
  }
  static async createCompetition(
    competition: ICompetition
  ): Promise<AxiosResponse<ICompetition[]>> {
    return axios.post<ICompetition[]>(
      "http://localhost:5000/competitions",
      competition,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
