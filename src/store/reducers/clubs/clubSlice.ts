import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClubService from "../../../services/ClubService";
import { IClub } from "../../../models/Club/IClub";
import { IClubsResponse } from "../../../models/IClubsResponse/IClubsResponse";

interface ClubState {
  clubs: IClub[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: ClubState = {
  clubs: [],
  page: 1,
  limit: 20,
  total: 0,
  hasMore: true,
  isLoading: false,
  error: null,
};

export const fetchClubs = createAsyncThunk(
  "clubs/fetchClubs",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await ClubService.getClubs(page, limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch clubs"
      );
    }
  }
);

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
  reducers: {
    resetClubs(state) {
      state.clubs = [];
      state.page = 1;
      state.hasMore = true;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchClubs.fulfilled,
        (state, action: PayloadAction<IClubsResponse>) => {
          state.isLoading = false;
          state.clubs = action.payload.data;
          state.page = action.payload.current_page;
          state.limit = action.payload.per_page;
          state.total = action.payload.total;
          state.hasMore =
            action.payload.current_page < action.payload.last_page;
        }
      )
      .addCase(fetchClubs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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
