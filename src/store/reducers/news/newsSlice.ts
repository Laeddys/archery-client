import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICompetition } from "../../../models/ICompetition/ICompetition";
import { IPost } from "../../../models/IPost/IPost";

interface INewsState {
  news: IPost[];
  isLoading: boolean;
  error: string;
}

const initialState: INewsState = {
  news: [],
  isLoading: false,
  error: "",
};

export const newsSlice = createSlice({
  name: "competitions",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.news = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, setIsLoading, setError } = newsSlice.actions;
export default newsSlice.reducer;
