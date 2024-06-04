import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth/authSlice";
import competitionSlice from "./reducers/competitions/competitionSlice";
import newsSlice from "./reducers/news/newsSlice";

const rootReducer = combineReducers({
  authSlice,
  competitionSlice,
  newsSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
