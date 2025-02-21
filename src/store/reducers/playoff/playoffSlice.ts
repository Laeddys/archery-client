import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Match {
  1: string | null;
  2: string | null;
  result: { athlete1: number | null; athlete2: number | null };
}

interface PlayoffState {
  brackets: Record<string, Match[][]>;
  isLoadingPlayoff: boolean;
  error: string | null;
}

const initialState: PlayoffState = {
  brackets: {},
  isLoadingPlayoff: false,
  error: null,
};

const API_URL = process.env.REACT_APP_API_URL;

export const fetchPlayoff = createAsyncThunk(
  "playoff/fetchPlayoff",
  async (competitionId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/playoff/${competitionId}`);
      const data = response.data;
      const formattedBrackets = data.reduce(
        (acc: Record<string, Match[][]>, item: any) => {
          acc[item.class] = item.bracket.map((round: any[]) =>
            round.map((match: any) => ({
              ...match,
              result: match.result || { athlete1: null, athlete2: null },
            }))
          );
          return acc;
        },
        {}
      );
      return formattedBrackets;
    } catch (error) {
      return rejectWithValue("Failed to load playoff data.");
    }
  }
);

export const savePlayoff = createAsyncThunk(
  "playoff/savePlayoff",
  async (
    {
      competitionId,
      selectedClass,
      bracket,
    }: {
      competitionId: string | undefined;
      selectedClass: string;
      bracket: Match[][];
    },
    { rejectWithValue }
  ) => {
    try {
      await axios.post(`${API_URL}/playoff/${competitionId}`, {
        class: selectedClass,
        bracket,
      });
      return { selectedClass, bracket };
    } catch (error) {
      return rejectWithValue("Failed to save playoff data.");
    }
  }
);

const playoffSlice = createSlice({
  name: "playoff",
  initialState,
  reducers: {
    setBrackets(state, action: PayloadAction<typeof state.brackets>) {
      state.brackets = action.payload;
    },
    updateBracket(
      state,
      action: PayloadAction<{ class: string; bracket: Match[][] }>
    ) {
      state.brackets[action.payload.class] = action.payload.bracket;
    },
    updateMatchResult(
      state,
      action: PayloadAction<{
        class: string;
        roundIndex: number;
        matchIndex: number;
        result: { athlete1: number | null; athlete2: number | null };
      }>
    ) {
      const {
        class: className,
        roundIndex,
        matchIndex,
        result,
      } = action.payload;
      if (state.brackets[className]) {
        state.brackets[className][roundIndex][matchIndex].result = result;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayoff.pending, (state) => {
        state.isLoadingPlayoff = true;
      })
      .addCase(fetchPlayoff.fulfilled, (state, action) => {
        state.isLoadingPlayoff = false;
        state.brackets = action.payload;
      })
      .addCase(fetchPlayoff.rejected, (state, action) => {
        state.isLoadingPlayoff = false;
        state.error = action.payload as string;
      })
      .addCase(savePlayoff.fulfilled, (state, action) => {
        state.brackets[action.payload.selectedClass] = action.payload.bracket;
      })
      .addCase(savePlayoff.pending, (state) => {
        state.isLoadingPlayoff = true;
      })
      .addCase(savePlayoff.rejected, (state, action) => {
        state.isLoadingPlayoff = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBrackets, updateBracket, updateMatchResult } =
  playoffSlice.actions;
export default playoffSlice.reducer;
