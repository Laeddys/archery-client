import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAthlete } from "../../../models/IAthlete/IAthlete";
import AthleteService from "../../../services/AthleteService";
import CompetitionService from "../../../services/CompetitionService";

interface AthleteState {
  athletes: IAthlete[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AthleteState = {
  athletes: [],
  isLoading: false,
  error: null,
};

export const fetchAthletes = createAsyncThunk(
  "athletes/fetchAthletes",
  async (_, { rejectWithValue }) => {
    try {
      const response: IAthlete[] = await AthleteService.getAthletes();
      return response;
    } catch (error: any) {
      console.error("Error fetching athletes:", error);
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch athletes"
      );
    }
  }
);

export const createAthlete = createAsyncThunk(
  "athletes/create",
  async (athleteData: IAthlete, { rejectWithValue }) => {
    try {
      const response = await AthleteService.createAthlete(athleteData);
      return response;
    } catch (error: any) {
      console.error("Error creating athlete:", error);
      return rejectWithValue(error.response?.data.message || "Unknown error");
    }
  }
);

const athleteSlice = createSlice({
  name: "athletes",
  initialState,
  reducers: {
    addAthlete: (state, action: PayloadAction<IAthlete>) => {
      state.athletes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAthletes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAthletes.fulfilled,
        (state, action: PayloadAction<IAthlete[]>) => {
          state.isLoading = false;
          state.athletes = action.payload;
        }
      )
      .addCase(fetchAthletes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch athletes.";
      })
      .addCase(createAthlete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createAthlete.fulfilled,
        (state, action: PayloadAction<IAthlete>) => {
          state.isLoading = false;
          state.athletes.push(action.payload);
        }
      )
      .addCase(createAthlete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create athlete";
      });
  },
});

export default athleteSlice.reducer;
