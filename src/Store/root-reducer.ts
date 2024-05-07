import { combineReducers } from "redux";
import { PersistedState } from "redux-persist";
import { authReducer } from "./auth/reducers";
import { exampleReducer } from "./example/reducers";
import { studentReducer } from "./students/reducers";

export const rootReducer = combineReducers({
  authReducer,
  exampleReducer,
  studentReducer,
});

export type RootState = ReturnType<typeof rootReducer> & PersistedState;
