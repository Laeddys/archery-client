import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth/authSlice";
import competitionSlice from "./reducers/competitions/competitionSlice";
import postsSlice from "./reducers/posts/postsSlice";
import clubSlice from "./reducers/clubs/clubSlice";
import athleteSlice from "./reducers/athletes/athleteSlice";
import competitionScoreSlice from "./reducers/competitionScore/competitionScoreSlice";

const rootReducer = combineReducers({
  authSlice,
  competitionSlice,
  postsSlice,
  clubSlice,
  athleteSlice,
  competitionScoreSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
