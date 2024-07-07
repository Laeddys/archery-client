import axios, { AxiosResponse } from "axios";
import { ICompetition } from "../models/ICompetition/ICompetition";

const token = localStorage.getItem("token");
const API_URL = "http://localhost:5000/competitions";

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

  static fetchCompetitionById = async (id: number) => {
    const response = await axios.get<ICompetition>(`${API_URL}/${id}`);
    return response;
  };
}
