import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICompetition } from "../../../models/ICompetition/ICompetition";
import CompetitionService from "../../../services/CompetitionService";

interface CompetitionState {
  competitions: ICompetition[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CompetitionState = {
  competitions: [],
  isLoading: false,
  error: "",
};

export const fetchCompetitions = createAsyncThunk(
  "posts/fetchCompetitions",
  async () => {
    const response = await CompetitionService.getCompetitions();
    return response;
  }
);

export const fetchCompetitionById = createAsyncThunk(
  "posts/fetchCompetitions",
  async (id: number) => {
    const response = await CompetitionService.fetchCompetitionById(id);

    return response;
  }
);

export const createCompetition = createAsyncThunk(
  "posts/createCompetition",
  async (competition: ICompetition) => {
    await CompetitionService.createCompetition(competition);
    return competition;
  }
);

const competitionSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompetitions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCompetitions.fulfilled,
        (state, action: PayloadAction<ICompetition[]>) => {
          state.isLoading = false;
          state.competitions = action.payload;
        }
      )
      .addCase(fetchCompetitions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch competitions";
      })
      .addCase(createCompetition.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createCompetition.fulfilled,
        (state, action: PayloadAction<ICompetition>) => {
          state.isLoading = false;
          state.competitions.push(action.payload);
        }
      )
      .addCase(createCompetition.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create competition";
      });
  },
});

export default competitionSlice.reducer;
