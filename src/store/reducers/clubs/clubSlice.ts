import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import ClubService from "../../../services/ClubService";
import { IClub } from "../../../models/Club/IClub";

interface ClubState {
  clubs: IClub[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ClubState = {
  clubs: [],
  isLoading: false,
  error: null,
};

export const fetchClubs = createAsyncThunk("clubs/fetchClubs", async () => {
  const response = await ClubService.getClubs();
  return response;
});

export const fetchClubById = createAsyncThunk(
  "clubs/fetchClubById",
  async (id: number) => {
    const response = await ClubService.fetchClubById(id);
    return response;
  }
);

export const createClub = createAsyncThunk(
  "clubs/createClub",
  async (club: IClub, { rejectWithValue }) => {
    try {
      await ClubService.createClub(club);
      return club;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const clubSlice = createSlice({
  name: "clubs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchClubs.fulfilled,
        (state, action: PayloadAction<IClub[]>) => {
          state.isLoading = false;
          state.clubs = action.payload;
        }
      )
      .addCase(fetchClubs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch clubs";
      })
      .addCase(createClub.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClub.fulfilled, (state, action: PayloadAction<IClub>) => {
        state.isLoading = false;
        state.clubs.push(action.payload);
      })
      .addCase(createClub.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default clubSlice.reducer;
