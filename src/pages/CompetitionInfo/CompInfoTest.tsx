// import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { ICompetition } from "../../../models/ICompetition/ICompetition";
// import CompetitionService from "../../../services/CompetitionService";
// import { IAthlete } from "../../../models/IAthlete/IAthlete";
// import axios from "axios";

// interface CompetitionState {
//   competitions: ICompetition[];
//   athletes: Record<number, IAthlete[]>;
//   isLoading: boolean;
//   error: string | null;
//   status: string;
// }

// const initialState: CompetitionState = {
//   competitions: [] as ICompetition[],
//   athletes: {},
//   isLoading: false,
//   error: "",
//   status: "",
// };

// export const fetchCompetitions = createAsyncThunk(
//   "competitions/fetchCompetitions",
//   async (_, { rejectWithValue }) => {
//     try {
//       const competitions = await CompetitionService.getCompetitions();
//       return competitions;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data.message);
//     }
//   }
// );

// export const fetchCompetitionById = createAsyncThunk(
//   "competitions/fetchCompetitionsById",
//   async (id: number, { rejectWithValue }) => {
//     try {
//       const competition = await CompetitionService.fetchCompetitionById(id);
//       return competition;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data.message);
//     }
//   }
// );

// export const createCompetition = createAsyncThunk(
//   "competitions/createCompetition",
//   async (competition: ICompetition, { rejectWithValue }) => {
//     try {
//       await CompetitionService.createCompetition(competition);
//       return competition;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data.message);
//     }
//   }
// );

// export const getCompetitionAthletes = createAsyncThunk(
//   "competitions/getCompetitionAthletes",
//   async (id: number, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/competitions/${id}/athletes`
//       );
//       return { id, athletes: response.data };
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data.message);
//     }
//   }
// );

// export const addAthleteToCompetition = createAsyncThunk(
//   "competitions/addAthleteToCompetition",
//   async (
//     { competitionId, athleteId }: { competitionId: number; athleteId: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await CompetitionService.addAthleteToCompetition(
//         competitionId,
//         athleteId
//       );
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data.message);
//     }
//   }
// );

// const competitionSlice = createSlice({
//   name: "competitions",
//   initialState,
//   reducers: {
//     clearError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCompetitions.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchCompetitions.fulfilled,
//         (state, action: PayloadAction<ICompetition[]>) => {
//           state.isLoading = false;
//           state.competitions = action.payload;
//         }
//       )
//       .addCase(fetchCompetitions.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || "Failed to fetch competitions";
//       })
//       .addCase(createCompetition.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(
//         createCompetition.fulfilled,
//         (state, action: PayloadAction<ICompetition>) => {
//           state.isLoading = false;
//           state.competitions.push(action.payload);
//         }
//       )
//       .addCase(createCompetition.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || "Failed to create competition";
//       })
//       .addCase(getCompetitionAthletes.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.athletes[action.payload.id] = action.payload.athletes;
//       })
//       .addCase(getCompetitionAthletes.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(getCompetitionAthletes.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || "Failed to fetch athletes";
//       })
//       .addCase(addAthleteToCompetition.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(
//         addAthleteToCompetition.fulfilled,
//         (state, action: PayloadAction<IAthlete>) => {
//           state.status = "success";
//           state.isLoading = false;
//           const competitionId = action.payload.id;
//           if (competitionId) {
//             if (state.athletes[competitionId]) {
//               state.athletes[competitionId].push(action.payload);
//             } else {
//               state.athletes[competitionId] = [action.payload];
//             }
//           }
//         }
//       )
//       .addCase(addAthleteToCompetition.rejected, (state, action) => {
//         state.status = "error";
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { clearError } = competitionSlice.actions;
// export default competitionSlice.reducer;
import React from "react";

const CompInfoTest = () => {
  return <div>CompInfoTest</div>;
};

export default CompInfoTest;
