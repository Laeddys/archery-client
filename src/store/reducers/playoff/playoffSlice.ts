import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Match {
  1: string | null;
  2: string | null;
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
          acc[item.class] = item.bracket;
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
      action: PayloadAction<{
        class: string;
        bracket: { 1: string | null; 2: string | null }[][];
      }>
    ) {
      state.brackets[action.payload.class] = action.payload.bracket;
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
      .addCase(savePlayoff.pending, (state, action) => {
        state.isLoadingPlayoff = true;
      })
      .addCase(savePlayoff.rejected, (state, action) => {
        state.isLoadingPlayoff = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBrackets, updateBracket } = playoffSlice.actions;
export default playoffSlice.reducer;
