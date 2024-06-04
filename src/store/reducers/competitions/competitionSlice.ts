import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICompetition } from "../../../models/ICompetition/ICompetition";

interface ICompetitionState {
  competitions: ICompetition[];
  isLoading: boolean;
  error: string;
}

const initialState: ICompetitionState = {
  competitions: [],
  isLoading: false,
  error: "",
};

export const competitionSlice = createSlice({
  name: "competitions",
  initialState,
  reducers: {
    setCompetition: (state, action: PayloadAction<ICompetition[]>) => {
      state.competitions = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setCompetition, setIsLoading, setError } =
  competitionSlice.actions;
export default competitionSlice.reducer;
