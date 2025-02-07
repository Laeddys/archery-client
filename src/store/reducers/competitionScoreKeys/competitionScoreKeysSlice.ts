import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteScoreKey,
  fetchScoreKeys,
  saveScoreKey,
} from "../../../services/CompetitionScoreService";
import axios from "axios";

interface CompetitionScoreKeysState {
  scoreKeys: Record<number, string[]>;
  isLoadingKeys: boolean;
  errorKeys: string | null;
}

const initialState: CompetitionScoreKeysState = {
  scoreKeys: {},
  isLoadingKeys: false,
  errorKeys: null,
};

export const loadScoreKeys = createAsyncThunk(
  "competitionScores/loadScoreKeys",
  async (competitionId: number, { rejectWithValue }) => {
    try {
      const response = await fetchScoreKeys(competitionId);
      return { competitionId, scoreKeys: response, scoreLabel: response };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addScoreKey = createAsyncThunk(
  "competitionScores/addScoreKey",
  async (
    { competitionId }: { competitionId: number },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as {
        competitionScoreKeysSlice: CompetitionScoreKeysState;
      };
      const existingKeys =
        state.competitionScoreKeysSlice?.scoreKeys?.[competitionId] ?? [];

      const newScoreKey = `score-${competitionId}-${existingKeys.length + 1}`;
      console.log("Generated scoreKey:", newScoreKey);

      await saveScoreKey(competitionId, newScoreKey);
      return { competitionId, scoreKey: newScoreKey };
    } catch (error: any) {
      console.error("Error saving score key:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateScoreLabel = createAsyncThunk(
  "competitions/updateScoreLabel",
  async (
    { scoreKey, scoreLabel }: { scoreKey: string; scoreLabel: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/competitions/score-keys/${scoreKey}`,
        {
          score_label: scoreLabel,
        }
      );
      return { scoreKey, scoreLabel };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "Error updating label"
      );
    }
  }
);

// export const removeScoreKey = createAsyncThunk(
//   "competitionScores/removeScoreKey",
//   async (
//     { competitionId, scoreKey }: { competitionId: number; scoreKey: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       await deleteScoreKey(competitionId, scoreKey);
//       return { competitionId, scoreKey };
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

const competitionScoreKeysSlice = createSlice({
  name: "competitionScoreKeys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadScoreKeys.fulfilled, (state, action) => {
        state.isLoadingKeys = false;
        state.scoreKeys[action.payload.competitionId] =
          action.payload.scoreKeys;
      })
      .addCase(loadScoreKeys.pending, (state) => {
        state.isLoadingKeys = true;
        state.errorKeys = null;
      })
      .addCase(loadScoreKeys.rejected, (state, action) => {
        state.isLoadingKeys = false;
        state.errorKeys = action.error.message as string;
      })
      .addCase(addScoreKey.fulfilled, (state, action) => {
        state.isLoadingKeys = false;
        if (!state.scoreKeys[action.payload.competitionId]) {
          state.scoreKeys[action.payload.competitionId] = [];
        }
        state.scoreKeys[action.payload.competitionId].push(
          action.payload.scoreKey
        );
      })
      .addCase(addScoreKey.pending, (state) => {
        state.isLoadingKeys = true;
        state.errorKeys = null;
      })
      .addCase(addScoreKey.rejected, (state, action) => {
        state.isLoadingKeys = false;
        state.errorKeys = action.error.message as string;
      });
    //   .addCase(removeScoreKey.fulfilled, (state, action) => {
    //     const { competitionId, scoreKey } = action.payload;
    //     state.scoreKeys[competitionId] = state.scoreKeys[competitionId].filter(
    //       (key) => key !== scoreKey
    //     );
    //   });
  },
});

export default competitionScoreKeysSlice.reducer;
