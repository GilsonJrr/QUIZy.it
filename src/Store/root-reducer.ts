import { combineReducers } from "redux";
import { PersistedState } from "redux-persist";
import { authReducer } from "./auth/reducers";
import { exampleReducer } from "./example/reducers";

export const rootReducer = combineReducers({
  authReducer,
  exampleReducer,
});

export type RootState = ReturnType<typeof rootReducer> & PersistedState;
