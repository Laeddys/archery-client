import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICompetition } from "../../../models/ICompetition/ICompetition";
import CompetitionService from "../../../services/CompetitionService";
import { IAthlete } from "../../../models/IAthlete/IAthlete";
import axios from "axios";

interface CompetitionState {
  competitions: ICompetition[];
  competitionDetails: Record<number, ICompetition>;
  athletes: Record<number, IAthlete[]>;
  isLoading: boolean;
  error: string | null;
  status: string;
}

const initialState: CompetitionState = {
  competitions: [],
  competitionDetails: {},
  athletes: {},
  isLoading: false,
  error: null,
  status: "",
};

export const fetchCompetitions = createAsyncThunk(
  "competitions/fetchCompetitions",
  async (_, { rejectWithValue }) => {
    try {
      return await CompetitionService.getCompetitions();
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Error fetching competitions"
      );
    }
  }
);

export const fetchCompetitionById = createAsyncThunk(
  "competitions/fetchCompetitionById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await CompetitionService.fetchCompetitionById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Error fetching competition"
      );
    }
  }
);

export const createCompetition = createAsyncThunk(
  "competitions/createCompetition",
  async (
    { competition, photo }: { competition: ICompetition; photo?: File | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await CompetitionService.createCompetition(
        competition,
        photo
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "Error creating competition"
      );
    }
  }
);

export const getCompetitionAthletes = createAsyncThunk(
  "competitions/getCompetitionAthletes",
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/competitions/${id}/athletes`
      );
      return { id, athletes: data };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Error fetching athletes"
      );
    }
  }
);

export const addAthleteToCompetition = createAsyncThunk(
  "competitions/addAthleteToCompetition",
  async (
    { competitionId, athleteId }: { competitionId: number; athleteId: number },
    { rejectWithValue }
  ) => {
    try {
      return await CompetitionService.addAthleteToCompetition(
        competitionId,
        athleteId
      );
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const competitionSlice = createSlice({
  name: "competitions",
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      })
      .addCase(fetchCompetitionById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompetitionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.competitionDetails[action.payload.id] = action.payload;
      })
      .addCase(fetchCompetitionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getCompetitionAthletes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCompetitionAthletes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.athletes[action.payload.id] = action.payload.athletes;
      })
      .addCase(getCompetitionAthletes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addAthleteToCompetition.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        addAthleteToCompetition.fulfilled,
        (state, action: PayloadAction<IAthlete>) => {
          state.status = "success";
          state.isLoading = false;
          const competitionId = action.payload.id;

          if (competitionId) {
            if (!state.athletes[competitionId]) {
              state.athletes[competitionId] = [action.payload];
            } else {
              const exists = state.athletes[competitionId].some(
                (a) => a.id === action.payload.id
              );
              if (!exists) {
                state.athletes[competitionId].push(action.payload);
              }
            }
          }
        }
      )

      .addCase(addAthleteToCompetition.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default competitionSlice.reducer;
