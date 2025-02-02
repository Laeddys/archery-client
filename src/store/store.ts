import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth/authSlice";
import competitionSlice from "./reducers/competitions/competitionSlice";
import postsSlice from "./reducers/posts/postsSlice";
import clubSlice from "./reducers/clubs/clubSlice";
import athleteSlice from "./reducers/athletes/athleteSlice";

const rootReducer = combineReducers({
  authSlice,
  competitionSlice,
  postsSlice,
  clubSlice,
  athleteSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
