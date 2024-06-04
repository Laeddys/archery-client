import { AppDispatch } from "../../store";
import CompetitionService from "../../../services/CompetitionService";
import { setCompetition, setIsLoading, setError } from "./competitionSlice";
import { ICompetition } from "../../../models/ICompetition/ICompetition";

export const CompetitionActionCreators = {
  fetchCompetitions: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(setIsLoading(true));
      const competitions = await CompetitionService.getCompetitions();
      console.log("GET COMPETITIONS");
      dispatch(setCompetition(competitions));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("An unknown error occured"));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  },

  createCompetition:
    (competition: ICompetition) => async (dispatch: AppDispatch) => {
      try {
        setIsLoading(true);
        const response = await CompetitionService.createCompetition(
          competition
        );
        console.log(response);
      } catch (error) {
        if (error instanceof Error) {
          dispatch(setError(error.message));
        } else {
          dispatch(setError("An unknown error occured"));
        }
      } finally {
        dispatch(setIsLoading(false));
      }
    },
};
