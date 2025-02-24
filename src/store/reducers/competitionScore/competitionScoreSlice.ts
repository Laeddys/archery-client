import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCompetitionScores,
  saveCompetitionScores,
} from "../../../services/CompetitionScoreService";

interface CompetitionScoresState {
  scores: {
    [competitionId: string]: {
      [athleteId: string]: {
        [scoreKey: string]: string;
      };
    };
  };
  isLoadingScores: boolean;
  isLoadingScoreKeys: boolean;
  error: string | null;
}

const initialState: CompetitionScoresState = {
  scores: {},
  isLoadingScores: false,
  isLoadingScoreKeys: false,
  error: null,
};

export const loadCompetitionScores = createAsyncThunk(
  "competitionScores/loadCompetitionScores",
  async (competitionId: number, { rejectWithValue }) => {
    try {
      const response = await fetchCompetitionScores(competitionId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCompetitionScores = createAsyncThunk(
  "competitionScores/updateCompetitionScores",
  async (
    scores: {
      competitionId: number;
      athleteId: number;
      scoreKey: string;
      scoreValue: string;
    }[],
    { rejectWithValue }
  ) => {
    try {
      await saveCompetitionScores(scores);

      return scores;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const competitionScoreSlice = createSlice({
  name: "competitionScore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCompetitionScores.pending, (state) => {
        state.isLoadingScores = true;
        state.error = null;
      })
      .addCase(
        loadCompetitionScores.fulfilled,
        (
          state,
          action: PayloadAction<{ competitionId: number; scores: any[] }>
        ) => {
          state.isLoadingScores = false;
          const { competitionId, scores } = action.payload;

          if (!state.scores[competitionId]) {
            state.scores[competitionId] = {};
          }

          scores.forEach((score) => {
            if (!state.scores[competitionId][score.athlete_id]) {
              state.scores[competitionId][score.athlete_id] = {};
            }
            state.scores[competitionId][score.athlete_id][score.score_key] =
              score.score_value;
          });
        }
      )

      .addCase(loadCompetitionScores.rejected, (state, action) => {
        state.isLoadingScores = false;
        state.error = action.payload as string;
      })

      .addCase(updateCompetitionScores.pending, (state) => {
        state.isLoadingScoreKeys = true;
        state.error = null;
      })
      .addCase(
        updateCompetitionScores.fulfilled,
        (
          state,
          action: PayloadAction<
            {
              competitionId: number;
              athleteId: number;
              scoreKey: string;
              scoreValue: string;
            }[]
          >
        ) => {
          state.isLoadingScoreKeys = false;
          action.payload.forEach(
            ({ competitionId, athleteId, scoreKey, scoreValue }) => {
              const compId = String(competitionId);
              const athId = String(athleteId);

              if (!state.scores[compId]) {
                state.scores[compId] = {};
              }
              if (!state.scores[compId][athId]) {
                state.scores[compId][athId] = {};
              }

              state.scores[compId][athId][scoreKey] = scoreValue;
            }
          );
        }
      )

      .addCase(updateCompetitionScores.rejected, (state, action) => {
        state.isLoadingScoreKeys = false;
        state.error = action.payload as string;
      });
  },
});

export default competitionScoreSlice.reducer;
